"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, CheckCircle2, Plus, X } from "lucide-react";
import { getBodegas, getProductos, createProducto, ProductoFiltros } from "@/src/actions/inventario";
import type { Bodega, Producto } from "@/src/types/database.types";

type ViewMode = "consulta" | "reporte";

export default function UnidadesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("consulta");

  // States for "Consulta"
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [bodegas, setBodegas] = useState<Bodega[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  const [filtros, setFiltros] = useState<ProductoFiltros>({
    ref_fabrica: "",
    descripcion: "",
    bodega_id: "",
  });

  // States for "Reporte"
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // States for "Nuevo Producto" Modal
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newProductData, setNewProductData] = useState({
    codigo: "",
    ref_fabrica: "",
    descripcion: "",
    presentacion: "Unidad",
    bodega_id: "",
    saldo_actual: 0,
    costo: 0,
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // --- Effects ---
  useEffect(() => {
    const fetchBodegas = async () => {
      const { data, error } = await getBodegas();
      if (error) {
        alert("Error cargando bodegas");
      } else if (data) {
        setBodegas(data);
      }
    };
    fetchBodegas();
  }, []);

  // --- Handlers ---
  const handleToggleView = () => {
    setViewMode(viewMode === "consulta" ? "reporte" : "consulta");
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(false);

    try {
      const { data, error } = await getProductos(filtros);
      if (error) {
        alert("Error buscando productos");
      } else if (data) {
        setProductos(data);
      }
    } catch {
      alert("Error inesperado buscando productos");
    } finally {
      setIsSearching(false);
      setHasSearched(true);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { data, error } = await createProducto(newProductData);
      if (error) {
        alert("Error creando producto: " + (error.message || "Error desconocido"));
      } else if (data) {
        setShowNewProductModal(false);
        setNewProductData({
          codigo: "",
          ref_fabrica: "",
          descripcion: "",
          presentacion: "Unidad",
          bodega_id: "",
          saldo_actual: 0,
          costo: 0,
        });

        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);

        // Refresh products list automatically
        await handleSearch();
      }
    } catch {
      alert("Error inesperado creando producto");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setReportGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      // Auto-hide success message after 3 seconds
      setTimeout(() => setReportGenerated(false), 3000);
    }, 1500);
  };

  // --- Calculations ---
  const totals = hasSearched
    ? productos.reduce(
        (acc, item) => ({
          saldo: acc.saldo + item.saldo_actual,
          reservado: acc.reservado + 0, // Fallback as reservado is not in DB schema yet
          disponible: acc.disponible + item.saldo_actual, // Fallback
          transito: acc.transito + 0, // Fallback
          totalCosto: acc.totalCosto + item.costo * item.saldo_actual,
        }),
        { saldo: 0, reservado: 0, disponible: 0, transito: 0, totalCosto: 0 }
      )
    : { saldo: 0, reservado: 0, disponible: 0, transito: 0, totalCosto: 0 };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Toggle Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {viewMode === "consulta"
              ? "Consulta de Unidades"
              : "Reporte Comercial/Contabilidad"}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowNewProductModal(true)}
              className="flex items-center gap-2 bg-[#D3AB80] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Nuevo Producto
            </button>
            <button
              onClick={handleToggleView}
              className="bg-[#472825] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              {viewMode === "consulta" ? "Ver Reporte Contabilidad" : "Volver a Consulta"}
            </button>
          </div>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 right-4 z-50 bg-green-50 text-green-800 p-4 rounded-md border border-green-200 shadow-md flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Producto creado exitosamente.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area with Animation */}
        <AnimatePresence mode="wait">
          {viewMode === "consulta" && (
            <motion.div
              key="consulta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Filtros Consulta */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ref Fabrica</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                      placeholder="Ej. CD-18K"
                      value={filtros.ref_fabrica || ""}
                      onChange={(e) => setFiltros({ ...filtros, ref_fabrica: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Descripcion</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                      placeholder="Buscar descripción..."
                      value={filtros.descripcion || ""}
                      onChange={(e) => setFiltros({ ...filtros, descripcion: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Serial</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                      placeholder="Número de serial"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bodega</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                      value={filtros.bodega_id || ""}
                      onChange={(e) => setFiltros({ ...filtros, bodega_id: e.target.value })}
                    >
                      <option value="">TODAS</option>
                      {bodegas.map((b) => (
                        <option key={b.id} value={b.id}>{b.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]">
                      <option value="">TODAS</option>
                      <option value="cadenas">Cadenas</option>
                      <option value="anillos">Anillos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Grupo</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]">
                      <option value="">TODOS</option>
                      <option value="oro_laminado">Oro Laminado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SubGrupo</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]">
                      <option value="">TODOS</option>
                      <option value="18k">18K</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Marca</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]">
                      <option value="">TODAS</option>
                      <option value="doha">DOHA</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex items-center gap-2 bg-[#D3AB80] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    Buscar
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 font-medium">Codigo</th>
                        <th className="px-4 py-3 font-medium">Ref Fabrica</th>
                        <th className="px-4 py-3 font-medium">Descripcion</th>
                        <th className="px-4 py-3 font-medium">Presentacion</th>
                        <th className="px-4 py-3 font-medium text-center">Paquete</th>
                        <th className="px-4 py-3 font-medium">Bodega</th>
                        <th className="px-4 py-3 font-medium text-right">Saldo</th>
                        <th className="px-4 py-3 font-medium text-right">Reservado</th>
                        <th className="px-4 py-3 font-medium text-right">Disponible</th>
                        <th className="px-4 py-3 font-medium text-right">Transito</th>
                        <th className="px-4 py-3 font-medium text-right">Costo</th>
                        <th className="px-4 py-3 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {!hasSearched && !isSearching && (
                        <tr>
                          <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                            Utilice los filtros y presione Buscar para consultar las unidades.
                          </td>
                        </tr>
                      )}

                      {isSearching && (
                        <tr>
                          <td colSpan={12} className="px-4 py-8 text-center">
                            <div className="flex justify-center items-center gap-2 text-[#D3AB80]">
                              <Loader2 className="w-6 h-6 animate-spin" />
                              <span>Cargando datos...</span>
                            </div>
                          </td>
                        </tr>
                      )}

                      {hasSearched && productos.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3">{item.codigo}</td>
                          <td className="px-4 py-3">{item.ref_fabrica || "-"}</td>
                          <td className="px-4 py-3 truncate max-w-[200px]" title={item.descripcion}>{item.descripcion}</td>
                          <td className="px-4 py-3">{item.presentacion || "Unidad"}</td>
                          <td className="px-4 py-3 text-center">1</td>
                          <td className="px-4 py-3">{bodegas.find(b => b.id === item.bodega_id)?.nombre || "-"}</td>
                          <td className="px-4 py-3 text-right font-medium">{item.saldo_actual}</td>
                          <td className="px-4 py-3 text-right text-orange-600">0</td>
                          <td className="px-4 py-3 text-right text-green-600">{item.saldo_actual}</td>
                          <td className="px-4 py-3 text-right text-blue-600">0</td>
                          <td className="px-4 py-3 text-right">${item.costo.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-medium">${(item.costo * item.saldo_actual).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    {hasSearched && (
                      <tfoot className="bg-gray-50 font-semibold border-t-2 border-gray-200">
                        <tr>
                          <td colSpan={6} className="px-4 py-3 text-right">Totales:</td>
                          <td className="px-4 py-3 text-right">{totals.saldo}</td>
                          <td className="px-4 py-3 text-right text-orange-600">{totals.reservado}</td>
                          <td className="px-4 py-3 text-right text-green-600">{totals.disponible}</td>
                          <td className="px-4 py-3 text-right text-blue-600">{totals.transito}</td>
                          <td className="px-4 py-3 text-right">-</td>
                          <td className="px-4 py-3 text-right">${totals.totalCosto.toLocaleString()}</td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "reporte" && (
            <motion.div
              key="reporte"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
               {/* Filtros Reporte */}
               <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-1">Bodega</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]">
                      <option value="">SELECCIONE</option>
                      <option value="BODEGA PRINCIPAL DOHA">BODEGA PRINCIPAL DOHA</option>
                      <option value="BODEGA MEDELLÍN">BODEGA MEDELLÍN</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fecha</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]">
                      <option value="">SELECCIONE</option>
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Costo</label>
                    <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]">
                      <option value="">SELECCIONE</option>
                      <option value="no">No</option>
                      <option value="si">Si</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-[#D3AB80] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Generar
                  </button>
                </div>
              </div>

              {/* Mensaje de Exito */}
              <AnimatePresence>
                {reportGenerated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>El reporte ha sido generado y descargado exitosamente.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nuevo Producto Modal */}
        <AnimatePresence>
          {showNewProductModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-[#472825]">Nuevo Producto</h2>
                  <button
                    onClick={() => setShowNewProductModal(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto">
                  <form id="newProductForm" onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Código</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                        placeholder="Ej. CD-18K"
                        value={newProductData.codigo}
                        onChange={(e) => setNewProductData({ ...newProductData, codigo: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Ref Fábrica</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                        value={newProductData.ref_fabrica}
                        onChange={(e) => setNewProductData({ ...newProductData, ref_fabrica: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Descripción</label>
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                        value={newProductData.descripcion}
                        onChange={(e) => setNewProductData({ ...newProductData, descripcion: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Presentación</label>
                      <select
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                        value={newProductData.presentacion}
                        onChange={(e) => setNewProductData({ ...newProductData, presentacion: e.target.value })}
                      >
                        <option value="Unidad">Unidad</option>
                        <option value="Paca">Paca</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bodega</label>
                      <select
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                        value={newProductData.bodega_id}
                        onChange={(e) => setNewProductData({ ...newProductData, bodega_id: e.target.value })}
                      >
                        <option value="">Seleccione bodega...</option>
                        {bodegas.map((b) => (
                          <option key={b.id} value={b.id}>{b.nombre}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Saldo Actual</label>
                      <input
                        type="number"
                        min="0"
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                        value={newProductData.saldo_actual}
                        onChange={(e) => setNewProductData({ ...newProductData, saldo_actual: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Costo</label>
                      <input
                        type="number"
                        min="0"
                        required
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80]"
                        value={newProductData.costo}
                        onChange={(e) => setNewProductData({ ...newProductData, costo: Number(e.target.value) })}
                      />
                    </div>
                  </form>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setShowNewProductModal(false)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                    disabled={isSaving}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    form="newProductForm"
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-[#D3AB80] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 font-medium"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Guardar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

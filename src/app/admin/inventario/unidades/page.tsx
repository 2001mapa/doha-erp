"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, CheckCircle2 } from "lucide-react";
import { getBodegas, getProductos, ProductoFiltros } from "@/src/actions/inventario";
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
          <button
            onClick={handleToggleView}
            className="bg-[#472825] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            {viewMode === "consulta" ? "Ver Reporte Contabilidad" : "Volver a Consulta"}
          </button>
        </div>

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
      </div>
    </div>
  );
}

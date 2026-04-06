"use client";

import React, { useState } from "react";
import { Plus, Settings, FileSpreadsheet, Search, Download, Trash2, Edit, FileText } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createFacturaCompleta } from "@/src/actions/facturacion";
import { generarFacturaPDF } from "@/src/utils/exportPdf";

// Mock Data Interfaces
interface Factura {
  id: string;
  documento: string;
  fecha: string;
  nit: string;
  tercero: string;
  vendedor: string;
  ciudad: string;
  valorBruto: number;
  impuesto: number;
  total: number;
  estado: string;
  detalles: string;
  entregado: string;
}

interface UserConfig {
  id: string;
  usuario: string;
  precioNivelMin: string;
  dcto: string;
  dctoMax: number;
  precioMod: string;
  facturaDebajoCosto: string;
}

export default function FacturasPage() {
  // State for modals
  const [showNewModal, setShowNewModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("REM");

  // State for mock data
  const [facturas, setFacturas] = useState<Factura[]>([
    {
      id: "1",
      documento: "FV-1020",
      fecha: "04/04/2026",
      nit: "900.123.456-7",
      tercero: "CLIENTE VIP 1",
      vendedor: "Vendedor A",
      ciudad: "Medellín",
      valorBruto: 1200000,
      impuesto: 228000,
      total: 1428000,
      estado: "Pagada",
      detalles: "Ver",
      entregado: "SI",
    },
    {
      id: "2",
      documento: "FV-1021",
      fecha: "05/04/2026",
      nit: "800.987.654-3",
      tercero: "JUAN PEREZ",
      vendedor: "Vendedor B",
      ciudad: "Bogotá",
      valorBruto: 500000,
      impuesto: 95000,
      total: 595000,
      estado: "Pendiente",
      detalles: "Ver",
      entregado: "NO",
    },
  ]);

  const [userConfigs] = useState<UserConfig[]>([
    {
      id: "1",
      usuario: "Sede Medellín",
      precioNivelMin: "Precio 1",
      dcto: "SI",
      dctoMax: 10,
      precioMod: "NO",
      facturaDebajoCosto: "NO",
    },
    {
      id: "2",
      usuario: "Sede Bogotá",
      precioNivelMin: "Precio 2",
      dcto: "SI",
      dctoMax: 5,
      precioMod: "SI",
      facturaDebajoCosto: "NO",
    },
  ]);

  // Handlers for deleting rows
  const handleDeleteFactura = (id: string) => {
    setFacturas(facturas.filter((f) => f.id !== id));
  };

  const handleSaveNuevaFactura = () => {
    setShowNewModal(false);
    setShowCreateForm(true);
  };

  const handleEmitirFactura = async () => {
    setIsSaving(true);
    try {
      // Mocking selected client and details data from a "shopping cart" or form
      const clienteMock = {
        nombre: "CLIENTE VIP 1",
        nit: "900.123.456-7"
      };

      const facturaMockPayload = {
        documento: `${tipoDocumentoSeleccionado}-${Math.floor(Math.random() * 10000)}`,
        fecha: new Date().toLocaleDateString(),
        valor_bruto: 1200000,
        impuesto: 228000,
        total: 1428000,
        estado: "Pendiente"
      };

      const detallesMockPayload = [
        {
          producto_id: "00000000-0000-0000-0000-000000000000", // Would be actual UUID in prod
          cantidad: 1,
          precio_unitario: 1200000,
          subtotal: 1200000,
          nombre: "Anillo de Oro 18k"
        }
      ];

      const res = await createFacturaCompleta(facturaMockPayload, detallesMockPayload);

      if (res.success) {
        // Add to local state to reflect UI changes immediately
        const newFactura: Factura = {
          id: res.facturaId || Math.random().toString(),
          documento: facturaMockPayload.documento,
          fecha: facturaMockPayload.fecha,
          nit: clienteMock.nit,
          tercero: clienteMock.nombre,
          vendedor: "Vendedor Actual",
          ciudad: "Ciudad Actual",
          valorBruto: facturaMockPayload.valor_bruto,
          impuesto: facturaMockPayload.impuesto,
          total: facturaMockPayload.total,
          estado: facturaMockPayload.estado,
          detalles: "Ver",
          entregado: "NO",
        };
        setFacturas([newFactura, ...facturas]);
        setShowCreateForm(false);
      } else {
        alert("Error al guardar: " + res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 text-[#472825] bg-[#fdfbf9] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black">Facturas</h1>
        {/* 1. Botones de Acción Superiores */}
        <div className="flex space-x-3">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded shadow-sm transition-colors">
            Emitir Pendientes
          </button>
          <button className="bg-[#D3AB80] hover:bg-[#c29b70] text-white font-bold py-2 px-4 rounded shadow-sm transition-colors flex items-center">
            <span title="Descargar Excel" className="flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Descargar listado a excel
            </span>
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-sm transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva Factura
          </button>
          <button
            onClick={() => setShowConfigModal(true)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded shadow-sm transition-colors flex items-center"
          >
             <span title="Configuración" className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Configuración usuarios
             </span>
          </button>
        </div>
      </div>

      {/* 2. Panel de Filtros (Card blanca con Grid) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Fila 1 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Documento
            </label>
            <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
              <option value="">TODOS</option>
              <option value="REM">REMISION</option>
              <option value="FC">FACTURA</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Fecha Desde
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Fecha Hasta
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Numero Factura
            </label>
            <input
              type="text"
              placeholder="Ej. 1020"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Cliente
            </label>
            <input
              type="text"
              placeholder="Nombre o NIT"
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Fila 2 */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Observacion
            </label>
            <input
              type="text"
              placeholder="Buscar en observaciones..."
              className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Vendedor
            </label>
            <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
              <option value="TODOS">TODOS</option>
              <option value="MEDELLIN">Sede Medellín</option>
              <option value="BOGOTA">Sede Bogotá</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Entregado
            </label>
            <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
              <option value="TODOS">TODOS</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Factura Emitida
            </label>
            <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
              <option value="TODOS">TODOS</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end items-center space-x-2 border-t pt-4">
          <button className="p-2 text-gray-500 hover:text-[#D3AB80] transition-colors">
            <span title="Exportar PDF"><Download className="w-5 h-5" /></span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-sm font-bold flex items-center transition-colors">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
        </div>
      </div>

      {/* 3. Tabla de Datos Principal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
              <tr>
                <th className="p-4">Acciones</th>
                <th className="p-4">Documento</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Nit</th>
                <th className="p-4">Tercero</th>
                <th className="p-4">Vendedor</th>
                <th className="p-4">Ciudad</th>
                <th className="p-4">Valor Bruto</th>
                <th className="p-4">Impuesto</th>
                <th className="p-4">Total</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Detalles</th>
                <th className="p-4">Entregado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {facturas.length === 0 ? (
                <tr>
                  <td colSpan={13} className="p-8 text-center text-gray-500">
                    No hay facturas para mostrar.
                  </td>
                </tr>
              ) : (
                facturas.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex space-x-2">
                      <button className="text-gray-400 hover:text-[#D3AB80] transition-colors" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFactura(f.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const cliente = { nombre: f.tercero, nit: f.nit };
                          // Mocking details for the PDF export based on the row
                          const detalles = [
                            { nombre: "Producto 1", cantidad: 1, precio_unitario: f.valorBruto, subtotal: f.valorBruto }
                          ];
                          generarFacturaPDF(f, detalles, cliente);
                        }}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                        title="Descargar PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="p-4 font-medium">{f.documento}</td>
                    <td className="p-4">{f.fecha}</td>
                    <td className="p-4">{f.nit}</td>
                    <td className="p-4">{f.tercero}</td>
                    <td className="p-4">{f.vendedor}</td>
                    <td className="p-4">{f.ciudad}</td>
                    <td className="p-4">${f.valorBruto.toLocaleString()}</td>
                    <td className="p-4">${f.impuesto.toLocaleString()}</td>
                    <td className="p-4 font-bold text-gray-900">
                      ${f.total.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          f.estado === "Pagada"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {f.estado}
                      </span>
                    </td>
                    <td className="p-4 text-blue-600 cursor-pointer hover:underline">
                      {f.detalles}
                    </td>
                    <td className="p-4">{f.entregado}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Modal A: "Seleccione el tipo de factura" */}
      <AnimatePresence>
        {showNewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            >
              <h2 className="text-xl font-bold mb-4 text-[#472825]">
                Seleccione el tipo de factura
              </h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Documento
                </label>
                <select
                  className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
                  value={tipoDocumentoSeleccionado}
                  onChange={(e) => setTipoDocumentoSeleccionado(e.target.value)}
                >
                  <option value="REM">REM - REMISION</option>
                  <option value="FC">FC - FACTURA</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewModal(false)}
                  disabled={isSaving}
                  className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded font-semibold transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveNuevaFactura}
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#D3AB80] hover:bg-[#c29b70] text-white rounded font-bold transition-colors disabled:opacity-50"
                >
                  {isSaving ? "Guardando..." : "Aceptar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulario Principal de Creación de Factura */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#472825]">
                  Nueva Factura / Remisión ({tipoDocumentoSeleccionado})
                </h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto bg-[#fdfbf9] flex-1">
                {/* 1. Selección de Cliente */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-bold text-[#472825] mb-4">Información del Cliente</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre</label>
                      <input
                        type="text"
                        value="CLIENTE VIP 1"
                        readOnly
                        className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">NIT / Cédula</label>
                      <input
                        type="text"
                        value="900.123.456-7"
                        readOnly
                        className="w-full border border-gray-300 rounded p-2 text-sm bg-gray-50 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Detalles / Productos */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="text-lg font-bold text-[#472825]">Detalle de Productos</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-gray-100 text-gray-600 font-semibold border-b">
                        <tr>
                          <th className="p-4">Producto</th>
                          <th className="p-4 text-center">Cantidad</th>
                          <th className="p-4 text-right">Precio Unitario</th>
                          <th className="p-4 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                          <td className="p-4 font-medium">Anillo de Oro 18k</td>
                          <td className="p-4 text-center">1</td>
                          <td className="p-4 text-right">$1,200,000</td>
                          <td className="p-4 text-right font-bold">$1,200,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Totales */}
                <div className="flex justify-end">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full max-w-sm">
                    <h3 className="text-lg font-bold text-[#472825] mb-4">Totales</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Valor Bruto:</span>
                        <span className="font-semibold text-gray-800">$1,200,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Impuestos:</span>
                        <span className="font-semibold text-gray-800">$228,000</span>
                      </div>
                      <div className="pt-2 mt-2 border-t flex justify-between text-base">
                        <span className="text-gray-900 font-bold">Total:</span>
                        <span className="font-bold text-[#D3AB80]">$1,428,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="p-4 border-t bg-white flex justify-between items-center">
                <button
                  onClick={() => setShowCreateForm(false)}
                  disabled={isSaving}
                  className="px-6 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded font-bold transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEmitirFactura}
                  disabled={isSaving}
                  className="px-6 py-2 bg-[#D3AB80] hover:bg-[#c29b70] text-white rounded font-bold transition-colors disabled:opacity-50 flex items-center"
                >
                  {isSaving ? "Guardando..." : "Emitir / Guardar Factura"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Modal B: "CONFIGURACION DE USUARIOS EN FACTURA" */}
      <AnimatePresence>
        {showConfigModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#472825]">
                  CONFIGURACION DE USUARIOS EN FACTURA
                </h2>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                {/* Fila superior de controles (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6 items-end bg-white p-4 rounded border border-gray-200">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Usuario
                    </label>
                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                      <option value="">Seleccionar...</option>
                      <option value="Sede Medellín">Sede Medellín</option>
                      <option value="Sede Bogotá">Sede Bogotá</option>
                    </select>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Precio nivel min
                    </label>
                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                      <option value="NO APLICA">NO APLICA</option>
                      <option value="Precio 1">Precio 1</option>
                      <option value="Precio 2">Precio 2</option>
                    </select>
                  </div>
                  <div className="md:col-span-1 flex items-center h-10 space-x-2">
                    <input type="checkbox" id="dcto" className="w-4 h-4 text-[#D3AB80] focus:ring-[#D3AB80] border-gray-300 rounded" />
                    <label htmlFor="dcto" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Descuento Aplica
                    </label>
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">
                      Descuento Max (%)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
                    />
                  </div>
                  <div className="md:col-span-1 flex flex-col space-y-2 mt-2 md:mt-0 justify-center">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="noMod" className="w-4 h-4 text-[#D3AB80] focus:ring-[#D3AB80] border-gray-300 rounded" />
                      <label htmlFor="noMod" className="text-xs font-medium text-gray-700 cursor-pointer leading-tight">
                        No Modifica Precio
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="noCosto" className="w-4 h-4 text-[#D3AB80] focus:ring-[#D3AB80] border-gray-300 rounded" />
                      <label htmlFor="noCosto" className="text-xs font-medium text-gray-700 cursor-pointer leading-tight">
                        No Precio Menor costo
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                     <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-sm transition-colors w-full">
                       GUARDAR
                     </button>
                  </div>
                </div>

                {/* Tabla interna del modal */}
                <div className="border border-gray-200 rounded overflow-hidden">
                   <table className="w-full text-left text-sm whitespace-nowrap">
                     <thead className="bg-gray-100 text-gray-600 font-semibold border-b">
                       <tr>
                         <th className="p-3">Usuario</th>
                         <th className="p-3">Precio nivel min</th>
                         <th className="p-3">Dcto</th>
                         <th className="p-3 text-center">Dcto Max</th>
                         <th className="p-3 text-center">Precio Mod</th>
                         <th className="p-3 text-center">Factura Debajo de Costo</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                        {userConfigs.map((config) => (
                          <tr key={config.id} className="hover:bg-gray-50">
                            <td className="p-3 font-medium">{config.usuario}</td>
                            <td className="p-3">{config.precioNivelMin}</td>
                            <td className="p-3">{config.dcto}</td>
                            <td className="p-3 text-center">{config.dctoMax}%</td>
                            <td className="p-3 text-center">{config.precioMod}</td>
                            <td className="p-3 text-center">{config.facturaDebajoCosto}</td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-end">
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-bold transition-colors"
                  >
                    Cerrar
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

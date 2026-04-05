"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileSearch,
  Plus,
  Search,
  FileDown,
  Trash2,
  FileText,
  CheckCircle,
} from "lucide-react";

interface Devolucion {
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
  descargado: boolean;
}

const mockData: Devolucion[] = [
  {
    id: "1",
    documento: "DV-001",
    fecha: "05/04/2026",
    nit: "900.123.456-7",
    tercero: "Joyería El Diamante",
    vendedor: "William Gomez",
    ciudad: "Medellín",
    valorBruto: 450000,
    impuesto: 85500,
    total: 450000,
    estado: "TERMINADA",
    descargado: true,
  },
  {
    id: "2",
    documento: "DV-002",
    fecha: "06/04/2026",
    nit: "800.987.654-3",
    tercero: "Accesorios Oro Fino",
    vendedor: "Ana Martínez",
    ciudad: "Bogotá",
    valorBruto: 1200000,
    impuesto: 228000,
    total: 1200000,
    estado: "CREACION",
    descargado: false,
  },
];

export default function DevolucionesPage() {
  const [devoluciones, setDevoluciones] = useState<Devolucion[]>(mockData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoDevolucion, setTipoDevolucion] = useState("DV");

  // Filter States
  const [filtroDocumento, setFiltroDocumento] = useState("Todos");
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroNumero, setFiltroNumero] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroEntregado, setFiltroEntregado] = useState("TODOS");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

  const handleDelete = (id: string) => {
    setDevoluciones((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] min-h-screen text-[#472825]">
      {/* 1. Botones de Acción Superiores */}
      <div className="flex gap-4 mb-6">
        <button className="flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors" title="Crear desde factura">
          <FileSearch size={24} />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center w-12 h-12 bg-[#D3AB80] text-white rounded hover:bg-[#b8956b] transition-colors"
          title="Nueva Devolución"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* 2. Panel de Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 md:items-start">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Fila 1 */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Documento</label>
            <select
              value={filtroDocumento}
              onChange={(e) => setFiltroDocumento(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            >
              <option value="Todos">Todos</option>
              <option value="DV">DV</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Fecha Desde</label>
            <input
              type="date"
              value={filtroFechaDesde}
              onChange={(e) => setFiltroFechaDesde(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Fecha Hasta</label>
            <input
              type="date"
              value={filtroFechaHasta}
              onChange={(e) => setFiltroFechaHasta(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Numero</label>
            <input
              type="text"
              placeholder="Numero Factura"
              value={filtroNumero}
              onChange={(e) => setFiltroNumero(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-semibold mb-1">Cliente</label>
            <input
              type="text"
              placeholder="Nombre Tercero"
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>

          {/* Fila 2 */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-xs font-semibold mb-1">Entregado</label>
            <select
              value={filtroEntregado}
              onChange={(e) => setFiltroEntregado(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            >
              <option value="TODOS">TODOS</option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <div className="flex flex-col md:col-span-3">
            <label className="text-xs font-semibold mb-1">Estado</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            >
              <option value="TODOS">TODOS</option>
              <option value="CREACION">CREACION</option>
              <option value="CONCLUIDA">CONCLUIDA</option>
              <option value="TERMINADA">TERMINADA</option>
              <option value="EMITIDA">EMITIDA</option>
              <option value="REUBICADA">REUBICADA</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-end pt-5">
          <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" title="Buscar">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium">
          <FileDown size={18} />
          Descargar listado a excel
        </button>
      </div>

      {/* 3. Tabla de Resultados */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
              <th className="p-4">Descargado</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {devoluciones.length === 0 ? (
              <tr>
                <td colSpan={13} className="p-4 text-center text-gray-500">
                  No hay devoluciones para mostrar.
                </td>
              </tr>
            ) : (
              devoluciones.map((dev) => (
                <tr key={dev.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(dev.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                  <td className="p-4 font-medium">{dev.documento}</td>
                  <td className="p-4 text-gray-600">{dev.fecha}</td>
                  <td className="p-4 text-gray-600">{dev.nit}</td>
                  <td className="p-4 text-gray-800">{dev.tercero}</td>
                  <td className="p-4 text-gray-600">{dev.vendedor}</td>
                  <td className="p-4 text-gray-600">{dev.ciudad}</td>
                  <td className="p-4 text-right">${dev.valorBruto.toLocaleString()}</td>
                  <td className="p-4 text-right">${dev.impuesto.toLocaleString()}</td>
                  <td className="p-4 text-right font-medium">${dev.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      dev.estado === 'TERMINADA' ? 'bg-green-100 text-green-800' :
                      dev.estado === 'CREACION' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {dev.estado}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Ver Detalles">
                      <FileText size={18} />
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    {dev.descargado ? (
                      <CheckCircle size={18} className="text-green-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 4. Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#472825]">Seleccione el tipo de Devolucion</h2>
              </div>
              <div className="p-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Tipo de Documento</label>
                <select
                  value={tipoDevolucion}
                  onChange={(e) => setTipoDevolucion(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent bg-white"
                >
                  <option value="DV">DV - DEVOLUCION EN VENTA</option>
                  <option value="DV2">DV 2 - DEVOLUCION EN VENTA 2</option>
                </select>
              </div>
              <div className="p-6 bg-gray-50 flex justify-between items-center border-t border-gray-100">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-[#D3AB80] hover:bg-[#b8956b] transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

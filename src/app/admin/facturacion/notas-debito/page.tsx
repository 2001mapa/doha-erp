"use client";

import React, { useState } from "react";
import { Search, FileSpreadsheet, Trash2, Eye } from "lucide-react";

// Mock data definition
interface NotaDebito {
  id: number;
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
}

const INITIAL_MOCK_DATA: NotaDebito[] = [
  {
    id: 1,
    documento: "ND-001",
    fecha: "06/04/2026",
    nit: "900123456-1",
    tercero: "Joyería El Diamante",
    vendedor: "WILLIAM GOMEZ",
    ciudad: "Medellín",
    valorBruto: 50000,
    impuesto: 0,
    total: 50000,
    estado: "APLICADA",
  },
  {
    id: 2,
    documento: "ND-002",
    fecha: "07/04/2026",
    nit: "800987654-2",
    tercero: "Comercializadora Oro Puro",
    vendedor: "BODEGA PRINCIPAL",
    ciudad: "Bogotá",
    valorBruto: 120000,
    impuesto: 22800,
    total: 142800,
    estado: "PENDIENTE",
  },
];

export default function NotasDebitoPage() {
  // Filtros state
  const [documento, setDocumento] = useState("TODOS");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [numero, setNumero] = useState("");
  const [cliente, setCliente] = useState("");
  const [observacion, setObservacion] = useState("");
  const [vendedor, setVendedor] = useState("TODOS");

  // Interactivity state
  const [isSearching, setIsSearching] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [data, setData] = useState<NotaDebito[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<number | null>(null);

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(false);

    // Simulate API delay
    setTimeout(() => {
      setData([...INITIAL_MOCK_DATA]);
      setIsSearching(false);
      setHasSearched(true);
    }, 1000);
  };

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
    }, 1000);
  };

  const handleViewDetails = (id: number) => {
    // Just toggling the state to satisfy the interactivity requirement
    setSelectedDetails(id === selectedDetails ? null : id);
  };

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] min-h-screen">
      <h1 className="text-3xl font-bold text-[#472825] mb-6">Notas Débito</h1>

      {/* Filter Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Row 1 */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#472825] mb-1">Documento</label>
            <select
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            >
              <option value="TODOS">TODOS</option>
              <option value="ND - NOTA DEBITO">ND - NOTA DEBITO</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#472825] mb-1">Fecha Desde</label>
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#472825] mb-1">Fecha Hasta</label>
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#472825] mb-1">Número</label>
            <input
              type="text"
              placeholder="Numero Factura"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-[#472825] mb-1">Cliente</label>
            <input
              type="text"
              placeholder="Nombre Tercero"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-[#472825] mb-1">Observación</label>
            <input
              type="text"
              placeholder="Observacion factura"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-[#472825] mb-1">Vendedor</label>
            <select
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
            >
              <option value="TODOS">TODOS</option>
              <option value="99 - BODEGA PRINCIPAL">99 - BODEGA PRINCIPAL</option>
              <option value="100 - WILLIAM GOMEZ">100 - WILLIAM GOMEZ</option>
            </select>
          </div>
          <div className="flex flex-col justify-end items-end md:col-span-1">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md flex items-center justify-center w-10 h-10 transition-colors disabled:opacity-50"
              title="Buscar"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Export Action */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExport}
          disabled={isExporting || data.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm transition-colors shadow-sm disabled:opacity-50"
        >
          {isExporting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FileSpreadsheet size={16} />
          )}
          <span>{isExporting ? "Exportando..." : "Descargar listado a excel"}</span>
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-[#472825]">
            <thead className="bg-[#f8f6f3] border-b border-gray-200 text-xs uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Acciones</th>
                <th className="px-4 py-3">Documento</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Nit</th>
                <th className="px-4 py-3">Tercero</th>
                <th className="px-4 py-3">Vendedor</th>
                <th className="px-4 py-3">Ciudad</th>
                <th className="px-4 py-3 text-right">Valor Bruto</th>
                <th className="px-4 py-3 text-right">Impuesto</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-center">Detalles</th>
              </tr>
            </thead>
            <tbody>
              {!hasSearched && !isSearching && (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                    Haga clic en buscar para ver los resultados
                  </td>
                </tr>
              )}

              {isSearching && (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-[#D3AB80]">
                      <div className="w-6 h-6 border-2 border-[#D3AB80] border-t-transparent rounded-full animate-spin"></div>
                      <span>Buscando...</span>
                    </div>
                  </td>
                </tr>
              )}

              {hasSearched && !isSearching && data.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                    No se encontraron resultados
                  </td>
                </tr>
              )}

              {hasSearched && !isSearching && data.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{row.documento}</td>
                  <td className="px-4 py-3">{row.fecha}</td>
                  <td className="px-4 py-3">{row.nit}</td>
                  <td className="px-4 py-3">{row.tercero}</td>
                  <td className="px-4 py-3 truncate max-w-[150px]" title={row.vendedor}>{row.vendedor}</td>
                  <td className="px-4 py-3">{row.ciudad}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(row.valorBruto)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(row.impuesto)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(row.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.estado === "APLICADA" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {row.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleViewDetails(row.id)}
                      className={`transition-colors ${selectedDetails === row.id ? 'text-[#472825]' : 'text-[#D3AB80] hover:text-[#b8956c]'}`}
                      title="Ver Detalles"
                    >
                      <Eye size={18} className="mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

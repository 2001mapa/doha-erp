"use client";

import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";

type InvoiceResult = {
  documento: string;
  fecha: string;
  tercero: string;
  vendedor: string;
  ciudad: string;
  total: number;
  estado: string;
};

const mockData: InvoiceResult[] = [
  {
    documento: "REM-1045",
    fecha: "03/04/2026",
    tercero: "Joyería El Diamante",
    vendedor: "WILLIAM GOMEZ",
    ciudad: "Medellín",
    total: 3500000,
    estado: "Entregado",
  },
  {
    documento: "REM-1046",
    fecha: "04/04/2026",
    tercero: "Oro Real S.A.",
    vendedor: "MIGUEL RESTREPO",
    ciudad: "Bogotá",
    total: 1250000,
    estado: "Pendiente",
  },
  {
    documento: "REM2-2001",
    fecha: "05/04/2026",
    tercero: "Accesorios Brillantes",
    vendedor: "BODEGA PRINCIPAL",
    ciudad: "Cali",
    total: 8900000,
    estado: "Entregado",
  },
];

export default function BuscadorFacturasPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<InvoiceResult[]>([]);

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(false);
    setResults([]);

    setTimeout(() => {
      setResults(mockData);
      setHasSearched(true);
      setIsSearching(false);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-[#fdfbf9] min-h-screen text-[#472825]">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#472825]">Buscador Global de Facturas</h1>

        {/* Panel de Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Fila 1 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="documento">Documento</label>
              <select id="documento" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                <option value="TODOS">TODOS</option>
                <option value="REM">REM - REMISION</option>
                <option value="REM2">REM2 - REMISION 2</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="fechaDesde">Fecha Desde</label>
              <input type="date" id="fechaDesde" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="fechaHasta">Fecha Hasta</label>
              <input type="date" id="fechaHasta" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="numero">Numero</label>
              <input type="text" id="numero" placeholder="Ej: 1045" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="cliente">Cliente</label>
              <input type="text" id="cliente" placeholder="Nombre del cliente" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
            </div>

            {/* Fila 2 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="observacion">Observacion</label>
              <input type="text" id="observacion" placeholder="Observaciones" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="vendedor">Vendedor</label>
              <select id="vendedor" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                <option value="TODOS">TODOS</option>
                <option value="99">99 - BODEGA PRINCIPAL</option>
                <option value="100">100 - WILLIAM GOMEZ</option>
                <option value="101">101 - MIGUEL RESTREPO</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="entregado">Entregado</label>
              <select id="entregado" className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#D3AB80]">
                <option value="TODOS">TODOS</option>
                <option value="SI">SI</option>
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Espacio vacío para alinear */}
            <div className="hidden md:block"></div>

            {/* Botón Buscar */}
            <div className="flex items-end">
              <div title="Buscar Facturas" className="w-full">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full py-2 bg-[#D3AB80] hover:bg-[#c29b70] text-white rounded flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed h-[42px]"
                >
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Resultados */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fdfbf9] border-b border-gray-200">
                  <th className="p-4 font-semibold text-[#472825]">Documento</th>
                  <th className="p-4 font-semibold text-[#472825]">Fecha</th>
                  <th className="p-4 font-semibold text-[#472825]">Tercero</th>
                  <th className="p-4 font-semibold text-[#472825]">Vendedor</th>
                  <th className="p-4 font-semibold text-[#472825]">Ciudad</th>
                  <th className="p-4 font-semibold text-[#472825]">Total</th>
                  <th className="p-4 font-semibold text-[#472825]">Estado</th>
                </tr>
              </thead>
              <tbody>
                {!hasSearched && !isSearching && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      Ingrese los parámetros de búsqueda y presione el botón para ver resultados.
                    </td>
                  </tr>
                )}

                {isSearching && (
                  <tr>
                    <td colSpan={7} className="p-12 text-center">
                      <div className="flex flex-col items-center justify-center text-[#D3AB80]">
                        <Loader2 className="w-8 h-8 animate-spin mb-2" />
                        <span className="text-[#472825]">Buscando facturas...</span>
                      </div>
                    </td>
                  </tr>
                )}

                {hasSearched && !isSearching && results.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500">
                      No se encontraron resultados para su búsqueda.
                    </td>
                  </tr>
                )}

                {hasSearched && !isSearching && results.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{item.documento}</td>
                    <td className="p-4">{item.fecha}</td>
                    <td className="p-4">{item.tercero}</td>
                    <td className="p-4">{item.vendedor}</td>
                    <td className="p-4">{item.ciudad}</td>
                    <td className="p-4">{formatCurrency(item.total)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.estado === 'Entregado'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

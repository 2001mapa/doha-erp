"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

export default function UtilidadBrutaPage() {
  const [grouping, setGrouping] = useState("facturas");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    fechaInicial: "",
    fechaFinal: "",
    vendedor: "TODOS",
    categoria: "",
    tipoDocumento: "REM",
    sucursal: "",
    formato: "Dinamico",
    costo: "Costo fecha factura",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const groupingOptions = [
    { id: "facturas", label: "Agrupado en facturas" },
    { id: "productos", label: "Agrupado en Productos" },
    { id: "vendedor", label: "Agrupado en Vendedor" },
    { id: "recaudo", label: "Agrupado en Recaudo" },
    { id: "tipo_documento", label: "Agrupado en tipo documento" },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResults(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Reportes de Facturacion / Utilidad Bruta</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Grouping Options */}
          <div className="lg:col-span-1 flex flex-col space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col space-y-2">
              <h2 className="font-semibold mb-2">Agrupación</h2>
              {groupingOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGrouping(opt.id)}
                  className={`text-left px-3 py-2 rounded-md transition-colors ${
                    grouping === opt.id
                      ? "bg-[#D3AB80] text-white font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg shadow transition flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generando...
                </>
              ) : (
                "Generar"
              )}
            </button>
          </div>

          {/* Right Panel - Filters */}
          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="font-semibold mb-4 border-b pb-2">Filtros Principales</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Fila 1 */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Fecha Inicial</label>
                  <input
                    type="date"
                    name="fechaInicial"
                    value={filters.fechaInicial}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Fecha Final</label>
                  <input
                    type="date"
                    name="fechaFinal"
                    value={filters.fechaFinal}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Vendedor</label>
                  <select
                    name="vendedor"
                    value={filters.vendedor}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none bg-white"
                  >
                    <option value="TODOS">TODOS</option>
                    <option value="Bodega Principal">Bodega Principal</option>
                    <option value="Vendedor 1">Vendedor 1</option>
                    <option value="Vendedor 2">Vendedor 2</option>
                  </select>
                </div>

                {/* Fila 2 */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Categoría</label>
                  <select
                    name="categoria"
                    value={filters.categoria}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none bg-white"
                  >
                    <option value="">Seleccione...</option>
                    <option value="Cadenas">Cadenas</option>
                    <option value="Pulseras">Pulseras</option>
                    <option value="Anillos">Anillos</option>
                    <option value="Topos">Topos</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Tipo Documento</label>
                  <select
                    name="tipoDocumento"
                    value={filters.tipoDocumento}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none bg-white"
                  >
                    <option value="REM">REM - REMISION</option>
                    <option value="FACL">FACL - FACTURA ELECTRONICA</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Sucursal</label>
                  <select
                    name="sucursal"
                    value={filters.sucursal}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none bg-white"
                  >
                    <option value="">Seleccione...</option>
                    <option value="Principal">Principal</option>
                    <option value="Norte">Sede Norte</option>
                  </select>
                </div>

                {/* Fila 3 */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Formato</label>
                  <select
                    name="formato"
                    value={filters.formato}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none bg-white"
                  >
                    <option value="Dinamico">Dinamico</option>
                    <option value="Excel">Excel</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Costo</label>
                  <select
                    name="costo"
                    value={filters.costo}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md p-2 focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none bg-white"
                  >
                    <option value="Costo fecha factura">Costo fecha factura</option>
                    <option value="Costo actual">Costo actual</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {showResults && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen de Rentabilidad</h2>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-blue-50 text-blue-900 px-4 py-3 rounded-md flex-1 text-center font-medium border border-blue-100">
                <span className="block text-sm text-blue-700 mb-1">Ventas Totales</span>
                $10,000,000
              </div>
              <div className="bg-red-50 text-red-900 px-4 py-3 rounded-md flex-1 text-center font-medium border border-red-100">
                <span className="block text-sm text-red-700 mb-1">Costo de Ventas</span>
                $6,000,000
              </div>
              <div className="bg-green-50 text-green-900 px-4 py-3 rounded-md flex-1 text-center font-bold border border-green-100">
                <span className="block text-sm text-green-700 font-medium mb-1">Utilidad Bruta</span>
                $4,000,000 (40% Margen)
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                    <th className="p-3 font-semibold">Documento</th>
                    <th className="p-3 font-semibold">Fecha</th>
                    <th className="p-3 font-semibold">Cliente</th>
                    <th className="p-3 font-semibold text-right">Venta</th>
                    <th className="p-3 font-semibold text-right">Costo</th>
                    <th className="p-3 font-semibold text-right">Utilidad</th>
                    <th className="p-3 font-semibold text-right">Margen</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">REM-1001</td>
                    <td className="p-3">2023-10-01</td>
                    <td className="p-3">Juan Perez</td>
                    <td className="p-3 text-right">$3,000,000</td>
                    <td className="p-3 text-right">$1,800,000</td>
                    <td className="p-3 text-right text-green-600 font-medium">$1,200,000</td>
                    <td className="p-3 text-right">40%</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">FACL-5020</td>
                    <td className="p-3">2023-10-02</td>
                    <td className="p-3">Maria Lopez</td>
                    <td className="p-3 text-right">$5,000,000</td>
                    <td className="p-3 text-right">$3,000,000</td>
                    <td className="p-3 text-right text-green-600 font-medium">$2,000,000</td>
                    <td className="p-3 text-right">40%</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">REM-1002</td>
                    <td className="p-3">2023-10-03</td>
                    <td className="p-3">Carlos Gomez</td>
                    <td className="p-3 text-right">$2,000,000</td>
                    <td className="p-3 text-right">$1,200,000</td>
                    <td className="p-3 text-right text-green-600 font-medium">$800,000</td>
                    <td className="p-3 text-right">40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

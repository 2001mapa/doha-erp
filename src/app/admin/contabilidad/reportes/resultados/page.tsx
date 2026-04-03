"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, FileText, FileSpreadsheet } from "lucide-react";

export default function EstadoDeResultadosPage() {
  const [tipoInforme, setTipoInforme] = useState("rango de fecha");
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [sucursal, setSucursal] = useState("TODOS");
  const [formato, setFormato] = useState("Dinámico");
  const [cuentasEn0, setCuentasEn0] = useState(false);
  const [moneda, setMoneda] = useState("COP - PESO COLOMBIANO");
  const [aplicaCierres, setAplicaCierres] = useState(false);
  const [nivel, setNivel] = useState("Auxiliar");

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerar = () => {
    setIsGenerating(true);
    setShowResults(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-6 pb-24 text-[#472825]">
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/contabilidad/reportes"
          className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow text-[#472825]"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Estado de Resultados</h1>
          <p className="text-zinc-500 mt-1">Generación y consulta del estado de resultados financieros.</p>
        </div>
      </div>

      {/* Panel de Filtros */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 mb-6 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 border-b border-zinc-100 pb-2">Parámetros del Reporte</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Fila 1 */}
            <div>
              <label className="block text-sm font-semibold mb-1">Tipo de Informe</label>
              <select
                className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
                value={tipoInforme}
                onChange={(e) => setTipoInforme(e.target.value)}
              >
                <option value="rango de fecha">rango de fecha</option>
                <option value="Saldos Dinámicos">Saldos Dinámicos</option>
                <option value="meses">meses</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Fecha Inicial</label>
              <input
                type="date"
                className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
                value={fechaInicial}
                onChange={(e) => setFechaInicial(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Fecha Final</label>
              <input
                type="date"
                className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Sucursal</label>
              <select
                className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
                value={sucursal}
                onChange={(e) => setSucursal(e.target.value)}
              >
                <option value="TODOS">TODOS</option>
                <option value="Sede Medellín">Sede Medellín</option>
              </select>
            </div>

            {/* Fila 2 */}
            <div>
              <label className="block text-sm font-semibold mb-1">Formato</label>
              <select
                className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
              >
                <option value="PDF">PDF</option>
                <option value="Dinámico">Dinámico</option>
                <option value="Excel">Excel</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D3AB80] focus:ring-[#D3AB80] border-zinc-300 rounded"
                  checked={cuentasEn0}
                  onChange={(e) => setCuentasEn0(e.target.checked)}
                />
                <span className="text-sm font-semibold">Cuentas en 0</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Moneda</label>
              <select
                className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
              >
                <option value="COP - PESO COLOMBIANO">COP - PESO COLOMBIANO</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D3AB80] focus:ring-[#D3AB80] border-zinc-300 rounded"
                  checked={aplicaCierres}
                  onChange={(e) => setAplicaCierres(e.target.checked)}
                />
                <span className="text-sm font-semibold">Aplica Cierres</span>
              </label>
            </div>
          </div>
        </div>

        {/* Fila 3: Selector de Nivel Contable */}
        <div className="bg-slate-50 border-t border-zinc-100 p-4 px-6 flex items-center flex-wrap gap-4">
          <span className="font-bold text-sm">Nivel:</span>
          <div className="flex flex-wrap gap-6">
            {["Auxiliar", "Subcuenta", "Cuenta", "Grupo", "Título"].map((opcion) => (
              <label key={opcion} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="nivel"
                  value={opcion}
                  checked={nivel === opcion}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-4 h-4 text-[#D3AB80] focus:ring-[#D3AB80] border-zinc-300"
                />
                <span className="text-sm">{opcion}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Botón de Acción y Exportación */}
      <div className="flex items-center justify-between mb-8">
        <div></div> {/* Spacer */}
        <button
          onClick={handleGenerar}
          disabled={isGenerating}
          className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          style={{ backgroundColor: "#D3AB80" }}
        >
          <Search size={20} />
          {isGenerating ? "Generando..." : "Generar"}
        </button>

        <div className="flex gap-2">
          {showResults && (
            <>
              <div title="Exportar a PDF">
                <button
                  className="flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors w-12 h-12"
                >
                  <FileText size={24} />
                </button>
              </div>
              <div title="Exportar a Excel">
                <button
                  className="flex items-center justify-center p-2 rounded-lg bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition-colors w-12 h-12"
                >
                  <FileSpreadsheet size={24} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Área de Resultados */}
      {!showResults && !isGenerating && (
        <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-12 flex items-center justify-center bg-zinc-50/50">
          <p className="text-zinc-400 font-medium text-lg">Seleccione los parámetros y presione Generar</p>
        </div>
      )}

      {isGenerating && (
        <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-zinc-50/50">
          <div className="w-10 h-10 border-4 border-[#D3AB80] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-zinc-500 font-medium text-lg">Procesando información contable...</p>
        </div>
      )}

      {showResults && !isGenerating && (
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-zinc-700">Código</th>
                  <th className="px-6 py-4 font-bold text-zinc-700">Cuenta</th>
                  <th className="px-6 py-4 font-bold text-zinc-700 text-right">Ingresos</th>
                  <th className="px-6 py-4 font-bold text-zinc-700 text-right">Costos</th>
                  <th className="px-6 py-4 font-bold text-zinc-700 text-right">Gastos</th>
                  <th className="px-6 py-4 font-bold text-zinc-700 text-right">Utilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {/* Mock Data */}
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium">4</td>
                  <td className="px-6 py-4">INGRESOS</td>
                  <td className="px-6 py-4 text-right">$ 500,000,000.00</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right font-semibold">$ 500,000,000.00</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium pl-10">41</td>
                  <td className="px-6 py-4">INGRESOS OPERACIONALES</td>
                  <td className="px-6 py-4 text-right">$ 480,000,000.00</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right font-semibold">$ 480,000,000.00</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium">5</td>
                  <td className="px-6 py-4">GASTOS</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right">$ 150,000,000.00</td>
                  <td className="px-6 py-4 text-right font-semibold text-red-600">-$ 150,000,000.00</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium">6</td>
                  <td className="px-6 py-4">COSTOS DE VENTAS</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right">$ 200,000,000.00</td>
                  <td className="px-6 py-4 text-right">$ 0.00</td>
                  <td className="px-6 py-4 text-right font-semibold text-red-600">-$ 200,000,000.00</td>
                </tr>
              </tbody>
              <tfoot className="bg-zinc-50 border-t-2 border-zinc-200">
                <tr>
                  <td colSpan={2} className="px-6 py-4 font-bold text-right">UTILIDAD DEL EJERCICIO</td>
                  <td className="px-6 py-4 font-bold text-right text-zinc-400">-</td>
                  <td className="px-6 py-4 font-bold text-right text-zinc-400">-</td>
                  <td className="px-6 py-4 font-bold text-right text-zinc-400">-</td>
                  <td className="px-6 py-4 font-bold text-right text-green-600">$ 150,000,000.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

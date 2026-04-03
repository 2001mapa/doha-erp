"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, FileSpreadsheet, Search, RefreshCw } from "lucide-react";

type TabType = "Históricos" | "Estado de Cuenta" | "Cartera Reporte" | "Panel de Edades";

export default function EdadesCarteraPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Panel de Edades");

  const [isGenerating, setIsGenerating] = useState(false);
  const [showEdadesData, setShowEdadesData] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [showHistoricosData, setShowHistoricosData] = useState(false);

  const tabs: TabType[] = ["Históricos", "Estado de Cuenta", "Cartera Reporte", "Panel de Edades"];

  const handleGenerateEdades = () => {
    setIsGenerating(true);
    setShowEdadesData(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowEdadesData(true);
    }, 1000);
  };

  const handleSearchHistoricos = () => {
    setIsSearching(true);
    setShowHistoricosData(false);
    setTimeout(() => {
      setIsSearching(false);
      setShowHistoricosData(true);
    }, 1000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full text-[#472825] min-h-screen bg-[#fdfbf9]">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Edades y Cartera</h1>

      {/* Navegación Superior (Tabs) */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-md font-semibold transition-colors relative overflow-hidden ${
              activeTab === tab
                ? "bg-[#D3AB80] text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#D3AB80] z-0"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "Panel de Edades" && (
            <div className="space-y-6">
              {/* Panel de Filtros Edades */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-[#472825]">Filtros - Panel de Edades</h2>
                  <div className="flex gap-2">
                    <span title="Exportar a PDF">
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <FileText size={20} />
                      </button>
                    </span>
                    <span title="Exportar a Excel">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors">
                        <FileSpreadsheet size={20} />
                      </button>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Col 1 */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Vendedor</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>TODOS</option>
                        <option>Juan Perez</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Edad Por</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>FECHA VENCIMIENTO</option>
                        <option>FECHA DOCUMENTO</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Fecha Venc.</label>
                      <input type="date" className="w-full border rounded p-2 text-sm bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Tercero Clasificación</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>TODAS</option>
                        <option>CLIENTE VIP</option>
                      </select>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Barrio</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>TODOS</option>
                        <option>Centro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Rango</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>TODOS</option>
                        <option>+0 DÍAS</option>
                        <option>+31 DÍAS</option>
                        <option>+60 DÍAS</option>
                        <option>+91 DÍAS</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Moneda</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>COP</option>
                        <option>USD</option>
                      </select>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Ciudad</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>TODAS</option>
                        <option>Bogotá</option>
                        <option>Medellín</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Sucursal</label>
                      <select className="w-full border rounded p-2 text-sm bg-white">
                        <option>PRINCIPAL</option>
                        <option>NORTE</option>
                      </select>
                    </div>
                  </div>

                  {/* Col 4 */}
                  <div className="flex flex-col justify-end">
                    <button
                      onClick={handleGenerateEdades}
                      disabled={isGenerating}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded shadow flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="animate-spin" size={20} />
                          Generando...
                        </>
                      ) : (
                        "Generar"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Resultados Edades */}
              {showEdadesData && (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Tercero</th>
                          <th className="px-4 py-3 font-semibold">Ultimo Pago</th>
                          <th className="px-4 py-3 font-semibold">Ciudad</th>
                          <th className="px-4 py-3 font-semibold">Vendedor</th>
                          <th className="px-4 py-3 font-semibold text-right">Saldo</th>
                          <th className="px-4 py-3 font-semibold text-right">Vencido</th>
                          <th className="px-4 py-3 font-semibold text-center">Cant</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        <tr className="hover:bg-zinc-50">
                          <td className="px-4 py-3">Joyería El Diamante</td>
                          <td className="px-4 py-3">15/03/2024</td>
                          <td className="px-4 py-3">Bogotá</td>
                          <td className="px-4 py-3">Juan Perez</td>
                          <td className="px-4 py-3 text-right">$5,000,000</td>
                          <td className="px-4 py-3 text-right text-red-600">$2,000,000</td>
                          <td className="px-4 py-3 text-center">3</td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                          <td className="px-4 py-3">Distribuidora Oro Fino</td>
                          <td className="px-4 py-3">01/04/2024</td>
                          <td className="px-4 py-3">Medellín</td>
                          <td className="px-4 py-3">Maria Lopez</td>
                          <td className="px-4 py-3 text-right">$8,200,000</td>
                          <td className="px-4 py-3 text-right text-red-600">$5,200,000</td>
                          <td className="px-4 py-3 text-center">5</td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                          <td className="px-4 py-3">Accesorios La Perla</td>
                          <td className="px-4 py-3">10/04/2024</td>
                          <td className="px-4 py-3">Cali</td>
                          <td className="px-4 py-3">Carlos Gomez</td>
                          <td className="px-4 py-3 text-right">$2,800,000</td>
                          <td className="px-4 py-3 text-right">$0</td>
                          <td className="px-4 py-3 text-center">2</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="bg-[#fcf8f2] border-t border-[#f0e6d2] font-semibold">
                          <td colSpan={6} className="px-4 py-2 text-right">TOTAL CLIENTES</td>
                          <td className="px-4 py-2 text-center">3</td>
                        </tr>
                        <tr className="bg-[#fcf8f2] border-t border-[#f0e6d2] font-semibold">
                          <td colSpan={6} className="px-4 py-2 text-right">TOTAL DOCUMENTOS</td>
                          <td className="px-4 py-2 text-center">10</td>
                        </tr>
                        <tr className="bg-[#fcf8f2] border-t border-[#f0e6d2] font-bold text-lg">
                          <td colSpan={4} className="px-4 py-3 text-right">TOTAL SALDO</td>
                          <td className="px-4 py-3 text-right text-blue-800">$16,000,000</td>
                          <td colSpan={2}></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "Históricos" && (
            <div className="space-y-6">
              {/* Panel de Filtros Históricos */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200">
                <h2 className="text-xl font-bold text-[#472825] mb-4">Consulta de Históricos</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Desde</label>
                    <input type="date" className="w-full border rounded p-2 text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Hasta</label>
                    <input type="date" className="w-full border rounded p-2 text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Anulado</label>
                    <select className="w-full border rounded p-2 text-sm bg-white">
                      <option>NO</option>
                      <option>SI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Estado</label>
                    <select className="w-full border rounded p-2 text-sm bg-white">
                      <option>TODOS</option>
                      <option>CORRECTO</option>
                      <option>DESCUADRADO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Tipo Documento</label>
                    <select className="w-full border rounded p-2 text-sm bg-white">
                      <option>TODOS</option>
                      <option>AJT</option>
                      <option>CC</option>
                      <option>FC</option>
                      <option>RC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Concepto</label>
                    <select className="w-full border rounded p-2 text-sm bg-white">
                      <option>CUENTAS X COBRAR</option>
                      <option>TODOS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Tercero</label>
                    <div className="relative">
                      <input type="text" placeholder="Buscar tercero..." className="w-full border rounded p-2 text-sm bg-white pr-8" />
                      <Search className="absolute right-2 top-2 text-zinc-400" size={16} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Sucursal</label>
                    <select className="w-full border rounded p-2 text-sm bg-white">
                      <option>PRINCIPAL</option>
                      <option>TODAS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Cruce Tipo</label>
                    <input type="text" placeholder="Ej. FC" className="w-full border rounded p-2 text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Cruce Numero</label>
                    <input type="text" placeholder="Ej. 1234" className="w-full border rounded p-2 text-sm bg-white" />
                  </div>
                  <div className="md:col-span-2 flex items-end justify-end">
                    <button
                      onClick={handleSearchHistoricos}
                      disabled={isSearching}
                      className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                    >
                      {isSearching ? (
                        <>
                          <RefreshCw className="animate-spin" size={18} />
                          Buscando...
                        </>
                      ) : (
                        <>
                          <Search size={18} />
                          Buscar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Resultados Históricos */}
              {showHistoricosData && (
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Cuenta</th>
                          <th className="px-4 py-3 font-semibold">Tercero</th>
                          <th className="px-4 py-3 font-semibold">Sucursal</th>
                          <th className="px-4 py-3 font-semibold">Documento</th>
                          <th className="px-4 py-3 font-semibold">Fecha</th>
                          <th className="px-4 py-3 font-semibold">Cruce</th>
                          <th className="px-4 py-3 font-semibold">Observacion</th>
                          <th className="px-4 py-3 font-semibold text-right">Debito</th>
                          <th className="px-4 py-3 font-semibold text-right">Credito</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        <tr className="hover:bg-zinc-50">
                          <td className="px-4 py-3">130505</td>
                          <td className="px-4 py-3">Joyería El Diamante</td>
                          <td className="px-4 py-3">PRINCIPAL</td>
                          <td className="px-4 py-3">FC-1002</td>
                          <td className="px-4 py-3">15/03/2024</td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3">Factura de venta</td>
                          <td className="px-4 py-3 text-right text-blue-700">$5,000,000</td>
                          <td className="px-4 py-3 text-right">$0</td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                          <td className="px-4 py-3">130505</td>
                          <td className="px-4 py-3">Joyería El Diamante</td>
                          <td className="px-4 py-3">PRINCIPAL</td>
                          <td className="px-4 py-3">RC-502</td>
                          <td className="px-4 py-3">16/03/2024</td>
                          <td className="px-4 py-3">FC-1002</td>
                          <td className="px-4 py-3">Abono factura</td>
                          <td className="px-4 py-3 text-right">$0</td>
                          <td className="px-4 py-3 text-right text-blue-700">$2,000,000</td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                          <td className="px-4 py-3">130505</td>
                          <td className="px-4 py-3">Distribuidora Oro Fino</td>
                          <td className="px-4 py-3">PRINCIPAL</td>
                          <td className="px-4 py-3">FC-1005</td>
                          <td className="px-4 py-3">20/03/2024</td>
                          <td className="px-4 py-3"></td>
                          <td className="px-4 py-3">Factura de venta</td>
                          <td className="px-4 py-3 text-right text-blue-700">$3,500,000</td>
                          <td className="px-4 py-3 text-right">$0</td>
                        </tr>
                        <tr className="hover:bg-zinc-50">
                          <td className="px-4 py-3">130505</td>
                          <td className="px-4 py-3">Distribuidora Oro Fino</td>
                          <td className="px-4 py-3">PRINCIPAL</td>
                          <td className="px-4 py-3">RC-509</td>
                          <td className="px-4 py-3">25/03/2024</td>
                          <td className="px-4 py-3">FC-1005</td>
                          <td className="px-4 py-3">Pago total</td>
                          <td className="px-4 py-3 text-right">$0</td>
                          <td className="px-4 py-3 text-right text-blue-700">$6,500,000</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="bg-zinc-100 border-t-2 border-zinc-300 font-bold">
                          <td colSpan={7} className="px-4 py-3 text-right">TOTALES</td>
                          <td className="px-4 py-3 text-right">$8,500,000</td>
                          <td className="px-4 py-3 text-right">$8,500,000</td>
                        </tr>
                        <tr className="bg-zinc-200 border-t border-zinc-300 font-bold">
                          <td colSpan={7} className="px-4 py-3 text-right">DIFERENCIA</td>
                          <td colSpan={2} className="px-4 py-3 text-center text-green-700">$0</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {(activeTab === "Estado de Cuenta" || activeTab === "Cartera Reporte") && (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-zinc-200 text-center">
              <h2 className="text-2xl font-bold text-zinc-400 mb-2">Módulo en construcción</h2>
              <p className="text-zinc-500">
                Los filtros específicos se agregarán en la siguiente fase.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

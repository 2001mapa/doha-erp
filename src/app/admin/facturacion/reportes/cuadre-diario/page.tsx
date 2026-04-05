"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, FileText, CheckCircle2 } from "lucide-react";

export default function CuadreDiarioPage() {
  // State for Row 1
  const [documento, setDocumento] = useState("SELECCIONE...");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [tamano, setTamano] = useState("POS");
  const [nit, setNit] = useState("EMPRESA");

  // State for Row 2 (Checkboxes)
  const [agruparFacturas, setAgruparFacturas] = useState(false);
  const [agruparCanales, setAgruparCanales] = useState(false);
  const [mostrarCantidades, setMostrarCantidades] = useState(false);
  const [mostrarSoloValores, setMostrarSoloValores] = useState(false);
  const [mostrarFecha, setMostrarFecha] = useState(false);
  const [ocultarValorBase, setOcultarValorBase] = useState(false);
  const [mostrarItems, setMostrarItems] = useState(false);
  const [mostrarCantidadLineas, setMostrarCantidadLineas] = useState(false);
  const [mostrarDescAlterna, setMostrarDescAlterna] = useState(false);
  const [mostrarImpuestosLineas, setMostrarImpuestosLineas] = useState(false);

  // State for generating action
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerar = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setShowResults(false);

    // Simulate 1.5s delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#472825] flex items-center gap-3">
          <FileText className="text-[#D3AB80]" size={28} />
          Reportes Diarios / Cuadre
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-[#D3AB80]/20 p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#472825] mb-4 border-b border-gray-100 pb-2">
          Configuración del Reporte
        </h2>

        {/* Fila 1: Filtros Principales */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Documento</label>
            <select
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent text-sm bg-white"
            >
              <option value="SELECCIONE...">SELECCIONE...</option>
              <option value="REM1 - REMISION">REM1 - REMISION</option>
              <option value="DV - DEVOLUCION EN VENTA">DV - DEVOLUCION EN VENTA</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Desde</label>
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Hasta</label>
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Tamaño</label>
            <select
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent text-sm bg-white"
            >
              <option value="POS">POS</option>
              <option value="CARTA">CARTA</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Nit</label>
            <select
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent text-sm bg-white"
            >
              <option value="EMPRESA">EMPRESA</option>
              <option value="SUCURSAL">SUCURSAL</option>
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button
              onClick={handleGenerar}
              disabled={isGenerating}
              className="h-[38px] flex items-center justify-center bg-[#D3AB80] hover:bg-[#D3AB80]/90 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Generando...
                </>
              ) : (
                "Generar"
              )}
            </button>
          </div>
        </div>

        {/* Fila 2: Opciones de Visualización */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          {/* Columna 1 */}
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={agruparFacturas}
                onChange={(e) => setAgruparFacturas(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Agrupar Facturas</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={agruparCanales}
                onChange={(e) => setAgruparCanales(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Agrupar Canales de venta</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={mostrarCantidades}
                onChange={(e) => setMostrarCantidades(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Mostrar cantidades e impuestos</span>
            </label>
          </div>

          {/* Columna 2 */}
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={mostrarSoloValores}
                onChange={(e) => setMostrarSoloValores(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Mostrar solo valores</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={mostrarFecha}
                onChange={(e) => setMostrarFecha(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Mostrar Fecha de Expedición</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={ocultarValorBase}
                onChange={(e) => setOcultarValorBase(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Ocultar valor de base en imp 0</span>
            </label>
          </div>

          {/* Columna 3 */}
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={mostrarItems}
                onChange={(e) => setMostrarItems(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Mostrar Items</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={mostrarCantidadLineas}
                onChange={(e) => setMostrarCantidadLineas(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Mostrar Cantidad en Lineas</span>
            </label>
          </div>

          {/* Columna 4 */}
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={mostrarDescAlterna}
                onChange={(e) => setMostrarDescAlterna(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Mostrar Descripcion Alterna</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={mostrarImpuestosLineas}
                onChange={(e) => setMostrarImpuestosLineas(e.target.checked)}
                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#472825]">Mostrar impuestos por lineas</span>
            </label>
          </div>
        </div>
      </div>

      {/* Resultados Simulados */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-[#D3AB80]/20 p-6 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D3AB80] to-[#472825]"></div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#472825] flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={24} />
                Resumen del Día
              </h2>
              <span className="text-sm text-gray-500">
                Generado: {new Date().toLocaleTimeString()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#fdfbf9] p-4 rounded-xl border border-gray-100 flex flex-col justify-center items-center text-center">
                <span className="text-sm text-gray-500 mb-1">Total Ventas</span>
                <span className="text-2xl font-bold text-green-600">$5,400,000</span>
              </div>

              <div className="bg-[#fdfbf9] p-4 rounded-xl border border-gray-100 flex flex-col justify-center items-center text-center">
                <span className="text-sm text-gray-500 mb-1">Total Devoluciones</span>
                <span className="text-2xl font-bold text-red-500">$450,000</span>
              </div>

              <div className="bg-[#fdfbf9] p-4 rounded-xl border border-gray-100 flex flex-col justify-center items-center text-center">
                <span className="text-sm text-gray-500 mb-1">Efectivo</span>
                <span className="text-2xl font-bold text-[#472825]">$2,000,000</span>
              </div>

              <div className="bg-[#fdfbf9] p-4 rounded-xl border border-gray-100 flex flex-col justify-center items-center text-center">
                <span className="text-sm text-gray-500 mb-1">Transferencias</span>
                <span className="text-2xl font-bold text-[#472825]">$3,400,000</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                onClick={() => setShowResults(false)}
              >
                Cerrar Reporte
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

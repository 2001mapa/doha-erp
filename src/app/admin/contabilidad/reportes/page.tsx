"use client";
import { BarChart3, TrendingUp, DollarSign } from "lucide-react";

export default function ReportesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen" style={{ backgroundColor: "#fdfbf9", color: "#472825" }}>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Centro de Reportes</h1>
        <p className="text-sm opacity-80">
          Seleccione el tipo de reporte que desea generar. (Configuración de botones adicionales pendiente por supervisión)
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Reporte de Ventas */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-amber-200 transition-all group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="text-amber-500" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Reporte de Ventas</h3>
          <p className="text-sm text-zinc-500 mb-4">
            Análisis detallado de transacciones y volumen de ventas en un periodo.
          </p>
          <button className="text-amber-600 font-bold text-sm hover:text-amber-700 flex items-center gap-1">
            Generar Reporte &rarr;
          </button>
        </div>

        {/* Card 2: Estado de Resultados */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-amber-200 transition-all group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BarChart3 className="text-amber-500" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Estado de Resultados</h3>
          <p className="text-sm text-zinc-500 mb-4">
            Resumen de ingresos, gastos y beneficios durante un periodo contable.
          </p>
          <button className="text-amber-600 font-bold text-sm hover:text-amber-700 flex items-center gap-1">
            Generar Reporte &rarr;
          </button>
        </div>

        {/* Card 3: Balance General */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-amber-200 transition-all group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <DollarSign className="text-amber-500" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Balance General</h3>
          <p className="text-sm text-zinc-500 mb-4">
            Situación financiera actual, mostrando activos, pasivos y patrimonio.
          </p>
          <button className="text-amber-600 font-bold text-sm hover:text-amber-700 flex items-center gap-1">
            Generar Reporte &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}

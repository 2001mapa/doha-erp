"use client";
import { BookOpen, Files, Scale, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ReportesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full min-h-screen" style={{ backgroundColor: "#fdfbf9", color: "#472825" }}>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">Centro de Reportes Financieros</h1>
        <p className="text-sm opacity-80">
          Seleccione el informe que desea generar
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1: Auxiliar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="text-[#D3AB80]" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Auxiliar</h3>
          <p className="text-sm text-zinc-500 mb-6 flex-grow">
            Detalle de movimientos por cuenta contable específica.
          </p>
          <Link
            href="/admin/contabilidad/reportes/auxiliar"
            className="w-full py-3 rounded-xl font-bold text-white transition-colors text-center block"
            style={{ backgroundColor: "#D3AB80" }}
          >
            Generar Reporte
          </Link>
        </div>

        {/* Card 2: Contabilización de Documentos */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Files className="text-[#D3AB80]" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Contabilización de Documentos</h3>
          <p className="text-sm text-zinc-500 mb-6 flex-grow">
            Resumen de comprobantes y documentos contables generados.
          </p>
          <Link
            href="/admin/contabilidad/reportes/contabilizacion"
            className="w-full py-3 rounded-xl font-bold text-white transition-colors text-center block"
            style={{ backgroundColor: "#D3AB80" }}
          >
            Generar Reporte
          </Link>
        </div>

        {/* Card 3: Balance General */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Scale className="text-[#D3AB80]" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Balance General</h3>
          <p className="text-sm text-zinc-500 mb-6 flex-grow">
            Estado de situación financiera (Activos, Pasivos y Patrimonio).
          </p>
          <button
            onClick={() => alert('Función de generar reporte en desarrollo')}
            className="w-full py-3 rounded-xl font-bold text-white transition-colors"
            style={{ backgroundColor: "#D3AB80" }}
          >
            Generar Reporte
          </button>
        </div>

        {/* Card 4: Estado de Resultados */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="text-[#D3AB80]" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Estado de Resultados</h3>
          <p className="text-sm text-zinc-500 mb-6 flex-grow">
            Informe de ganancias y pérdidas (Ingresos, Costos y Gastos).
          </p>
          <button
            onClick={() => alert('Función de generar reporte en desarrollo')}
            className="w-full py-3 rounded-xl font-bold text-white transition-colors"
            style={{ backgroundColor: "#D3AB80" }}
          >
            Generar Reporte
          </button>
        </div>

      </div>
    </div>
  );
}

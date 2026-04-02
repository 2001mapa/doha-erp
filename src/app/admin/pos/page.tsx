import React from 'react';
import Link from 'next/link';
import { DollarSign, Clock, ShoppingBag, ArrowRight } from 'lucide-react';

export default function POSDashboard() {
  return (
    <div className="min-h-screen bg-[#fdfbf9] p-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Encabezado */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#472825] mb-2">Punto de Venta</h1>
          <p className="text-lg text-[#472825]/70">Bienvenido al centro operativo de ventas</p>
        </div>

        {/* Tarjetas de Resumen (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3AB80]/20 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#D3AB80]/10 flex items-center justify-center">
              <DollarSign className="text-[#D3AB80]" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#472825]/60 mb-1">Ventas del Día</p>
              <p className="text-2xl font-semibold text-[#472825]">$450.000</p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3AB80]/20 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#D3AB80]/10 flex items-center justify-center">
              <Clock className="text-[#D3AB80]" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#472825]/60 mb-1">Remisiones Pendientes</p>
              <p className="text-2xl font-semibold text-[#472825]">3</p>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#D3AB80]/20 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-[#D3AB80]/10 flex items-center justify-center">
              <ShoppingBag className="text-[#D3AB80]" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#472825]/60 mb-1">Última Venta</p>
              <p className="text-2xl font-semibold text-[#472825]">Hace 15 min</p>
            </div>
          </div>
        </div>

        {/* Botón de Acción Principal */}
        <div className="flex justify-center">
          <Link
            href="/admin/pos/remisiones"
            className="group flex items-center gap-3 bg-[#D3AB80] hover:bg-[#c2986c] text-white px-8 py-4 rounded-xl text-lg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Ir a Gestionar Remisiones
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}

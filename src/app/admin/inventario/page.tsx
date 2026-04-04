"use client";

import Link from "next/link";
import { Undo2, CircleDollarSign, ClipboardCheck, Search, FileSpreadsheet, ShoppingCart } from "lucide-react";

export default function InventarioDashboard() {
  return (
    <div className="p-10 w-full h-full text-[#472825] bg-[#fdfbf9]">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-black">Módulo de Inventario</h1>
        <p className="text-gray-500 mt-2 font-medium">
          Seleccione una opción para gestionar el inventario.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
        <Link href="/admin/inventario/compras" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D3AB80] transition-all flex flex-col items-center text-center group">
          <div className="w-16 h-16 rounded-full bg-[#D3AB80]/10 flex items-center justify-center text-[#D3AB80] group-hover:scale-110 transition-transform mb-4">
            <ShoppingCart size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#472825]">Compras</h2>
        </Link>
        <Link href="/admin/inventario/devoluciones" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D3AB80] transition-all flex flex-col items-center text-center group">
          <div className="w-16 h-16 rounded-full bg-[#D3AB80]/10 flex items-center justify-center text-[#D3AB80] group-hover:scale-110 transition-transform mb-4">
            <Undo2 size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#472825]">Devoluciones</h2>
        </Link>
        <Link href="/admin/inventario/costo" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D3AB80] transition-all flex flex-col items-center text-center group">
          <div className="w-16 h-16 rounded-full bg-[#D3AB80]/10 flex items-center justify-center text-[#D3AB80] group-hover:scale-110 transition-transform mb-4">
            <CircleDollarSign size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#472825]">Costo Producto</h2>
        </Link>
        <Link href="/admin/inventario/fisico" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D3AB80] transition-all flex flex-col items-center text-center group">
          <div className="w-16 h-16 rounded-full bg-[#D3AB80]/10 flex items-center justify-center text-[#D3AB80] group-hover:scale-110 transition-transform mb-4">
            <ClipboardCheck size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#472825]">Inventario Físico</h2>
        </Link>
        <Link href="/admin/inventario/unidades" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D3AB80] transition-all flex flex-col items-center text-center group">
          <div className="w-16 h-16 rounded-full bg-[#D3AB80]/10 flex items-center justify-center text-[#D3AB80] group-hover:scale-110 transition-transform mb-4">
            <Search size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#472825]">Consulta Unidades</h2>
        </Link>
        <Link href="/admin/inventario/kardex" className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D3AB80] transition-all flex flex-col items-center text-center group">
          <div className="w-16 h-16 rounded-full bg-[#D3AB80]/10 flex items-center justify-center text-[#D3AB80] group-hover:scale-110 transition-transform mb-4">
            <FileSpreadsheet size={32} />
          </div>
          <h2 className="text-xl font-bold text-[#472825]">Kardex</h2>
        </Link>
      </div>
    </div>
  );
}

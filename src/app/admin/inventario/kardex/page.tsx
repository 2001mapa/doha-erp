"use client";

import { useState } from "react";
import { Search, Info, Loader2 } from "lucide-react";

export default function KardexPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(false);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="bg-[#fdfbf9] min-h-screen text-[#472825] p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#472825]">Kardex de Productos</h1>
      </div>

      {/* Filters Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-zinc-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Codigo</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D3AB80] focus:border-[#D3AB80] text-sm"
              placeholder="Ej. 1001"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Producto Descripcion</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D3AB80] focus:border-[#D3AB80] text-sm"
              placeholder="Ej. Anillo Oro 18k"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Desde</label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D3AB80] focus:border-[#D3AB80] text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Hasta</label>
            <input
              type="date"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D3AB80] focus:border-[#D3AB80] text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold mb-1">Bodega</label>
            <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D3AB80] focus:border-[#D3AB80] text-sm">
              <option>TODAS</option>
              <option>01-BODEGA PRINCIPAL DOHA</option>
              <option>02-BODEGA MEDELLÍN</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Movimiento</label>
            <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D3AB80] focus:border-[#D3AB80] text-sm">
              <option>TODOS</option>
              <option>ENTRADAS</option>
              <option>SALIDAS</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Tipo Documento</label>
            <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D3AB80] focus:border-[#D3AB80] text-sm">
              <option>TODOS</option>
              <option>AJT - AJUSTE DE INVENTARIO</option>
              <option>FC - FACTURA DE COMPRA</option>
              <option>FV - FACTURA DE VENTA</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-[#D3AB80] focus:ring-[#D3AB80]" />
              <span className="text-sm font-semibold">Logistica</span>
            </label>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="flex-1 flex items-center justify-center gap-2 bg-[#D3AB80] text-white px-4 py-2 rounded-md hover:bg-[#c29b70] transition-colors font-semibold disabled:opacity-70"
            >
              {isSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Product Info Strip */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg">Presentacion: Unidad / Paca: 1</span>
        </div>
        <button
          onClick={() => alert("Información detallada del producto: Oro Laminado 18k")}
          className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
          title="Ver información del item"
        >
          <Info size={18} />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-zinc-100 overflow-hidden min-h-[300px]">
        {!hasSearched && !isSearching ? (
          <div className="flex flex-col items-center justify-center h-full py-20 text-zinc-500">
            <p>Ingrese el código o descripción del producto y presione Buscar</p>
          </div>
        ) : isSearching ? (
          <div className="flex flex-col items-center justify-center h-full py-20">
            <Loader2 className="animate-spin text-[#D3AB80] w-8 h-8 mb-4" />
            <p className="text-zinc-500">Buscando movimientos...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-600 font-semibold">
                <tr>
                  <th className="px-6 py-3">Documento</th>
                  <th className="px-6 py-3">Numero</th>
                  <th className="px-6 py-3">Tercero</th>
                  <th className="px-6 py-3">Bodega</th>
                  <th className="px-6 py-3 text-center">Tipo</th>
                  <th className="px-6 py-3 text-right">Cantidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="hover:bg-zinc-50/50">
                  <td className="px-6 py-4">Factura de Compra</td>
                  <td className="px-6 py-4">FC-00123</td>
                  <td className="px-6 py-4">Proveedor Joyas S.A.</td>
                  <td className="px-6 py-4">01-BODEGA PRINCIPAL DOHA</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                      ENTRADA
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-emerald-600">+50</td>
                </tr>
                <tr className="hover:bg-zinc-50/50">
                  <td className="px-6 py-4">Factura de Venta</td>
                  <td className="px-6 py-4">FV-00456</td>
                  <td className="px-6 py-4">Cliente Frecuente</td>
                  <td className="px-6 py-4">01-BODEGA PRINCIPAL DOHA</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                      SALIDA
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">-2</td>
                </tr>
                <tr className="hover:bg-zinc-50/50">
                  <td className="px-6 py-4">Traslado</td>
                  <td className="px-6 py-4">TR-00789</td>
                  <td className="px-6 py-4">Sucursal Medellín</td>
                  <td className="px-6 py-4">01-BODEGA PRINCIPAL DOHA</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
                      SALIDA
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">-10</td>
                </tr>
              </tbody>
              <tfoot className="bg-[#fcf7f2] border-t-2 border-[#D3AB80]">
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-right font-bold text-[#472825]">
                    Saldo Final
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-lg text-[#472825]">38</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

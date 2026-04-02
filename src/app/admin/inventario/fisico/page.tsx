"use client";

import { useState } from "react";
import { Search, ClipboardCheck, Save } from "lucide-react";

type ItemFisico = {
  id: string;
  producto: string;
  bodega: string;
  sistema: number;
  fisico: number;
};

export default function InventarioFisicoPage() {
  const [items, setItems] = useState<ItemFisico[]>([
    {
      id: "1",
      producto: "Anillo de Compromiso Oro 18k",
      bodega: "Principal",
      sistema: 15,
      fisico: 15,
    },
    {
      id: "2",
      producto: "Cadena Oro 18k 50cm",
      bodega: "Principal",
      sistema: 8,
      fisico: 7,
    },
  ]);

  const handleFisicoChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, fisico: numValue } : item
      )
    );
  };

  return (
    <div className="p-8 bg-[#fdfbf9] min-h-screen text-[#472825]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent flex items-center gap-3">
            <ClipboardCheck size={32} className="text-amber-500" />
            Inventario Físico
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Registro y cuadre de inventario físico vs sistema
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold">
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className="p-4 border-b border-zinc-100 flex items-center gap-4 bg-zinc-50/50">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              placeholder="Buscar producto..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
            />
          </div>
          <select className="px-4 py-2 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm">
            <option value="">Todas las Bodegas</option>
            <option value="principal">Principal</option>
            <option value="vitrina">Vitrina</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-100 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Producto</th>
                <th className="px-6 py-4 font-semibold">Bodega</th>
                <th className="px-6 py-4 font-semibold">Cantidad en Sistema</th>
                <th className="px-6 py-4 font-semibold">Cantidad Física</th>
                <th className="px-6 py-4 font-semibold">Diferencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {items.map((item) => {
                const diferencia = item.fisico - item.sistema;
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-zinc-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{item.producto}</td>
                    <td className="px-6 py-4 text-zinc-500">{item.bodega}</td>
                    <td className="px-6 py-4 font-medium text-zinc-600">
                      {item.sistema}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={item.fisico}
                        onChange={(e) =>
                          handleFisicoChange(item.id, e.target.value)
                        }
                        className="w-24 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-center font-medium"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                          diferencia === 0
                            ? "bg-zinc-100 text-zinc-700"
                            : diferencia > 0
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {diferencia > 0 ? "+" : ""}
                        {diferencia}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

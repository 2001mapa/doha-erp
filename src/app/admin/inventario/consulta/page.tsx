"use client";

import { useState } from "react";
import { Search, MapPin, Package } from "lucide-react";

export default function ConsultaUnidadesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <div className="p-8 bg-[#fdfbf9] min-h-screen text-[#472825] flex flex-col items-center pt-24">
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-black bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent mb-4">
          Consulta de Unidades
        </h1>
        <p className="text-zinc-500">
          Encuentra rápidamente la disponibilidad y ubicación de cualquier producto
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <form onSubmit={handleSearch} className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <Search size={28} className="text-amber-500" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por código, nombre o referencia..."
            className="w-full pl-16 pr-6 py-6 bg-white border-2 border-zinc-100 rounded-3xl text-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            Buscar
          </button>
        </form>

        {hasSearched && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tarjeta de resultado simulada */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center shrink-0">
                <Package size={48} className="text-zinc-300" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-3">
                  CÓD: ANI-001
                </div>
                <h2 className="text-2xl font-bold text-[#472825] mb-2">
                  Anillo de Compromiso Oro 18k
                </h2>
                <p className="text-zinc-500 text-sm mb-6">
                  Diamante central 0.5ct, talla 6.5
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 p-4 rounded-2xl flex items-start gap-4">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <MapPin size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-semibold mb-1">
                        Bodega Principal
                      </p>
                      <p className="text-xl font-black text-emerald-600">
                        12 unds
                      </p>
                    </div>
                  </div>
                  <div className="bg-zinc-50 p-4 rounded-2xl flex items-start gap-4">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <MapPin size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-semibold mb-1">
                        Vitrina Centro
                      </p>
                      <p className="text-xl font-black text-emerald-600">
                        3 unds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

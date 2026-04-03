"use client";

import { useState } from "react";
import { Plus, FolderPlus, Download, RefreshCw, Folder, FolderOpen, FileText, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type AccountNode = {
  code: string;
  name: string;
  isAuxiliary?: boolean;
  children?: AccountNode[];
};

const initialData: AccountNode[] = [
  {
    code: "1",
    name: "ACTIVOS",
    children: [
      {
        code: "11",
        name: "ACTIVO CORRIENTE",
        children: [
          {
            code: "1105",
            name: "CAJA",
            children: [
              {
                code: "110505",
                name: "CAJA GENERAL",
                children: [
                  { code: "11050501", name: "CAJA DOHA PRINCIPAL", isAuxiliary: true },
                  { code: "11050502", name: "CAJA MENOR", isAuxiliary: true },
                ],
              },
            ],
          },
          {
            code: "1110",
            name: "BANCOS",
            children: [
              {
                code: "111005",
                name: "BANCOS NACIONALES",
                children: [
                  { code: "11100501", name: "BANCOLOMBIA DOHA", isAuxiliary: true },
                ],
              },
            ],
          },
        ],
      },
      {
        code: "12",
        name: "INVERSIONES",
      },
      {
        code: "13",
        name: "CUENTAS POR COBRAR",
        children: [
          {
            code: "1305",
            name: "CLIENTES",
            children: [
              {
                code: "130505",
                name: "CLIENTES NACIONALES",
              },
            ],
          },
        ],
      },
    ],
  },
];

const TreeNode = ({ node, depth = 0 }: { node: AccountNode; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleToggle}
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
          node.isAuxiliary ? "hover:bg-[#D3AB80]/20" : "hover:bg-zinc-100"
        }`}
        style={{ paddingLeft: `${depth * 1.5 + 1}rem`, color: "#472825" }}
      >
        <div className="flex-shrink-0 text-[#D3AB80]">
          {node.isAuxiliary ? (
            <div title="Auxiliar"><FileText size={18} /></div>
          ) : isOpen ? (
            <div title="Carpeta Abierta"><FolderOpen size={18} /></div>
          ) : (
            <div title="Carpeta Cerrada"><Folder size={18} /></div>
          )}
        </div>
        <span className="font-semibold text-sm w-24 flex-shrink-0">{node.code}</span>
        <span className="text-sm truncate">{node.name}</span>
      </div>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <TreeNode key={child.code} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function PucPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen" style={{ backgroundColor: "#fdfbf9", color: "#472825" }}>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-1">Plan Único de Cuentas (PUC)</h1>
        <p className="text-sm opacity-80">Catálogo de cuentas contables del sistema estructurado.</p>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#D3AB80] to-[#b38e60] text-white font-bold shadow-lg shadow-[#D3AB80]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm"
          >
            <Plus size={18} />
            <span>Nuevo Auxiliar</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-[#D3AB80] text-[#D3AB80] font-bold shadow-sm hover:bg-[#fdfbf9] hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm"
          >
            <FolderPlus size={18} />
            <span>Nueva Cuenta / Subcuenta</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e3a8a] text-[#D3AB80] border border-[#1e3a8a] font-bold hover:bg-[#172554] hover:text-[#e8cdb0] shadow-sm hover:shadow-md transition-all w-full sm:w-auto text-sm"
          >
            <Download size={18} />
            <span>Descargar Excel</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 text-[#D3AB80] border border-zinc-700 font-bold hover:bg-zinc-700 hover:text-[#e8cdb0] shadow-sm hover:shadow-md transition-all w-full sm:w-auto text-sm"
          >
            <RefreshCw size={18} />
            <span>Regenerar</span>
          </button>
        </div>
      </div>

      {/* TREE VIEW CONTROLS */}
      <div className="bg-white rounded-t-2xl border-x border-t border-zinc-100 p-4 flex items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-2 focus:ring-[#D3AB80]/20 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* TREE VIEW CONTENT */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-zinc-100 p-4 min-h-[400px]">
        <div className="w-full flex font-bold text-xs text-zinc-500 uppercase tracking-wider mb-2 px-3 border-b border-zinc-100 pb-2">
          <div className="w-24 ml-8">Código</div>
          <div>Nombre de Cuenta</div>
        </div>

        <div className="flex flex-col py-2">
          {initialData.map((node) => (
            <TreeNode key={node.code} node={node} />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h2 className="text-xl font-bold" style={{ color: "#472825" }}>Nueva Cuenta</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 text-zinc-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Código de Cuenta</label>
                  <input
                    type="text"
                    placeholder="Ej. 110505"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-2 focus:ring-[#D3AB80]/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Nombre de Cuenta</label>
                  <input
                    type="text"
                    placeholder="Ej. Caja General"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-2 focus:ring-[#D3AB80]/20 outline-none transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wide">Nivel / Tipo</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] focus:ring-2 focus:ring-[#D3AB80]/20 outline-none transition-all text-sm appearance-none"
                  >
                    <option value="">Seleccionar nivel...</option>
                    <option value="clase">Clase (1 dígito)</option>
                    <option value="grupo">Grupo (2 dígitos)</option>
                    <option value="cuenta">Cuenta (4 dígitos)</option>
                    <option value="subcuenta">Subcuenta (6 dígitos)</option>
                    <option value="auxiliar">Auxiliar (8 dígitos)</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-zinc-600 hover:bg-zinc-200 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-br from-[#D3AB80] to-[#b38e60] text-white shadow-lg shadow-[#D3AB80]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Guardar Cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

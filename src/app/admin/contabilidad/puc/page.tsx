"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  FolderPlus,
  Download,
  RefreshCw,
  Folder,
  FolderOpen,
  FileText,
  Search,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPUC, createCuentaPUC } from "@/src/actions/puc";

type AccountNode = {
  code: string;
  name: string;
  nivel: string;
  children?: AccountNode[];
};

// COMPONENTE DE NODO (DISEÑO JULES)
const TreeNode = ({
  node,
  depth = 0,
}: {
  node: AccountNode;
  depth?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isAuxiliary = node.nivel === "auxiliar";

  return (
    <div className="w-full">
      <div
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
          isAuxiliary ? "hover:bg-[#D3AB80]/10" : "hover:bg-zinc-100"
        }`}
        style={{ paddingLeft: `${depth * 1.5 + 1}rem`, color: "#472825" }}
      >
        <div className="flex-shrink-0 text-[#D3AB80]">
          {isAuxiliary ? (
            <FileText size={18} />
          ) : isOpen ? (
            <FolderOpen size={18} />
          ) : (
            <Folder size={18} />
          )}
        </div>
        <span className="font-semibold text-sm w-24 flex-shrink-0">
          {node.code}
        </span>
        <span className="text-sm truncate font-medium">{node.name}</span>
      </div>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
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
  const [rawAccounts, setRawAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    nivel: "",
  });

  // CARGAR DATOS REALES
  const fetchData = async () => {
    setIsLoading(true);
    const res = await getPUC();
    if (res.data) setRawAccounts(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // LÓGICA DE CONSTRUCCIÓN DE ÁRBOL (ARQUITECTO)
  const accountTree = useMemo(() => {
    const nodes: Record<string, AccountNode> = {};
    const tree: AccountNode[] = [];

    // Filtrar por búsqueda antes de armar el árbol
    const filtered = rawAccounts.filter(
      (acc) =>
        acc.codigo.includes(searchTerm) ||
        acc.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    filtered.forEach((acc) => {
      nodes[acc.codigo] = {
        code: acc.codigo,
        name: acc.nombre,
        nivel: acc.nivel,
        children: [],
      };
    });

    filtered.forEach((acc) => {
      const parentCode =
        acc.codigo.length <= 1
          ? null
          : acc.codigo.length === 2
            ? acc.codigo[0]
            : acc.codigo.length === 4
              ? acc.codigo.substring(0, 2)
              : acc.codigo.length === 6
                ? acc.codigo.substring(0, 4)
                : acc.codigo.substring(0, 6);

      if (parentCode && nodes[parentCode]) {
        nodes[parentCode].children?.push(nodes[acc.codigo]);
      } else if (!parentCode || !nodes[parentCode]) {
        tree.push(nodes[acc.codigo]);
      }
    });

    return tree;
  }, [rawAccounts, searchTerm]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await createCuentaPUC(formData);
    if (!res.error) {
      await fetchData();
      setIsModalOpen(false);
      setFormData({ codigo: "", nombre: "", nivel: "" });
    } else {
      alert(res.error);
    }
    setIsSaving(false);
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-black text-[#472825]">
        Sincronizando PUC DOHA...
      </div>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen bg-[#fdfbf9] text-[#472825]">
      {/* HEADER */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-1">
            Plan Único de Cuentas (PUC)
          </h1>
          <p className="text-sm opacity-80">
            Catálogo de cuentas contables del sistema estructurado.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e3a8a] text-[#D3AB80] font-bold text-sm shadow-sm">
            <Download size={18} /> Excel
          </button>
          <button
            onClick={fetchData}
            className="p-2.5 bg-zinc-800 text-[#D3AB80] rounded-xl shadow-sm"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-zinc-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setFormData({ ...formData, nivel: "auxiliar" });
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#D3AB80] to-[#b38e60] text-white font-bold shadow-lg"
          >
            <Plus size={18} /> Nuevo Auxiliar
          </button>
          <button
            onClick={() => {
              setFormData({ ...formData, nivel: "" });
              setIsModalOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-[#D3AB80] text-[#D3AB80] font-bold"
          >
            <FolderPlus size={18} /> Nueva Cuenta
          </button>
        </div>
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por código o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-zinc-100 bg-zinc-50 focus:bg-white focus:border-[#D3AB80] outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* TREE VIEW CONTENT */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-zinc-100 p-6 min-h-[500px]">
        <div className="w-full flex font-black text-[10px] text-zinc-400 uppercase tracking-widest mb-4 px-3 border-b border-zinc-50 pb-4">
          <div className="w-24 ml-10">Código</div>
          <div>Nombre de Cuenta</div>
        </div>
        <div className="flex flex-col space-y-1">
          {accountTree.length > 0 ? (
            accountTree.map((node) => <TreeNode key={node.code} node={node} />)
          ) : (
            <p className="text-center py-20 text-zinc-400 italic">
              No hay cuentas que coincidan con la búsqueda.
            </p>
          )}
        </div>
      </div>

      {/* MODAL (DISEÑO JULES) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-zinc-100"
            >
              <div className="px-8 py-6 border-b flex items-center justify-between bg-zinc-50/50">
                <h2 className="text-xl font-black">Registrar Nueva Cuenta</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">
                    Código de Cuenta
                  </label>
                  <input
                    required
                    value={formData.codigo}
                    onChange={(e) =>
                      setFormData({ ...formData, codigo: e.target.value })
                    }
                    placeholder="Ej. 110505"
                    className="w-full p-4 bg-zinc-50 border rounded-2xl outline-none focus:border-[#D3AB80] font-bold text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">
                    Nombre de Cuenta
                  </label>
                  <input
                    required
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    placeholder="Ej. Caja General"
                    className="w-full p-4 bg-zinc-50 border rounded-2xl outline-none focus:border-[#D3AB80] font-bold text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">
                    Nivel / Tipo
                  </label>
                  <select
                    required
                    value={formData.nivel}
                    onChange={(e) =>
                      setFormData({ ...formData, nivel: e.target.value })
                    }
                    className="w-full p-4 bg-zinc-50 border rounded-2xl outline-none font-bold text-sm"
                  >
                    <option value="">Seleccionar nivel...</option>
                    <option value="clase">Clase (1 dígito)</option>
                    <option value="grupo">Grupo (2 dígitos)</option>
                    <option value="cuenta">Cuenta (4 dígitos)</option>
                    <option value="subcuenta">Subcuenta (6 dígitos)</option>
                    <option value="auxiliar">Auxiliar (8 dígitos)</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 font-black text-xs uppercase text-zinc-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-[2] py-4 bg-[#D3AB80] text-white rounded-2xl font-black text-xs uppercase shadow-lg shadow-[#D3AB80]/20"
                  >
                    {isSaving ? "Guardando..." : "Guardar Cuenta"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

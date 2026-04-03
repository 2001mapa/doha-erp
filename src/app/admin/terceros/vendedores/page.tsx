"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, X, Percent, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Vendedor = {
  id: string;
  codigo: string;
  descripcion: string;
  tercero: string;
  cVenta: number;
  cRecaudo: number;
  recaudador: boolean;
  atiende: boolean;
  permisos: boolean[];
};

// Mock inicial
const initialVendedores: Vendedor[] = [
  {
    id: "1",
    codigo: "101",
    descripcion: "VENDEDOR PUNTO DE VENTA",
    tercero: "98667545 - MIGUEL RESTREPO",
    cVenta: 0.0,
    cRecaudo: 0.0,
    recaudador: false,
    atiende: false,
    permisos: [false, false, false, false, false],
  },
  {
    id: "2",
    codigo: "106",
    descripcion: "FABER ARISTIZABAL",
    tercero: "79887455 - FABER ARISTIZABAL",
    cVenta: 5.0,
    cRecaudo: 0.0,
    recaudador: false,
    atiende: false,
    permisos: [false, false, false, false, false],
  },
];

const TERCEROS_MOCK = [
  "98667545 - MIGUEL RESTREPO",
  "79887455 - FABER ARISTIZABAL",
  "12345678 - JUAN PEREZ",
  "87654321 - MARIA GOMEZ",
];

export default function VendedoresPage() {
  const [vendedores, setVendedores] = useState<Vendedor[]>(initialVendedores);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<Vendedor>({
    id: "",
    codigo: "",
    descripcion: "",
    tercero: TERCEROS_MOCK[0],
    cVenta: 0,
    cRecaudo: 0,
    recaudador: false,
    atiende: false,
    permisos: [false, false, false, false, false],
  });

  const handleOpenNew = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      codigo: "",
      descripcion: "",
      tercero: TERCEROS_MOCK[0],
      cVenta: 0,
      cRecaudo: 0,
      recaudador: false,
      atiende: false,
      permisos: [false, false, false, false, false],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vendedor: Vendedor) => {
    setIsEditing(true);
    setFormData({
      ...vendedor,
      permisos: vendedor.permisos || [false, false, false, false, false],
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este vendedor?")) {
      setVendedores(vendedores.filter((v) => v.id !== id));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handlePermisoChange = (index: number) => {
    const newPermisos = [...formData.permisos];
    newPermisos[index] = !newPermisos[index];
    setFormData({ ...formData, permisos: newPermisos });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setVendedores(
        vendedores.map((v) => (v.id === formData.id ? { ...formData } : v))
      );
    } else {
      setVendedores([
        ...vendedores,
        {
          ...formData,
          id: Date.now().toString(),
          codigo: Math.floor(Math.random() * 1000).toString(),
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const filteredVendedores = vendedores.filter(
    (v) =>
      v.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.tercero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto w-full bg-[#fdfbf9] min-h-screen text-[#472825]">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#472825]">
            Gestión de Vendedores
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Administra el equipo de ventas y sus comisiones.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-[#D3AB80] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-md shadow-[#D3AB80]/20"
        >
          <Plus size={18} strokeWidth={2.5} />
          Nuevo Vendedor
        </button>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por descripción o tercero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#D3AB80]/50 transition-all text-[#472825]"
          />
        </div>
      </div>

      {/* TABLA DE VENDEDORES */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Tercero
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  C. Venta (%)
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  C. Recaudo (%)
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredVendedores.length > 0 ? (
                filteredVendedores.map((vendedor) => (
                  <tr
                    key={vendedor.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-5 text-sm font-bold text-[#472825]">
                      {vendedor.codigo}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {vendedor.descripcion}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {vendedor.tercero}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {vendedor.cVenta.toFixed(1)}%
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {vendedor.cRecaudo.toFixed(1)}%
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleOpenEdit(vendedor)}
                          className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(vendedor.id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors tooltip"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-gray-500 font-medium"
                  >
                    No se encontraron vendedores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DE CREACIÓN / EDICIÓN --- */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-[100] bg-zinc-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-4xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-black text-[#472825]">
                    {isEditing ? "Editar Vendedor" : "Registrar Vendedor"}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {isEditing
                      ? "Modifica los parámetros comerciales del vendedor."
                      : "Configura los parámetros comerciales para el nuevo vendedor."}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-8 flex-1">
                <form
                  id="vendedor-form"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Fila 1 (Identificación) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Descripción
                      </label>
                      <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Ej. Vendedor Zona Sur"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Tercero
                      </label>
                      <select
                        name="tercero"
                        value={formData.tercero}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                      >
                        {TERCEROS_MOCK.map((t, idx) => (
                          <option key={idx} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Fila 2 (Comisiones y Roles) */}
                  <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                          Comisión en Venta
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            name="cVenta"
                            value={formData.cVenta}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-4 pr-10 text-sm font-medium outline-none transition-all text-[#472825]"
                            placeholder="0.0"
                          />
                          <Percent
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-end pb-3">
                        <label className="flex flex-col items-center gap-2 cursor-pointer group">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            Recaudador
                          </span>
                          <div
                            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                              formData.recaudador
                                ? "bg-[#D3AB80] border-[#D3AB80]"
                                : "bg-white border-gray-300 group-hover:border-[#D3AB80]"
                            }`}
                          >
                            {formData.recaudador && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            name="recaudador"
                            checked={formData.recaudador}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                          Comisión en Recaudo
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            name="cRecaudo"
                            value={formData.cRecaudo}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-4 pr-10 text-sm font-medium outline-none transition-all text-[#472825]"
                            placeholder="0.0"
                          />
                          <Percent
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-end pb-3">
                        <label className="flex flex-col items-center gap-2 cursor-pointer group">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            Atiende
                          </span>
                          <div
                            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                              formData.atiende
                                ? "bg-[#D3AB80] border-[#D3AB80]"
                                : "bg-white border-gray-300 group-hover:border-[#D3AB80]"
                            }`}
                          >
                            {formData.atiende && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            name="atiende"
                            checked={formData.atiende}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Fila 3 (Permisos / Ajustes Específicos) */}
                  <div className="flex items-start gap-8 mt-6">
                    <div className="w-1/3">
                      <h3 className="text-sm font-bold text-[#472825]">
                        Puntos Específicos
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      {formData.permisos.map((checked, index) => (
                        <label
                          key={index}
                          className="flex items-center cursor-pointer group"
                        >
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              checked
                                ? "bg-[#D3AB80] border-[#D3AB80]"
                                : "bg-white border-gray-300 group-hover:border-[#D3AB80]"
                            }`}
                          >
                            {checked && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handlePermisoChange(index)}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              {/* Botones del Modal */}
              <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="vendedor-form"
                  className="bg-[#D3AB80] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-md"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
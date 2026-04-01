"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Scale,
  CheckCircle2,
  XCircle,
  X,
  Hash,
  AlignLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Datos iniciales de prueba
const mockUnidadesIniciales = [
  { id: 1, codigo: "UND", descripcion: "Unidad", estado: "Activo" },
  { id: 2, codigo: "GR", descripcion: "Gramos", estado: "Activo" },
  { id: 3, codigo: "CM", descripcion: "Centímetros", estado: "Activo" },
];

export default function UnidadesPage() {
  const [unidades, setUnidades] = useState(mockUnidadesIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    codigo: "",
    descripcion: "",
    estado: "Activo",
  });

  const handleOpenCreate = () => {
    setFormData({ id: 0, codigo: "", descripcion: "", estado: "Activo" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (unidad: any) => {
    setFormData(unidad);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (
      confirm("¿Estás seguro de que deseas eliminar esta unidad de medida?")
    ) {
      setUnidades(unidades.filter((u) => u.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setUnidades(
        unidades.map((u) =>
          u.id === formData.id
            ? { ...formData, codigo: formData.codigo.toUpperCase() }
            : u,
        ),
      );
    } else {
      const nuevaUnidad = {
        ...formData,
        id: Date.now(),
        codigo: formData.codigo.toUpperCase(),
      };
      setUnidades([...unidades, nuevaUnidad]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const unidadesFiltradas = unidades.filter((u) => {
    const coincideBusqueda =
      u.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideEstado =
      filtroEstado === "Todos" || u.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="p-8 min-h-screen bg-[#fdfbf9]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Panel de Control / Productos /{" "}
              <span className="text-[#D3AB80] font-bold">Unidades</span>
            </p>
            <h1 className="text-3xl font-black text-[#472825]">
              Unidades de Medida
            </h1>
          </div>
          <button
            onClick={handleOpenCreate}
            className="bg-[#472825] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-md flex items-center gap-2 group"
          >
            <Plus
              size={18}
              className="group-hover:rotate-90 transition-transform"
            />
            Nueva Unidad
          </button>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por código o descripción..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#D3AB80] outline-none transition-all text-[#472825]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm font-bold text-[#472825]">Estado:</span>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border border-gray-200 bg-gray-50 text-[#472825] rounded-xl p-2.5 text-sm font-medium focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none"
            >
              <option>Todos</option>
              <option>Activos</option>
              <option>Inactivos</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-1/4">
                    Código
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-2/4">
                    Descripción
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {unidadesFiltradas.length > 0 ? (
                  unidadesFiltradas.map((unidad) => (
                    <tr
                      key={unidad.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#D3AB80]/20 flex items-center justify-center text-[#472825]">
                            <Scale size={18} />
                          </div>
                          <span className="text-sm font-black text-[#472825]">
                            {unidad.codigo}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600">
                          {unidad.descripcion}
                        </span>
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            unidad.estado === "Activo"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {unidad.estado === "Activo" ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          {unidad.estado}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(unidad)}
                            className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(unidad.id)}
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
                      colSpan={4}
                      className="p-8 text-center text-gray-500 font-medium"
                    >
                      No se encontraron unidades de medida.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Creación / Edición */}
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h2 className="text-xl font-black text-[#472825]">
                      {isEditing ? "Editar Unidad" : "Nueva Unidad"}
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Define cómo se medirá el producto.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Código Corto
                    </label>
                    <div className="relative">
                      <Hash
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        required
                        maxLength={5}
                        style={{ textTransform: "uppercase" }}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] uppercase"
                        placeholder="Ej. UND, GR, CM"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Descripción
                    </label>
                    <div className="relative">
                      <AlignLeft
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Ej. Unidades, Gramos..."
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Estado
                    </label>
                    <div className="relative">
                      {formData.estado === "Activo" ? (
                        <CheckCircle2
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500"
                          size={18}
                        />
                      ) : (
                        <XCircle
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                          size={18}
                        />
                      )}
                      <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 mt-2 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-[#472825] transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#472825] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-md"
                    >
                      {isEditing ? "Guardar" : "Crear"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

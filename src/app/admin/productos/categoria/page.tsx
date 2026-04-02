"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Tags,
  X,
  FileSpreadsheet,
  Download,
  Upload,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Datos iniciales de prueba
const mockCategoriasIniciales = [
  { id: 1, codigo: "01", abreviatura: "CAD", descripcion: "CADENAS ORO LAMINADO", tipoVenta: "Joyas y Relojes - Gravado 19%" },
  { id: 2, codigo: "02", abreviatura: "PUL", descripcion: "PULSERAS Y ESCLAVAS", tipoVenta: "Joyas y Relojes - Gravado 19%" },
  { id: 3, codigo: "03", abreviatura: "TOP", descripcion: "TOPOS Y ARETES", tipoVenta: "Joyas y Relojes - Gravado 19%" },
  { id: 4, codigo: "04", abreviatura: "EMP", descripcion: "EMPAQUES Y CAJAS", tipoVenta: "Insumos - Sin IVA" }
];

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState(mockCategoriasIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    codigo: "",
    abreviatura: "",
    descripcion: "",
    tipoVenta: "Joyas y Relojes - Gravado 19%",
  });

  const handleOpenCreate = () => {
    setFormData({ id: 0, codigo: "", abreviatura: "", descripcion: "", tipoVenta: "Joyas y Relojes - Gravado 19%" });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (categoria: typeof formData) => {
    setFormData(categoria);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (
      confirm("¿Estás seguro de que deseas eliminar esta categoría?")
    ) {
      setCategorias(categorias.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setCategorias(
        categorias.map((c) =>
          c.id === formData.id ? formData : c
        )
      );
    } else {
      const nuevaCategoria = {
        ...formData,
        id: Date.now(),
      };
      setCategorias([...categorias, nuevaCategoria]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const categoriasFiltradas = categorias.filter((c) => {
    return c.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-8 min-h-screen bg-[#fdfbf9]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Panel de Control / Productos /{" "}
              <span className="text-[#D3AB80] font-bold">Categorías</span>
            </p>
            <h1 className="text-3xl font-black text-[#472825]">
              Categorías
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
            Nueva Categoría
          </button>
        </div>

        {/* Barra Superior de Herramientas (Header Actions) */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Lado izquierdo: Botón desplegable Excel */}
          <div className="relative group">
            <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-[#472825] px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all">
              <FileSpreadsheet size={18} className="text-green-600" />
              Excel
              <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={() => alert("Función de Excel en desarrollo")}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-[#472825] hover:bg-gray-50 rounded-t-xl"
              >
                <Download size={16} />
                Descargar Excel
              </button>
              <button
                onClick={() => alert("Función de Excel en desarrollo")}
                className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-[#472825] hover:bg-gray-50 rounded-b-xl border-t border-gray-100"
              >
                <Upload size={16} />
                Cargar Excel
              </button>
            </div>
          </div>

          {/* Lado derecho: Búsqueda */}
          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar por descripción..."
              className="w-full sm:w-80 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-l-xl text-sm font-medium focus:bg-white focus:border-[#D3AB80] outline-none transition-all text-[#472825]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-[#D3AB80] text-white px-4 py-2.5 rounded-r-xl hover:bg-[#c29b70] transition-colors flex items-center justify-center">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-1/6">
                    Código
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-1/6">
                    Abreviatura
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-1/3">
                    Descripción
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Tipo de Venta
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categoriasFiltradas.length > 0 ? (
                  categoriasFiltradas.map((categoria) => (
                    <tr
                      key={categoria.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#D3AB80]/20 flex items-center justify-center text-[#472825]">
                            <Tags size={18} />
                          </div>
                          <span className="text-sm font-black text-[#472825]">
                            {categoria.codigo}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600">
                          {categoria.abreviatura}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600">
                          {categoria.descripcion}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {categoria.tipoVenta}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(categoria)}
                            className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(categoria.id)}
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
                      colSpan={5}
                      className="p-8 text-center text-gray-500 font-medium"
                    >
                      No se encontraron categorías.
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
                      {isEditing ? "Editar Categoría" : "Nueva Categoría"}
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Clasifica los productos de tu inventario.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Código */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Código
                    </label>
                    <input
                      type="text"
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      placeholder="Ej. 05"
                    />
                  </div>

                  {/* Abreviatura */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Abreviatura
                    </label>
                    <input
                      type="text"
                      name="abreviatura"
                      value={formData.abreviatura}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      placeholder="Ej. ANI"
                    />
                  </div>

                  {/* Descripción */}
                  <div className="space-y-1.5 md:col-span-2">
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
                      placeholder="Ej. ANILLOS"
                    />
                  </div>

                  {/* Tipo Venta */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Tipo Venta
                    </label>
                    <select
                      name="tipoVenta"
                      value={formData.tipoVenta}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                    >
                      <option value="Joyas y Relojes - Gravado 19%">Joyas y Relojes - Gravado 19%</option>
                      <option value="Insumos - Sin IVA">Insumos - Sin IVA</option>
                      <option value="Bienes Exentos">Bienes Exentos</option>
                    </select>
                  </div>

                  {/* Botones */}
                  <div className="md:col-span-2 pt-6 mt-2 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#D3AB80] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#c29b70] transition-all shadow-md"
                    >
                      {isEditing ? "Guardar" : "Guardar"}
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
"use client";
import { useState } from "react";
import { Plus, Search, Edit, Trash2, X, Phone, Mail, MapPin, Building2, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tercero = {
  id: string;
  nombre: string;
  tipo: "Cliente" | "Proveedor";
  telefono: string;
  correo: string;
  direccion: string;
};

// Mock inicial
const initialTerceros: Tercero[] = [
  {
    id: "1",
    nombre: "Joyería El Diamante S.A.S",
    tipo: "Proveedor",
    telefono: "3001234567",
    correo: "contacto@eldiamante.com",
    direccion: "Centro de Bogotá, Calle 14",
  },
  {
    id: "2",
    nombre: "María Fernanda López",
    tipo: "Cliente",
    telefono: "3159876543",
    correo: "mafe.lopez@email.com",
    direccion: "Norte de Cali, Cra 50",
  },
];

export default function TercerosGeneralPage() {
  const [terceros, setTerceros] = useState<Tercero[]>(initialTerceros);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<Tercero>({
    id: "",
    nombre: "",
    tipo: "Cliente",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const handleOpenNew = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      nombre: "",
      tipo: "Cliente",
      telefono: "",
      correo: "",
      direccion: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tercero: Tercero) => {
    setIsEditing(true);
    setFormData(tercero);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este tercero?")) {
      setTerceros(terceros.filter((t) => t.id !== id));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setTerceros(
        terceros.map((t) => (t.id === formData.id ? { ...formData } : t))
      );
    } else {
      setTerceros([
        ...terceros,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    setIsModalOpen(false);
  };

  const filteredTerceros = terceros.filter((t) =>
    t.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto w-full bg-[#fdfbf9] min-h-screen text-[#472825]">
      {/* HEADER DE LA PÁGINA */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#472825]">
            Gestión de Terceros
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Administra clientes y proveedores del sistema ERP.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-[#D3AB80] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-md shadow-[#D3AB80]/20"
        >
          <Plus size={18} strokeWidth={2.5} />
          Nuevo Tercero
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
            placeholder="Buscar por nombre o razón social..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#D3AB80]/50 transition-all"
          />
        </div>
      </div>

      {/* TABLA DE TERCEROS */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Nombre/Razón Social
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Correo
                </th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTerceros.length > 0 ? (
                filteredTerceros.map((tercero) => (
                  <tr
                    key={tercero.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#D3AB80]/10 group-hover:text-[#D3AB80] transition-colors">
                          <UserCircle size={20} />
                        </div>
                        <span className="text-sm font-bold text-[#472825]">
                          {tercero.nombre}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          tercero.tipo === "Cliente"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}
                      >
                        {tercero.tipo}
                      </span>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {tercero.telefono}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {tercero.correo}
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleOpenEdit(tercero)}
                          className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(tercero.id)}
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
                    No se encontraron terceros.
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-black text-[#472825]">
                    {isEditing ? "Editar Tercero" : "Registrar Tercero"}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {isEditing
                      ? "Modifica los datos del tercero."
                      : "Completa los datos para el nuevo tercero."}
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
                <div className="grid grid-cols-2 gap-4">
                  {/* Nombre / Razón Social - Ocupa 2 columnas */}
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Nombre o Razón Social
                    </label>
                    <div className="relative">
                      <UserCircle
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Ej. Joyería El Diamante S.A.S"
                      />
                    </div>
                  </div>

                  {/* Tipo */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Tipo de Tercero
                    </label>
                    <div className="relative">
                      <Building2
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <select
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                      >
                        <option value="Cliente">Cliente</option>
                        <option value="Proveedor">Proveedor</option>
                      </select>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Ej. 3001234567"
                      />
                    </div>
                  </div>

                  {/* Correo */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Dirección
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Ej. Calle 14 # 10 - 20"
                      />
                    </div>
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
                    className="bg-[#D3AB80] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-md"
                  >
                    {isEditing ? "Guardar Cambios" : "Crear Tercero"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

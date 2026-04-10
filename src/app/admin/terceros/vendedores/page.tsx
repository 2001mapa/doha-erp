"use client";
import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Edit, Trash2, X, Percent, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getVendedores,
  createVendedor,
  updateVendedor,
  deleteVendedor,
} from "@/src/actions/vendedores";
import { getTerceros } from "@/src/actions/terceros"; // Para el selector de terceros real

export default function VendedoresPage() {
  const [vendedores, setVendedores] = useState<any[]>([]);
  const [tercerosList, setTercerosList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    codigo: "",
    descripcion: "",
    tercero_id: "",
    c_venta: 0,
    c_recaudo: 0,
    es_vendedor: false,
    es_recaudador: false,
    es_atiende: false,
    permisos: [false, false, false, false, false],
  });

  const fetchData = async () => {
    setIsLoading(true);
    const [vRes, tRes] = await Promise.all([getVendedores(), getTerceros()]);
    if (vRes.data) setVendedores(vRes.data);
    if (tRes.data) setTercerosList(tRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenNew = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      codigo: "",
      descripcion: "",
      tercero_id: tercerosList[0]?.id || "",
      c_venta: 0,
      c_recaudo: 0,
      es_vendedor: false,
      es_recaudador: false,
      es_atiende: false,
      permisos: [false, false, false, false, false],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: any) => {
    setIsEditing(true);
    setFormData({
      id: v.id,
      codigo: v.codigo,
      descripcion: v.descripcion,
      tercero_id: v.tercero_id,
      c_venta: v.c_venta,
      c_recaudo: v.c_recaudo,
      es_vendedor: v.es_vendedor,
      es_recaudador: v.es_recaudador,
      es_atiende: v.es_atiende,
      permisos: v.permisos || [false, false, false, false, false],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este vendedor?")) {
      await deleteVendedor(id);
      fetchData();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { id, ...payload } = formData;

    if (isEditing) {
      await updateVendedor(id, payload);
    } else {
      await createVendedor(payload);
    }

    await fetchData();
    setIsSaving(false);
    setIsModalOpen(false);
  };

  const filteredVendedores = useMemo(() => {
    return vendedores.filter((v) => {
      const nombreTercero =
        v.terceros?.nombre_completo || v.terceros?.razon_social || "";
      return (
        v.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nombreTercero.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [vendedores, searchTerm]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center font-black text-[#472825]">
        Cargando Vendedores...
      </div>
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
          <Plus size={18} strokeWidth={2.5} /> Nuevo Vendedor
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
              {filteredVendedores.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-5 text-sm font-bold text-[#472825]">
                    {v.codigo}
                  </td>
                  <td className="p-5 text-sm font-medium text-gray-600">
                    {v.descripcion}
                  </td>
                  <td className="p-5 text-sm font-medium text-gray-600">
                    {v.terceros?.nombre_completo || v.terceros?.razon_social}
                  </td>
                  <td className="p-5 text-sm font-medium text-gray-600">
                    {v.c_venta}%
                  </td>
                  <td className="p-5 text-sm font-medium text-gray-600">
                    {v.c_recaudo}%
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleOpenEdit(v)}
                        className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative top-0 left-0 translate-x-0 translate-y-0 w-full max-w-4xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-black text-[#472825]">
                    {isEditing ? "Editar Vendedor" : "Registrar Vendedor"}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    Configura los parámetros comerciales del vendedor.
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1 space-y-1.5">
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
                      />
                    </div>
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
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Tercero
                      </label>
                      <select
                        name="tercero_id"
                        value={formData.tercero_id}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      >
                        {tercerosList.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.numero_identificacion} -{" "}
                            {t.nombre_completo || t.razon_social}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
                      {/* Checkbox Vendedor */}
                      <div className="flex flex-col items-center justify-end pb-3">
                        <label className="flex flex-col items-center gap-2 cursor-pointer group">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            Vendedor
                          </span>
                          <div
                            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${formData.es_vendedor ? "bg-[#D3AB80] border-[#D3AB80]" : "bg-white border-gray-300"}`}
                          >
                            {formData.es_vendedor && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            name="es_vendedor"
                            checked={formData.es_vendedor}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                          Comisión Venta
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            name="c_venta"
                            value={formData.c_venta}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-medium outline-none"
                          />
                          <Percent
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                        </div>
                      </div>

                      {/* Checkbox Recaudador */}
                      <div className="flex flex-col items-center justify-end pb-3">
                        <label className="flex flex-col items-center gap-2 cursor-pointer group">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            Recaudador
                          </span>
                          <div
                            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${formData.es_recaudador ? "bg-[#D3AB80] border-[#D3AB80]" : "bg-white border-gray-300"}`}
                          >
                            {formData.es_recaudador && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            name="es_recaudador"
                            checked={formData.es_recaudador}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                          Comisión Recaudo
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            name="c_recaudo"
                            value={formData.c_recaudo}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-medium outline-none"
                          />
                          <Percent
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                          />
                        </div>
                      </div>

                      {/* Checkbox Atiende */}
                      <div className="flex flex-col items-center justify-end pb-3">
                        <label className="flex flex-col items-center gap-2 cursor-pointer group">
                          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                            Atiende
                          </span>
                          <div
                            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${formData.es_atiende ? "bg-[#D3AB80] border-[#D3AB80]" : "bg-white border-gray-300"}`}
                          >
                            {formData.es_atiende && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            name="es_atiende"
                            checked={formData.es_atiende}
                            onChange={handleChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-8 mt-6">
                    <div className="w-1/3">
                      <h3 className="text-sm font-bold text-[#472825]">
                        Permisos y Accesos
                      </h3>
                    </div>
                    <div className="flex flex-col gap-4">
                      {[
                        "Activo",
                        "Mi Cartera",
                        "Mis Terceros",
                        "Mis Pedidos",
                        "Usa Documentos Específicos",
                      ].map((label, index) => (
                        <label
                          key={index}
                          className="flex items-center justify-between cursor-pointer group w-64"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {label}
                          </span>
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.permisos[index] ? "bg-[#D3AB80] border-[#D3AB80]" : "bg-white border-gray-300"}`}
                          >
                            {formData.permisos[index] && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <input
                            type="checkbox"
                            checked={formData.permisos[index]}
                            onChange={() => handlePermisoChange(index)}
                            className="hidden"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-8 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="vendedor-form"
                  disabled={isSaving}
                  className="bg-[#D3AB80] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md"
                >
                  {isSaving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

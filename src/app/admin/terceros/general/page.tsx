"use client";
import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Edit, Trash2, X, CheckCircle2, XCircle, User, MapPin, CreditCard, Phone, Mail, Hash, ToggleRight, ToggleLeft, Archive } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTerceros,
  createTercero,
  updateTercero,
} from "@/src/actions/terceros";
import { Country, State, City } from "country-state-city";

export default function TercerosGeneralPage() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [terceros, setTerceros] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("Datos Principales");

  // Geographic Selectors State
  const [selectedCountryCode, setSelectedCountryCode] = useState("CO");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  // Estado del Formulario: Coincide 1:1 con las columnas de tu nueva tabla en Supabase
  const [formData, setFormData] = useState({
    id: "",
    tipo_identificacion: "CC",
    numero_identificacion: "",
    dv: "",
    codigo_interno: "",
    razon_social: "",
    nombre_completo: "",
    es_cliente: false,
    es_empleado: false,
    es_proveedor: false,
    es_prospecto: false,
    vendedor_asignado: "",
    email: "",
    email_novedades: "",
    telefono1: "",
    telefono2: "",
    celular: "",
    pais: "Colombia",
    departamento: "",
    ciudad: "",
    direccion_fiscal: "",
    direccion_despachos: "",
    cumpleanos_dia: "",
    cumpleanos_mes: "",
    cartera: "",
    forma_pago: "",
    nivel_precio: "",
    clasificacion: "",
    aplica_cupo_credito: false,
    observaciones: "",
    estado: "Activo",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const fetchTerceros = async () => {
    setIsLoading(true);
    const res = await getTerceros();
    if (res.data) {
      setTerceros(res.data);
    }
    if (res.error) {
      console.error("Error en Supabase:", res.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTerceros();
  }, []);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleOpenNew = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      tipo_identificacion: "CC",
      numero_identificacion: "",
      dv: "",
      codigo_interno: "",
      razon_social: "",
      nombre_completo: "",
      es_cliente: false,
      es_empleado: false,
      es_proveedor: false,
      es_prospecto: false,
      vendedor_asignado: "",
      email: "",
      email_novedades: "",
      telefono1: "",
      telefono2: "",
      celular: "",
      pais: "Colombia",
      departamento: "",
      ciudad: "",
      direccion_fiscal: "",
      direccion_despachos: "",
      cumpleanos_dia: "",
      cumpleanos_mes: "",
      cartera: "",
      forma_pago: "",
      nivel_precio: "",
      clasificacion: "",
      aplica_cupo_credito: false,
      observaciones: "",
      estado: "Activo",
    });
    setActiveTab("Datos Principales");
    setIsModalOpen(true);
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenEdit = (t: any) => {
    setIsEditing(true);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { id, ...payload } = formData;

    const finalPayload = {
      ...payload,
      cumpleanos_dia: payload.cumpleanos_dia
        ? parseInt(payload.cumpleanos_dia.toString())
        : null,
      cumpleanos_mes: payload.cumpleanos_mes
        ? parseInt(payload.cumpleanos_mes.toString())
        : null,
    };

    try {
      const res = isEditing
        ? await updateTercero(id, finalPayload)
        : await createTercero(finalPayload);
      if (res.error) throw new Error(res.error);
      await fetchTerceros();
      setIsModalOpen(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTerceros = useMemo(() => {
    return terceros.filter((t) =>
      (t.numero_identificacion || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.nombre_completo || t.razon_social || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [terceros, searchTerm]);

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfbf9]">
        <div className="w-12 h-12 border-4 border-[#D3AB80] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black text-[#472825]">
          Sincronizando con la Bóveda de Terceros...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fdfbf9] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#472825] tracking-tight">
              Gestión de Terceros
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Panel de Control / Terceros / General
            </p>
          </div>
          <button
            onClick={handleOpenNew}
            className="group flex items-center gap-2 bg-[#D3AB80] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-lg hover:-translate-y-0.5"
          >
            <Plus size={18} /> Nuevo Tercero
          </button>
        </div>

        {/* Search Input */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por identificación o nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Identificación
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Tercero
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">
                    Estado
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTerceros.length > 0 ? (
                  filteredTerceros.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5 font-black text-[#472825] text-sm">
                        {t.numero_identificacion} <span className="text-gray-400 text-xs ml-1">{t.dv}</span>
                      </td>
                      <td className="p-5">
                        <div className="font-bold text-sm text-[#472825]">
                          {t.nombre_completo || t.razon_social}
                        </div>
                        <div className="text-xs text-gray-400">{t.email}</div>
                      </td>
                      <td className="p-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${t.estado === "Activo" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                        >
                          {t.estado === "Activo" ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          {t.estado}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(t)}
                            className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors">
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
                      No se encontraron registros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal (The DOHA Experience) */}
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                  <div>
                    <h2 className="text-xl font-black text-[#472825]">
                      {isEditing ? "Editar" : "Registrar"} Tercero
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Complete la información del aliado.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex px-8 border-b border-gray-100 bg-white shrink-0 overflow-x-auto gap-8">
                  {["Datos Principales", "Ubicación", "Comercial", "Otros"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === tab ? "border-[#D3AB80] text-[#D3AB80]" : "border-transparent text-gray-400"}`}
                      >
                        {tab}
                      </button>
                    ),
                  )}
                </div>

                <div className="overflow-y-auto flex-1 p-8 bg-white">
                  <form
                    id="terceroForm"
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                  >
                    {activeTab === "Datos Principales" && (
                      <>
                        <div className="col-span-2 mb-2 border-b pb-2 flex items-center gap-2 text-[#472825] font-bold text-sm">
                          <Archive size={16} /> Información Principal
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Tipo ID
                          </label>
                          <select
                            name="tipo_identificacion"
                            value={formData.tipo_identificacion}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm outline-none"
                          >
                            <option value="CC">CC</option>
                            <option value="NIT">NIT</option>
                            <option value="CE">CE</option>
                            <option value="PASAPORTE">PASAPORTE</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Número ID
                          </label>
                          <div className="relative">
                            <Hash
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="numero_identificacion"
                              value={formData.numero_identificacion}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            DV
                          </label>
                          <div className="relative">
                            <Hash
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="dv"
                              value={formData.dv}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Código Interno
                          </label>
                          <div className="relative">
                            <Hash
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="codigo_interno"
                              value={formData.codigo_interno}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Razón Social
                          </label>
                          <div className="relative">
                            <User
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="razon_social"
                              value={formData.razon_social}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Nombre Completo
                          </label>
                          <div className="relative">
                            <User
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="nombre_completo"
                              value={formData.nombre_completo}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-4 gap-4 py-4 bg-gray-50 p-4 rounded-2xl border border-dashed">
                          {[
                            "es_cliente",
                            "es_proveedor",
                            "es_empleado",
                            "es_prospecto",
                          ].map((role) => (
                            <label
                              key={role}
                              className="flex items-center gap-2 cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                name={role}
                                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                checked={(formData as any)[role]}
                                onChange={handleChange}
                                className="w-4 h-4 accent-[#D3AB80]"
                              />
                              <span className="text-[10px] font-black uppercase text-gray-500">
                                {role.split("_")[1]}
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    )}

                    {activeTab === "Ubicación" && (
                      <>
                        <div className="col-span-2 mb-2 border-b pb-2 flex items-center gap-2 text-[#D3AB80] font-bold text-sm">
                          <MapPin size={16} /> Contacto y Ubicación
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            País
                          </label>
                          <select
                            value={selectedCountryCode}
                            onChange={(e) =>
                              setSelectedCountryCode(e.target.value)
                            }
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm"
                          >
                            <option value="CO">Colombia</option>
                            {Country.getAllCountries().map((c) => (
                              <option key={c.isoCode} value={c.isoCode}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Departamento
                          </label>
                          <select
                            value={selectedStateCode}
                            onChange={(e) =>
                              setSelectedStateCode(e.target.value)
                            }
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm"
                          >
                            <option value="">Seleccionar...</option>
                            {State.getStatesOfCountry(
                              selectedCountryCode,
                            ).map((s) => (
                              <option key={s.isoCode} value={s.isoCode}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Ciudad
                          </label>
                          <select
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm"
                          >
                            <option value="">Seleccionar...</option>
                            {City.getCitiesOfState(
                              selectedCountryCode,
                              selectedStateCode,
                            ).map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Dirección Fiscal
                          </label>
                          <div className="relative">
                            <MapPin
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="direccion_fiscal"
                              value={formData.direccion_fiscal}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Email
                          </label>
                          <div className="relative">
                            <Mail
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Celular
                          </label>
                          <div className="relative">
                            <Phone
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <input
                              name="celular"
                              value={formData.celular}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Vendedor Asignado
                          </label>
                          <div className="relative">
                            <User
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                              size={16}
                            />
                            <select
                              name="vendedor_asignado"
                              value={formData.vendedor_asignado}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                            >
                              <option value="">Vendedor Asignado...</option>
                              <option value="V1">Vendedor 1</option>
                              <option value="V2">Vendedor 2</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === "Comercial" && (
                      <>
                        <div className="col-span-2 mb-2 border-b pb-2 flex items-center gap-2 text-[#D3AB80] font-bold text-sm">
                          <CreditCard size={16} /> Comercial
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Forma de Pago
                          </label>
                          <select
                            name="forma_pago"
                            value={formData.forma_pago}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Contado">Contado</option>
                            <option value="Credito">Crédito</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Nivel de Precio
                          </label>
                          <select
                            name="nivel_precio"
                            value={formData.nivel_precio}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Detal">Detal</option>
                            <option value="Mayorista">Mayorista</option>
                            <option value="Distribuidor">Distribuidor</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1">
                            Cartera
                          </label>
                          <input
                            name="cartera"
                            value={formData.cartera}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm"
                          />
                        </div>
                        <div
                          className="col-span-2 flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              aplica_cupo_credito:
                                !formData.aplica_cupo_credito,
                            })
                          }
                        >
                          {formData.aplica_cupo_credito ? (
                            <ToggleRight className="text-[#D3AB80]" size={28} />
                          ) : (
                            <ToggleLeft className="text-gray-300" size={28} />
                          )}
                          <span className="text-xs font-bold text-[#472825]">
                            Aplica Cupo Crédito
                          </span>
                        </div>
                      </>
                    )}

                    {activeTab === "Otros" && (
                      <div className="col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                          Notas Internas
                        </label>
                        <textarea
                          name="observaciones"
                          value={formData.observaciones}
                          onChange={handleChange}
                          rows={5}
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-medium text-sm outline-none"
                          placeholder="Escribe aquí..."
                        ></textarea>
                      </div>
                    )}
                  </form>
                </div>

                <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 shrink-0">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-[#472825]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    form="terceroForm"
                    disabled={isSaving}
                    className="bg-[#472825] text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-black transition-all"
                  >
                    {isSaving ? "Guardando..." : "Guardar Tercero"}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  CheckCircle2,
  XCircle,
  User,
  MapPin,
  CreditCard,
  ClipboardList,
  Globe,
  Phone,
  Mail,
  Hash,
  AlignLeft,
  Tag,
  ToggleRight,
  ToggleLeft,
  Archive,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTerceros,
  createTercero,
  updateTercero,
} from "@/src/actions/terceros";
import { Country, State, City } from "country-state-city";

export default function TercerosGeneralPage() {
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

  // Filtros
  const [filterCodigo, setFilterCodigo] = useState("");
  const [filterDescripcion, setFilterDescripcion] = useState("");
  const [filterActivo, setFilterActivo] = useState("Todos");
  const [filterCliente, setFilterCliente] = useState("Todos");

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
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTerceros = useMemo(() => {
    return terceros.filter((t) => {
      const matchId = (t.numero_identificacion || "")
        .toLowerCase()
        .includes(filterCodigo.toLowerCase());
      const matchNombre = (t.nombre_completo || t.razon_social || "")
        .toLowerCase()
        .includes(filterDescripcion.toLowerCase());
      return matchId && matchNombre;
    });
  }, [terceros, filterCodigo, filterDescripcion]);

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
    <div className="p-8 max-w-[1600px] mx-auto w-full bg-[#fdfbf9] min-h-screen text-[#472825]">
      {/* HEADER IGUAL AL DE TU IMAGEN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-[#472825]">
            Gestión de Terceros
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Administra clientes, proveedores, empleados y prospectos de DOHA
            18K.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="bg-[#D3AB80] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-[#D3AB80]/30 hover:bg-[#b8946d] transition-all flex items-center gap-2"
        >
          <Plus size={20} strokeWidth={3} /> Nuevo Tercero
        </button>
      </div>

      {/* BARRA DE FILTROS PROFESIONAL */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
            Código
          </label>
          <input
            value={filterCodigo}
            onChange={(e) => setFilterCodigo(e.target.value)}
            className="w-full bg-gray-50 border p-3 rounded-xl outline-none focus:border-[#D3AB80] text-sm"
            placeholder="NIT o CC..."
          />
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
            Descripción
          </label>
          <input
            value={filterDescripcion}
            onChange={(e) => setFilterDescripcion(e.target.value)}
            className="w-full bg-gray-50 border p-3 rounded-xl outline-none focus:border-[#D3AB80] text-sm"
            placeholder="Nombre o Razón Social..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
            Activo
          </label>
          <select className="w-full bg-gray-50 border p-3 rounded-xl outline-none text-sm">
            <option>Todos</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
            Cliente
          </label>
          <select className="w-full bg-gray-50 border p-3 rounded-xl outline-none text-sm">
            <option>Todos</option>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <button className="bg-[#1f2937] text-white p-3.5 rounded-xl hover:bg-black transition-colors flex justify-center">
          <Search size={20} />
        </button>
      </div>

      {/* TABLA DE TERCEROS */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="p-6 text-[11px] font-black uppercase text-gray-400">
                NIT/CC
              </th>
              <th className="p-6 text-[11px] font-black uppercase text-gray-400">
                Razón Social / Nombre
              </th>
              <th className="p-6 text-[11px] font-black uppercase text-gray-400">
                Dirección
              </th>
              <th className="p-6 text-[11px] font-black uppercase text-gray-400">
                Teléfonos
              </th>
              <th className="p-6 text-[11px] font-black uppercase text-gray-400 text-center">
                Estado
              </th>
              <th className="p-6 text-[11px] font-black uppercase text-gray-400 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredTerceros.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-gray-50/50 transition-all group"
              >
                <td className="p-6 font-black text-[#472825]">
                  {t.numero_identificacion}{" "}
                  <span className="text-gray-300 text-xs ml-1">{t.dv}</span>
                </td>
                <td className="p-6">
                  <div className="font-bold">
                    {t.nombre_completo || t.razon_social}
                  </div>
                  <div className="text-xs text-gray-400">{t.email}</div>
                </td>
                <td className="p-6 text-sm text-gray-500">
                  {t.direccion_fiscal}
                </td>
                <td className="p-6 text-sm font-bold text-gray-600">
                  {t.celular || t.telefono1}
                </td>
                <td className="p-6 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black ${t.estado === "Activo" ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600"}`}
                  >
                    {t.estado?.toUpperCase()}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-all"
                    >
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-300 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL GIGANTE - EXACTO A TUS IMÁGENES */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#472825]/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative bg-[#fdfbf9] w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] shadow-2xl border border-white flex flex-col overflow-hidden"
            >
              {/* HEADER MODAL */}
              <div className="p-8 bg-white border-b flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-[#472825]">
                    {isEditing ? "Editar" : "Registrar"} Tercero
                  </h2>
                  <p className="text-gray-400 font-medium">
                    Completa los datos técnicos del nuevo aliado comercial.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* TABS CON ESTILO */}
              <div className="flex px-8 bg-white border-b gap-8">
                {["Datos Principales", "Sucursales", "Comercial", "Otros"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-black transition-all border-b-4 ${activeTab === tab ? "border-[#D3AB80] text-[#D3AB80]" : "border-transparent text-gray-300"}`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>

              {/* CONTENIDO DEL FORMULARIO */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <form
                  id="terceroForm"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {activeTab === "Datos Principales" && (
                    <>
                      {/* INFORMACIÓN PRINCIPAL */}
                      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 text-[#D3AB80] mb-2">
                          <User size={20} />
                          <h3 className="font-black text-sm uppercase tracking-tighter">
                            Información Principal
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Tipo Identificación
                            </label>
                            <select
                              name="tipo_identificacion"
                              value={formData.tipo_identificacion}
                              onChange={handleChange}
                              className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#D3AB80] font-bold text-sm"
                            >
                              <option value="CC">CC - Cédula</option>
                              <option value="NIT">NIT - Impuestos</option>
                              <option value="CE">Cédula Extranjería</option>
                              <option value="PASAPORTE">Pasaporte</option>
                            </select>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Número Identificación
                            </label>
                            <div className="flex gap-2">
                              <input
                                name="numero_identificacion"
                                value={formData.numero_identificacion}
                                onChange={handleChange}
                                className="flex-1 p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#D3AB80] font-bold"
                                placeholder="Ej. 900123456"
                              />
                              <button
                                type="button"
                                className="bg-[#1f2937] text-white p-4 rounded-xl"
                              >
                                <Search size={20} />
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="w-1/3 space-y-2">
                              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                                DV
                              </label>
                              <input
                                name="dv"
                                value={formData.dv}
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-50 border rounded-2xl text-center font-bold"
                              />
                            </div>
                            <div className="w-2/3 space-y-2">
                              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                                Código
                              </label>
                              <input
                                name="codigo_interno"
                                value={formData.codigo_interno}
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Razón Social
                            </label>
                            <input
                              name="razon_social"
                              value={formData.razon_social}
                              onChange={handleChange}
                              className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#D3AB80] font-bold"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Nombre Completo
                            </label>
                            <input
                              name="nombre_completo"
                              value={formData.nombre_completo}
                              onChange={handleChange}
                              className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-[#D3AB80] font-bold"
                            />
                          </div>
                          <div className="md:col-span-4 flex flex-wrap gap-8 pt-4">
                            {[
                              "es_cliente",
                              "es_empleado",
                              "es_proveedor",
                              "es_prospecto",
                            ].map((role) => (
                              <label
                                key={role}
                                className="flex items-center gap-3 cursor-pointer group"
                              >
                                <input
                                  type="checkbox"
                                  name={role}
                                  checked={(formData as any)[role]}
                                  onChange={handleChange}
                                  className="w-6 h-6 accent-[#D3AB80] rounded-lg"
                                />
                                <span className="text-sm font-black text-[#472825] uppercase tracking-tighter opacity-70 group-hover:opacity-100">
                                  {role.split("_")[1]}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CONTACTO Y UBICACIÓN */}
                      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 text-[#D3AB80] mb-2">
                          <MapPin size={20} />
                          <h3 className="font-black text-sm uppercase tracking-tighter">
                            Contacto y Ubicación
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              País
                            </label>
                            <select
                              value={selectedCountryCode}
                              onChange={(e) =>
                                setSelectedCountryCode(e.target.value)
                              }
                              className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                            >
                              {Country.getAllCountries().map((c) => (
                                <option key={c.isoCode} value={c.isoCode}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Departamento
                            </label>
                            <select
                              value={selectedStateCode}
                              onChange={(e) =>
                                setSelectedStateCode(e.target.value)
                              }
                              className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
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
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Ciudad
                            </label>
                            <select
                              name="ciudad"
                              value={formData.ciudad}
                              onChange={handleChange}
                              className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
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
                          <div className="md:col-span-3 space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Dirección Fiscal
                            </label>
                            <input
                              name="direccion_fiscal"
                              value={formData.direccion_fiscal}
                              onChange={handleChange}
                              className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Email
                            </label>
                            <input
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Email corporativo"
                              className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Celular
                            </label>
                            <input
                              name="celular"
                              value={formData.celular}
                              onChange={handleChange}
                              placeholder="Celular de contacto"
                              className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                              Vendedor
                            </label>
                            <select
                              name="vendedor_asignado"
                              value={formData.vendedor_asignado}
                              onChange={handleChange}
                              className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                            >
                              <option value="">Vendedor Asignado...</option>
                              <option value="V1">Vendedor 1</option>
                              <option value="V2">Vendedor 2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "Comercial" && (
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 text-[#D3AB80] mb-2">
                        <CreditCard size={20} />
                        <h3 className="font-black text-sm uppercase tracking-tighter">
                          Comercial y Ventas
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                            Forma de Pago
                          </label>
                          <select
                            name="forma_pago"
                            value={formData.forma_pago}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Contado">Contado</option>
                            <option value="Credito">Crédito</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                            Nivel de Precio
                          </label>
                          <select
                            name="nivel_precio"
                            value={formData.nivel_precio}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                          >
                            <option value="">Seleccionar...</option>
                            <option value="Detal">Detal</option>
                            <option value="Mayorista">Mayorista</option>
                            <option value="Distribuidor">Distribuidor</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                            Cartera
                          </label>
                          <input
                            name="cartera"
                            value={formData.cartera}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border rounded-2xl font-bold"
                          />
                        </div>
                        <div className="flex items-center gap-3 pt-6">
                          <input
                            type="checkbox"
                            name="aplica_cupo_credito"
                            checked={formData.aplica_cupo_credito}
                            onChange={handleChange}
                            className="w-6 h-6 accent-[#D3AB80]"
                          />
                          <span className="text-xs font-black uppercase text-gray-500">
                            Aplica Cupo Crédito
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "Otros" && (
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 text-[#D3AB80] mb-2">
                        <ClipboardList size={20} />
                        <h3 className="font-black text-sm uppercase tracking-tighter">
                          Observaciones DOHA 18K
                        </h3>
                      </div>
                      <textarea
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        rows={5}
                        className="w-full p-6 bg-gray-50 border rounded-[2rem] font-bold outline-none focus:border-[#D3AB80]"
                        placeholder="Escribe notas internas aquí..."
                      ></textarea>
                    </div>
                  )}

                  {activeTab === "Sucursales" && (
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm min-h-[300px] flex items-center justify-center">
                      <p className="text-gray-400 font-bold italic">
                        Módulo de Sucursales en mantenimiento...
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* FOOTER DEL MODAL */}
              <div className="p-8 bg-white border-t flex justify-end gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 text-sm font-black text-gray-400 hover:text-[#472825] transition-all"
                >
                  CANCELAR
                </button>
                <button
                  type="submit"
                  form="terceroForm"
                  disabled={isSaving}
                  className="bg-[#472825] text-white px-12 py-4 rounded-2xl font-black text-sm shadow-2xl hover:bg-black transition-all flex items-center gap-2"
                >
                  {isSaving ? "PROCESANDO..." : "GUARDAR TERCERO"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

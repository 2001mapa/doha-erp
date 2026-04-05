"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTerceros, createTercero } from "@/src/actions/terceros";
import { Country, State, City } from "country-state-city";

type Tercero = {
  id: string;
  codigo: string;
  tipoIdentificacion: string;
  nit: string;
  dv: string;
  razonSocial: string;
  nombreCompleto: string;
  roles: {
    cliente: boolean;
    empleado: boolean;
    proveedor: boolean;
    prospecto: boolean;
  };
  vendedor: string;
  correo: string;
  correoNovedades: string;
  telefono1: string;
  telefono2: string;
  celular: string;
  pais: string;
  departamento: string;
  ciudad: string;
  direccionFiscal: string;
  direccionDespachos: string;
  cumpleDia: string;
  cumpleMes: string;
  cartera: string;
  formaPago: string;
  nivelPrecio: string;
  clasificacion: string;
  aplicaCredito: boolean;
  observaciones: string;
  estado: "Activo" | "Inactivo";
  // For backwards compatibility / initial parsing map
  nombre?: string;
  tipo?: "Cliente" | "Proveedor";
  telefono?: string;
  direccion?: string;
};

export default function TercerosGeneralPage() {
  const [terceros, setTerceros] = useState<Tercero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<Tercero>({
    id: "",
    codigo: "",
    tipoIdentificacion: "CC",
    nit: "",
    dv: "",
    razonSocial: "",
    nombreCompleto: "",
    roles: {
      cliente: false,
      empleado: false,
      proveedor: false,
      prospecto: false,
    },
    vendedor: "",
    correo: "",
    correoNovedades: "",
    telefono1: "",
    telefono2: "",
    celular: "",
    pais: "Colombia",
    departamento: "",
    ciudad: "",
    direccionFiscal: "",
    direccionDespachos: "",
    cumpleDia: "",
    cumpleMes: "",
    cartera: "",
    formaPago: "",
    nivelPrecio: "",
    clasificacion: "",
    aplicaCredito: false,
    observaciones: "",
    estado: "Activo",
  });

  const [activeTab, setActiveTab] = useState("Datos Principales");

  // Filters state
  const [filterCodigo, setFilterCodigo] = useState("");
  const [filterDescripcion, setFilterDescripcion] = useState("");
  const [filterActivo, setFilterActivo] = useState("Todos");
  const [filterCliente, setFilterCliente] = useState("Todos");
  const [filterEmpleado, setFilterEmpleado] = useState("Todos");
  const [filterProveedor, setFilterProveedor] = useState("Todos");

  // Geographic Selectors State
  const [selectedCountryCode, setSelectedCountryCode] = useState("CO");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const fetchTerceros = async () => {
    setIsLoading(true);
    try {
      const data = await getTerceros();
      if (data) {
        setTerceros(data);
      }
    } catch (error) {
      console.error("Error fetching terceros:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTerceros();
  }, []);

  const handleOpenNew = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      codigo: "",
      tipoIdentificacion: "CC",
      nit: "",
      dv: "",
      razonSocial: "",
      nombreCompleto: "",
      roles: {
        cliente: false,
        empleado: false,
        proveedor: false,
        prospecto: false,
      },
      vendedor: "",
      correo: "",
      correoNovedades: "",
      telefono1: "",
      telefono2: "",
      celular: "",
      pais: "Colombia",
      departamento: "",
      ciudad: "",
      direccionFiscal: "",
      direccionDespachos: "",
      cumpleDia: "",
      cumpleMes: "",
      cartera: "",
      formaPago: "",
      nivelPrecio: "",
      clasificacion: "",
      aplicaCredito: false,
      observaciones: "",
      estado: "Activo",
    });
    setActiveTab("Datos Principales");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tercero: Tercero) => {
    setIsEditing(true);
    // Para no romper la vista de edición si tercero viene directo de DB:
    setFormData({
      ...tercero,
      id: tercero.id || "",
      codigo: tercero.codigo || "",
      tipoIdentificacion: tercero.tipoIdentificacion || "NIT",
      nit: tercero.nit || "",
      dv: tercero.dv || "",
      razonSocial: tercero.razonSocial || tercero.nombre || "",
      nombreCompleto: tercero.nombreCompleto || tercero.nombre || "",
      roles: tercero.roles || {
        cliente: (tercero.tipo as string) === "cliente" || tercero.tipo === "Cliente",
        empleado: (tercero.tipo as string) === "vendedor",
        proveedor: (tercero.tipo as string) === "proveedor" || tercero.tipo === "Proveedor",
        prospecto: false,
      },
      vendedor: tercero.vendedor || "",
      correo: tercero.correo || "",
      correoNovedades: tercero.correoNovedades || "",
      telefono1: tercero.telefono1 || tercero.telefono || "",
      telefono2: tercero.telefono2 || "",
      celular: tercero.celular || "",
      pais: tercero.pais || "Colombia",
      departamento: tercero.departamento || "",
      ciudad: tercero.ciudad || "",
      direccionFiscal: tercero.direccionFiscal || tercero.direccion || "",
      direccionDespachos: tercero.direccionDespachos || "",
      cumpleDia: tercero.cumpleDia || "",
      cumpleMes: tercero.cumpleMes || "",
      cartera: tercero.cartera || "",
      formaPago: tercero.formaPago || "",
      nivelPrecio: tercero.nivelPrecio || "",
      clasificacion: tercero.clasificacion || "",
      aplicaCredito: tercero.aplicaCredito || false,
      observaciones: tercero.observaciones || "",
      estado: typeof tercero.estado === "boolean" ? (tercero.estado ? "Activo" : "Inactivo") : (tercero.estado || "Activo"),
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (isEditing) {
        setTerceros(
          terceros.map((t) => (t.id === formData.id ? { ...formData } : t))
        );
      } else {
        // Mapeo del payload para Supabase
        const tipoMap = formData.roles.cliente ? "cliente" : formData.roles.proveedor ? "proveedor" : formData.roles.empleado ? "vendedor" : "cliente";

        const payloadSupabase = {
          nit: formData.nit,
          nombre: formData.razonSocial || formData.nombreCompleto || "",
          tipo: tipoMap,
          telefono: formData.telefono1 || "",
          direccion: formData.direccionFiscal || "",
          ciudad: formData.ciudad || "",
          estado: formData.estado === "Activo",
        };

        await createTercero(payloadSupabase);
        await fetchTerceros(); // refetch updated data
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving tercero:", error);
      alert("Error al guardar el tercero");
    } finally {
      setIsSaving(false);
    }
  };

  const [isSaving, setIsSaving] = useState(false);

  const filteredTerceros = terceros.filter((t) => {
    const matchCodigo = (t.codigo || "").toLowerCase().includes(filterCodigo.toLowerCase());
    const desc = `${t.razonSocial || ""} ${t.nombreCompleto || ""} ${t.nombre || ""}`.toLowerCase();
    const matchDesc = desc.includes(filterDescripcion.toLowerCase());

    const isActivo = typeof t.estado === "boolean" ? t.estado : t.estado === "Activo";
    const matchActivo = filterActivo === "Todos" ? true : (filterActivo === "Sí" && isActivo) || (filterActivo === "No" && !isActivo);

    // For mapping role checks, use t.roles if it exists, otherwise rely on t.tipo
    const isCliente = t.roles?.cliente || (t.tipo as string) === "cliente" || t.tipo === "Cliente";
    const isEmpleado = t.roles?.empleado || (t.tipo as string) === "vendedor";
    const isProveedor = t.roles?.proveedor || (t.tipo as string) === "proveedor" || t.tipo === "Proveedor";

    const matchCliente = filterCliente === "Todos" ? true : (filterCliente === "Sí" && isCliente) || (filterCliente === "No" && !isCliente);
    const matchEmpleado = filterEmpleado === "Todos" ? true : (filterEmpleado === "Sí" && isEmpleado) || (filterEmpleado === "No" && !isEmpleado);
    const matchProveedor = filterProveedor === "Todos" ? true : (filterProveedor === "Sí" && isProveedor) || (filterProveedor === "No" && !isProveedor);

    return matchCodigo && matchDesc && matchActivo && matchCliente && matchEmpleado && matchProveedor;
  });

  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto p-6 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium text-lg">Cargando clientes...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto w-full bg-[#fdfbf9] min-h-screen text-[#472825]">
      {/* HEADER Y FILTROS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#472825]">
            Gestión de Terceros
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Administra clientes, proveedores, empleados y prospectos.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-[#D3AB80] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-md shadow-[#D3AB80]/20 hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={2.5} />
          Nuevo Tercero
        </button>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[150px] space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Código</label>
          <input
            type="text"
            value={filterCodigo}
            onChange={(e) => setFilterCodigo(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
            placeholder="Buscar por código..."
          />
        </div>
        <div className="flex-1 min-w-[200px] space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Descripción</label>
          <input
            type="text"
            value={filterDescripcion}
            onChange={(e) => setFilterDescripcion(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
            placeholder="Razón social o nombre..."
          />
        </div>
        <div className="w-[120px] space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Activo</label>
          <select
            value={filterActivo}
            onChange={(e) => setFilterActivo(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
          >
            <option value="Todos">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="w-[120px] space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Cliente</label>
          <select
            value={filterCliente}
            onChange={(e) => setFilterCliente(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
          >
            <option value="Todos">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="w-[120px] space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Empleado</label>
          <select
            value={filterEmpleado}
            onChange={(e) => setFilterEmpleado(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
          >
            <option value="Todos">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="w-[120px] space-y-1">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Proveedor</label>
          <select
            value={filterProveedor}
            onChange={(e) => setFilterProveedor(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
          >
            <option value="Todos">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        <button className="bg-[#1f2937] hover:bg-black text-white p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center">
          <Search size={20} />
        </button>
      </div>

      {/* TABLA DE TERCEROS */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%]">
                  NIT/CC
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[20%]">
                  Razón Social / Nombre
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%]">
                  Dirección
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%]">
                  Teléfonos
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[10%]">
                  Ciudad
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[10%]">
                  Estado
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%] text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTerceros.length > 0 ? (
                filteredTerceros.map((tercero) => (
                  <tr
                    key={tercero.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="font-bold text-[#472825]">
                        {tercero.nit} {tercero.dv && `-${tercero.dv}`}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {tercero.tipoIdentificacion}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-[#472825]">
                        {tercero.razonSocial || tercero.nombreCompleto || tercero.nombre}
                      </div>
                      <div className="text-xs text-gray-500 font-medium truncate max-w-[200px]">
                        {tercero.correo}
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600 truncate max-w-[150px]">
                      {tercero.direccionFiscal || tercero.direccion}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      <div>{tercero.telefono1 || tercero.telefono}</div>
                      {tercero.celular && (
                        <div className="text-xs text-gray-400">{tercero.celular}</div>
                      )}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {tercero.ciudad}
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          (typeof tercero.estado === "boolean" ? tercero.estado : tercero.estado === "Activo")
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {(typeof tercero.estado === "boolean" ? tercero.estado : tercero.estado === "Activo") ? "Activo" : "Inactivo"}
                      </span>
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
                    colSpan={7}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-6xl max-h-[90vh] bg-[#fdfbf9] rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-[#472825]">
                    {isEditing ? "Editar Tercero" : "Registrar Tercero"}
                  </h2>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    {isEditing
                      ? "Modifica los datos del tercero."
                      : "Completa los datos para el nuevo tercero."}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* TABS */}
              <div className="bg-white border-b border-gray-100 px-8 flex gap-8 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("Datos Principales")}
                  className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === "Datos Principales"
                      ? "border-[#D3AB80] text-[#D3AB80]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Datos Principales
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("Sucursales")}
                  className={`py-4 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === "Sucursales"
                      ? "border-[#D3AB80] text-[#D3AB80]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sucursales
                </button>
              </div>

              {/* CONTENIDO SCROLLABLE */}
              <div className="flex-1 overflow-y-auto p-8 bg-[#fdfbf9]">
                <form id="terceroForm" onSubmit={handleSubmit} className="space-y-6">
                  {activeTab === "Datos Principales" ? (
                    <div className="space-y-6">
                      {/* TARJETA 1: Información Principal */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-[#472825] mb-4">Información Principal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Tipo Identificación</label>
                            <select
                              name="tipoIdentificacion"
                              value={formData.tipoIdentificacion}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            >
                              <option value="CC">CC</option>
                              <option value="NIT">NIT</option>
                              <option value="CE">CE</option>
                              <option value="Pasaporte">Pasaporte</option>
                            </select>
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Número Identificación</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                name="nit"
                                value={formData.nit}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                                placeholder="Ej. 900123456"
                              />
                              <button type="button" className="bg-[#1f2937] hover:bg-black text-white p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center">
                                <Search size={20} />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">DV</label>
                              <input
                                type="text"
                                name="dv"
                                value={formData.dv}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] text-center"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Código</label>
                              <input
                                type="text"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Razón Social</label>
                            <input
                              type="text"
                              name="razonSocial"
                              value={formData.razonSocial}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>

                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Nombre Completo</label>
                            <input
                              type="text"
                              name="nombreCompleto"
                              value={formData.nombreCompleto}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>

                          <div className="md:col-span-4 space-y-1.5 pt-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Roles</label>
                            <div className="flex flex-wrap gap-6">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.roles.cliente}
                                  onChange={(e) => setFormData({...formData, roles: {...formData.roles, cliente: e.target.checked}})}
                                  className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
                                />
                                <span className="text-sm font-medium text-[#472825]">Cliente</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.roles.empleado}
                                  onChange={(e) => setFormData({...formData, roles: {...formData.roles, empleado: e.target.checked}})}
                                  className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
                                />
                                <span className="text-sm font-medium text-[#472825]">Empleado</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.roles.proveedor}
                                  onChange={(e) => setFormData({...formData, roles: {...formData.roles, proveedor: e.target.checked}})}
                                  className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
                                />
                                <span className="text-sm font-medium text-[#472825]">Proveedor</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={formData.roles.prospecto}
                                  onChange={(e) => setFormData({...formData, roles: {...formData.roles, prospecto: e.target.checked}})}
                                  className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
                                />
                                <span className="text-sm font-medium text-[#472825]">Prospecto</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* TARJETA 2: Información de Contacto y Ubicación */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-[#472825] mb-4">Información de Contacto y Ubicación</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Vendedor Asignado</label>
                            <select
                              name="vendedor"
                              value={formData.vendedor}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="Vendedor 1">Vendedor 1</option>
                              <option value="Vendedor 2">Vendedor 2</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">E-mail</label>
                            <input
                              type="email"
                              name="correo"
                              value={formData.correo}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">E-mail Novedades</label>
                            <input
                              type="email"
                              name="correoNovedades"
                              value={formData.correoNovedades}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Teléfono 1</label>
                            <input
                              type="text"
                              name="telefono1"
                              value={formData.telefono1}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Teléfono 2</label>
                            <input
                              type="text"
                              name="telefono2"
                              value={formData.telefono2}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Celular</label>
                            <input
                              type="text"
                              name="celular"
                              value={formData.celular}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">País</label>
                            <select
                              name="pais"
                              value={selectedCountryCode}
                              onChange={(e) => {
                                const countryCode = e.target.value;
                                const countryName = e.target.options[e.target.selectedIndex].text;
                                setSelectedCountryCode(countryCode);
                                setSelectedStateCode("");
                                setFormData({
                                  ...formData,
                                  pais: countryName,
                                  departamento: "",
                                  ciudad: "",
                                });
                              }}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            >
                              <option value="">Seleccionar...</option>
                              {Country.getAllCountries().map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Departamento</label>
                            <select
                              name="departamento"
                              value={selectedStateCode}
                              disabled={!selectedCountryCode}
                              onChange={(e) => {
                                const stateCode = e.target.value;
                                const stateName = e.target.options[e.target.selectedIndex].text;
                                setSelectedStateCode(stateCode);
                                setFormData({
                                  ...formData,
                                  departamento: stateName,
                                  ciudad: "",
                                });
                              }}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] disabled:opacity-50"
                            >
                              <option value="">Seleccionar...</option>
                              {State.getStatesOfCountry(selectedCountryCode).map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Ciudad</label>
                            <select
                              name="ciudad"
                              value={formData.ciudad}
                              disabled={!selectedStateCode}
                              onChange={(e) => {
                                const cityName = e.target.value;
                                setFormData({ ...formData, ciudad: cityName });
                              }}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] disabled:opacity-50"
                            >
                              <option value="">Seleccionar...</option>
                              {City.getCitiesOfState(selectedCountryCode, selectedStateCode).map((city) => (
                                <option key={city.name} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1.5 md:col-span-3">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Dirección Fiscal</label>
                            <input
                              type="text"
                              name="direccionFiscal"
                              value={formData.direccionFiscal}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-3">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Dirección Despachos</label>
                            <input
                              type="text"
                              name="direccionDespachos"
                              value={formData.direccionDespachos}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* TARJETA 3: Comercial y Ventas */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-[#472825] mb-4">Comercial y Ventas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Cumpleaños (Día/Mes)</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                name="cumpleDia"
                                value={formData.cumpleDia}
                                onChange={handleChange}
                                placeholder="DD"
                                className="w-1/2 bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] text-center"
                              />
                              <input
                                type="text"
                                name="cumpleMes"
                                value={formData.cumpleMes}
                                onChange={handleChange}
                                placeholder="MM"
                                className="w-1/2 bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] text-center"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Cartera</label>
                            <select
                              name="cartera"
                              value={formData.cartera}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="Contado">Contado</option>
                              <option value="30 Días">30 Días</option>
                              <option value="60 Días">60 Días</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Forma de Pago</label>
                            <select
                              name="formaPago"
                              value={formData.formaPago}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="Efectivo">Efectivo</option>
                              <option value="Transferencia">Transferencia</option>
                              <option value="Tarjeta">Tarjeta</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Nivel de Precio</label>
                            <select
                              name="nivelPrecio"
                              value={formData.nivelPrecio}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="Detal">Detal</option>
                              <option value="Mayorista">Mayorista</option>
                              <option value="Distribuidor">Distribuidor</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Clasificación</label>
                            <select
                              name="clasificacion"
                              value={formData.clasificacion}
                              onChange={handleChange}
                              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                            >
                              <option value="">Seleccionar...</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                            </select>
                          </div>

                          <div className="space-y-1.5 flex items-end pb-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="aplicaCredito"
                                checked={formData.aplicaCredito}
                                onChange={(e) => setFormData({...formData, aplicaCredito: e.target.checked})}
                                className="w-4 h-4 text-[#D3AB80] rounded border-gray-300 focus:ring-[#D3AB80]"
                              />
                              <span className="text-sm font-medium text-[#472825]">Aplica Cupo Crédito</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* TARJETA 4: Observaciones */}
                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-[#472825] mb-4">Observaciones DOHA 18K</h3>
                        <div className="space-y-1.5">
                          <textarea
                            name="observaciones"
                            value={formData.observaciones}
                            onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] resize-none"
                            placeholder="Notas internas..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[200px] flex items-center justify-center">
                      <p className="text-gray-500 font-medium">No hay sucursales registradas.</p>
                    </div>
                  )}
                </form>
              </div>

              {/* FOOTER FIXED */}
              <div className="bg-white px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-[#472825] hover:bg-gray-50 rounded-xl transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="terceroForm"
                  disabled={isSaving}
                  className="bg-[#D3AB80] text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-md disabled:opacity-50"
                >
                  {isSaving ? "Guardando..." : "Guardar Tercero"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

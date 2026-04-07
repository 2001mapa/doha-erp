"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Shield,
  UserCircle,
  CheckCircle2,
  XCircle,
  X,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getUsuarios, getRoles, crearUsuario } from "@/src/actions/usuarios";

export default function UsuariosPage() {
  // --- ESTADOS LOCALES ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [usuarios, setUsuarios] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [roles, setRoles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  // Estados para el Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    email: "",
    rol_id: "",
    estado: "Activo",
  });

  // --- FUNCIONES LÓGICAS ---
  const loadData = async () => {
    try {
      const [usuariosRes, rolesRes] = await Promise.all([
        getUsuarios(),
        getRoles()
      ]);

      if (usuariosRes.success) {
        setUsuarios(usuariosRes.data || []);
      }
      if (rolesRes.success) {
        setRoles(rolesRes.data || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchInitData = async () => {
      try {
        const [usuariosRes, rolesRes] = await Promise.all([
          getUsuarios(),
          getRoles()
        ]);

        if (isMounted) {
          if (usuariosRes.success) {
            setUsuarios(usuariosRes.data || []);
          }
          if (rolesRes.success) {
            setRoles(rolesRes.data || []);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchInitData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Abrir modal para crear
  const handleOpenCreate = () => {
    setFormData({
      id: "",
      nombre: "",
      email: "",
      rol_id: roles.length > 0 ? roles[0].id : "",
      estado: "Activo",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenEdit = (usuario: any) => {
    setFormData(usuario);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Borrar usuario
  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  // Guardar (Crear o Editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      // Actualizar existente
      setUsuarios(usuarios.map((u) => (u.id === formData.id ? formData : u)));
      setIsModalOpen(false);
    } else {
      // Crear nuevo
      const response = await crearUsuario(formData);
      if (response.success) {
        // Recargar datos o agregar a la lista
        if (response.data) {
           setUsuarios([...usuarios, response.data]);
        } else {
           await loadData();
        }
        setIsModalOpen(false);
        // Show success toast (simplificado con alert para este entorno)
        alert("Usuario creado exitosamente");
      } else {
        alert("Error al crear usuario: " + response.error);
      }
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Filtrar lista para la tabla
  const usuariosFiltrados = usuarios.filter((u) => {
    const rolNombre = u.roles?.nombre || "";
    const coincideBusqueda =
      u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rolNombre.toLowerCase().includes(searchTerm.toLowerCase());

    const coincideEstado =
      filtroEstado === "Todos" || u.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="p-8 min-h-screen bg-[#fdfbf9]">
      {/* Encabezado y Breadcrumb */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">
            Configuración Inicial /{" "}
            <span className="text-[#D3AB80] font-bold">
              Creación de Usuarios
            </span>
          </p>
          <h1 className="text-3xl font-black text-[#472825]">
            Gestión de Usuarios
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
          Nuevo Usuario
        </button>
      </div>

      {/* Controles: Búsqueda y Filtros */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por nombre, email o rol..."
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

      {/* Tabla de Usuarios */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200">
                <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                  Usuario
                </th>
                <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                  Rol Asignado
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
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D3AB80]/20 flex items-center justify-center text-[#472825]">
                          <UserCircle size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#472825]">
                            {usuario.nombre}
                          </p>
                          <p className="text-xs font-medium text-gray-500">
                            {usuario.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                        <Shield
                          size={16}
                          className={
                            usuario.roles?.nombre === "Administrador"
                              ? "text-amber-500"
                              : "text-gray-400"
                          }
                        />
                        {usuario.roles?.nombre || "Sin rol"}
                      </div>
                    </td>
                    <td className="p-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          usuario.estado === "Activo"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {usuario.estado === "Activo" ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleOpenEdit(usuario)}
                          className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(usuario.id)}
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
                    No se encontraron usuarios.
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-black text-[#472825]">
                    {isEditing ? "Editar Usuario" : "Registrar Usuario"}
                  </h2>
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    {isEditing
                      ? "Modifica los datos del acceso."
                      : "Completa los datos para el nuevo acceso."}
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
                    Nombre Completo
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
                      placeholder="Ej. Carlos Mendoza"
                    />
                  </div>
                </div>

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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      placeholder="correo@doha18k.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Rol de Sistema
                    </label>
                    <div className="relative">
                      <Shield
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <select
                        name="rol_id"
                        value={formData.rol_id}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                      >
                        <option value="" disabled>Selecciona un rol</option>
                        {roles.map((rol) => (
                          <option key={rol.id} value={rol.id}>
                            {rol.nombre}
                          </option>
                        ))}
                      </select>
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
                    {isEditing ? "Guardar Cambios" : "Crear Usuario"}
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

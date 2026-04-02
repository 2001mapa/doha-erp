"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Warehouse,
  CheckCircle2,
  XCircle,
  X,
  Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Datos iniciales de prueba
const mockBodegasIniciales = [
  { id: 1, codigo: "01", descripcion: "CAJA FUERTE PRINCIPAL", sucursal: "Sede Medellín", tercero: "Carlos Pérez (Admin)", cuentaCxc: "No Aplica", cuentaCxp: "No Aplica", activo: true, restringido: true },
  { id: 2, codigo: "02", descripcion: "VITRINA EXHIBICIÓN", sucursal: "Sede Medellín", tercero: "Juan Gómez (Vendedor)", cuentaCxc: "130505 - Clientes Nacionales", cuentaCxp: "220501 - Proveedores Nacionales", activo: true, restringido: false }
];

export default function BodegasPage() {
  const [bodegas, setBodegas] = useState(mockBodegasIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    codigo: "",
    descripcion: "",
    sucursal: "Sede Medellín",
    tercero: "",
    cuentaCxc: "No Aplica",
    cuentaCxp: "No Aplica",
    activo: true,
    restringido: false,
  });

  const handleOpenCreate = () => {
    setFormData({ id: 0, codigo: "", descripcion: "", sucursal: "Sede Medellín", tercero: "", cuentaCxc: "No Aplica", cuentaCxp: "No Aplica", activo: true, restringido: false });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (bodega: typeof formData) => {
    setFormData(bodega);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (
      confirm("¿Estás seguro de que deseas eliminar esta bodega?")
    ) {
      setBodegas(bodegas.filter((b) => b.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setBodegas(
        bodegas.map((b) =>
          b.id === formData.id ? formData : b
        )
      );
    } else {
      const nuevaBodega = {
        ...formData,
        id: Date.now(),
      };
      setBodegas([...bodegas, nuevaBodega]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const bodegasFiltradas = bodegas.filter((b) => {
    const coincideBusqueda =
      b.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.sucursal.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideEstado =
      filtroEstado === "Todos" ||
      (filtroEstado === "Activos" && b.activo) ||
      (filtroEstado === "Inactivos" && !b.activo);
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
              <span className="text-[#D3AB80] font-bold">Bodegas</span>
            </p>
            <h1 className="text-3xl font-black text-[#472825] mb-4">
              Gestión de Bodegas
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleOpenCreate}
                className="bg-[#D3AB80] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8956b] transition-all shadow-md flex items-center gap-2 group"
              >
                <Plus
                  size={18}
                  className="group-hover:rotate-90 transition-transform"
                />
                Nueva Bodega
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar bodega..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:bg-white focus:border-[#D3AB80] outline-none transition-all text-[#472825] shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-bold text-[#472825]">Estado:</span>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-200 bg-white text-[#472825] rounded-xl p-2.5 text-sm font-medium focus:ring-[#D3AB80] focus:border-[#D3AB80] outline-none shadow-sm"
              >
                <option>Todos</option>
                <option>Activos</option>
                <option>Inactivos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Código
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Sucursal
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">
                    Activo
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">
                    Restringido
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bodegasFiltradas.length > 0 ? (
                  bodegasFiltradas.map((bodega) => (
                    <tr
                      key={bodega.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5">
                        <span className="text-sm font-bold text-gray-500">
                          {bodega.codigo}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#D3AB80]/20 flex items-center justify-center text-[#472825]">
                            <Warehouse size={18} />
                          </div>
                          <span className="text-sm font-black text-[#472825]">
                            {bodega.descripcion}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600">
                          {bodega.sucursal}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center">
                          {bodega.activo ? (
                            <CheckCircle2 className="text-green-500" size={20} />
                          ) : (
                            <XCircle className="text-red-500" size={20} />
                          )}
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <div className="flex justify-center">
                           {bodega.restringido ? (
                            <div title="Solo administradores">
                              <Lock className="text-red-400" size={18} />
                            </div>
                          ) : (
                            <div title="Acceso general">
                              <CheckCircle2 className="text-green-500" size={20} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(bodega)}
                            className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(bodega.id)}
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
                      No se encontraron bodegas.
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-3xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h2 className="text-xl font-black text-[#472825]">
                      {isEditing ? "Editar Bodega" : "Registrar Bodega"}
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Administra los lugares de almacenamiento e integración contable.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Fila 1 */}
                    <div className="space-y-1.5 md:col-span-1">
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
                        placeholder="Ej. 03"
                      />
                    </div>
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
                        placeholder="Ej. BODEGA TALLER"
                      />
                    </div>

                    {/* Fila 2 */}
                    <div className="space-y-1.5 md:col-span-1 md:col-start-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Sucursal
                      </label>
                      <select
                        name="sucursal"
                        value={formData.sucursal}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      >
                        <option value="Sede Medellín">Sede Medellín</option>
                        <option value="Sede Envigado">Sede Envigado</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Tercero Responsable
                      </label>
                      <input
                        list="terceros"
                        name="tercero"
                        value={formData.tercero}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Buscar tercero..."
                      />
                      <datalist id="terceros">
                        <option value="Carlos Pérez (Admin)" />
                        <option value="Juan Gómez (Vendedor)" />
                      </datalist>
                    </div>

                    {/* Fila 3: Integración Contable */}
                    <div className="space-y-1.5 md:col-span-1 md:col-start-1 md:col-end-3">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Cuenta CXC
                      </label>
                      <select
                        name="cuentaCxc"
                        value={formData.cuentaCxc}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      >
                        <option value="No Aplica">No Aplica</option>
                        <option value="130505 - Clientes Nacionales">130505 - Clientes Nacionales</option>
                        <option value="13102005 - Particulares">13102005 - Particulares</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:col-span-1 md:col-start-3 md:col-end-4">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Cuenta CXP
                      </label>
                      <select
                        name="cuentaCxp"
                        value={formData.cuentaCxp}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      >
                        <option value="No Aplica">No Aplica</option>
                        <option value="220501 - Proveedores Nacionales">220501 - Proveedores Nacionales</option>
                      </select>
                    </div>

                    {/* Fila 4: Switches/Checkboxes */}
                    <div className="md:col-span-3 flex gap-8 items-center mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="activo"
                            checked={formData.activo}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </div>
                        <span className="text-sm font-bold text-[#472825]">Bodega Activa</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="restringido"
                            checked={formData.restringido}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-sm font-bold text-[#472825]">Bodega Restringida</span>
                           <span className="text-[10px] text-red-500 font-medium">Solo administradores pueden verla</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 text-sm font-bold bg-gray-100 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#D3AB80] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8956b] transition-all shadow-md"
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
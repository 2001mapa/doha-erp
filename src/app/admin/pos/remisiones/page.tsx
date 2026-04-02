"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  FileText,
  History,
  X,
  User,
  Package,
  Hash,
  CreditCard,
  CheckCircle2,
  Clock,
  Banknote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Datos iniciales de prueba (Mock Data)
const mockRemisionesIniciales = [
  { id: 1, numero: "REM-001", fecha: "2026-04-01", cliente: "María López", total: 120000, metodoPago: "Efectivo", estado: "Pagada" },
  { id: 2, numero: "REM-002", fecha: "2026-04-01", cliente: "Juan Pérez", total: 85000, metodoPago: "Wompi", estado: "Crédito (Pendiente)" }
];

export default function RemisionesPage() {
  const [remisiones, setRemisiones] = useState(mockRemisionesIniciales);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    cliente: "",
    producto: "",
    cantidad: 1,
    metodoPago: "Efectivo"
  });

  const handleOpenCreate = () => {
    setFormData({
      id: 0,
      cliente: "",
      producto: "Cadena Mónaco - $120.000",
      cantidad: 1,
      metodoPago: "Efectivo"
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      // Logic for editing (if enabled)
    } else {
      // Logic for creating
      const nuevaRemision = {
        id: Date.now(),
        numero: `REM-00${remisiones.length + 1}`,
        fecha: new Date().toISOString().split('T')[0],
        cliente: formData.cliente,
        total: formData.producto.includes("120.000") ? 120000 * formData.cantidad : 85000 * formData.cantidad,
        metodoPago: formData.metodoPago,
        estado: formData.metodoPago === "Efectivo" ? "Pagada" : "Crédito (Pendiente)"
      };
      setRemisiones([...remisiones, nuevaRemision]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const remisionesFiltradas = remisiones.filter((r) => {
    const coincideBusqueda =
      r.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideEstado =
      filtroEstado === "Todos" || r.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="p-8 min-h-screen bg-[#fdfbf9]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Panel de Control / POS /{" "}
              <span className="text-[#D3AB80] font-bold">Remisiones</span>
            </p>
            <h1 className="text-3xl font-black text-[#472825]">
              Gestión de Remisiones
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
            Nueva Remisión
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
              placeholder="Buscar por número o cliente..."
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
              <option>Pagada</option>
              <option>Crédito (Pendiente)</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Número
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Método de Pago
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">
                    Total
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
                {remisionesFiltradas.length > 0 ? (
                  remisionesFiltradas.map((remision) => (
                    <tr
                      key={remision.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#D3AB80]/20 flex items-center justify-center text-[#472825]">
                            <FileText size={18} />
                          </div>
                          <span className="text-sm font-black text-[#472825]">
                            {remision.numero}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600">
                          {remision.fecha}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600">
                          {remision.cliente}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600">
                          {remision.metodoPago}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-bold text-[#472825]">
                          {formatCurrency(remision.total)}
                        </span>
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            remision.estado === "Pagada"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {remision.estado === "Pagada" ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                          {remision.estado}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-2">
                          <button
                            className="p-2 text-[#472825] hover:bg-[#D3AB80]/20 rounded-xl transition-colors tooltip"
                            title="Ver / Imprimir"
                          >
                            <FileText size={18} />
                          </button>
                          <button
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors tooltip"
                            title="Auditoría"
                          >
                            <History size={18} />
                          </button>
                          <button
                            className="p-2 text-gray-300 cursor-not-allowed rounded-xl transition-colors tooltip"
                            title="Editar bloqueado"
                            disabled
                          >
                            <Edit size={18} />
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
                      No se encontraron remisiones.
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h2 className="text-xl font-black text-[#472825]">
                      {isEditing ? "Editar Remisión" : "Nueva Remisión"}
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Registra una nueva venta o remisión.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-5">
                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Cliente
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Nombre del cliente"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Producto
                    </label>
                    <div className="relative">
                      <Package
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <select
                        name="producto"
                        value={formData.producto}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                      >
                        <option value="Cadena Mónaco - $120.000">Cadena Mónaco - $120.000</option>
                        <option value="Pulsera Esclava - $85.000">Pulsera Esclava - $85.000</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Cantidad
                    </label>
                    <div className="relative">
                      <Hash
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                      Método de Pago
                    </label>
                    <div className="relative">
                      <CreditCard
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <select
                        name="metodoPago"
                        value={formData.metodoPago}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                      >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Wompi">Wompi</option>
                        <option value="Datáfono">Datáfono</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-2 pt-6 mt-2 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-[#472825] transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#472825] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-md flex items-center gap-2"
                    >
                      <Banknote size={18} />
                      {isEditing ? "Guardar" : "Crear Remisión"}
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

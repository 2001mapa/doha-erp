"use client";
import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Datos iniciales de prueba
const mockClasificacionesIniciales = [
  {
    id: 1,
    codigo: "P1",
    descripcion: "GRUPO GRAVADO - ORO LAMINADO",
    activo: true,
    centroCosto: "01 - INVERSIONES DOHA",
    // Comercial
    cuentaInvVenta: "143501 - Inventario Joyería",
    cuentaInvVentaReserva: "143502 - Reserva Joyería",
    cuentaInvDevVenta: "143503 - Dev. Inventario",
    cuentaIngresoVenta: "413524 - Venta de joyas",
    cuentaDevVenta: "413525 - Dev. en ventas",
    cuentaCostoVenta: "613524 - Costo de venta",
    cuentaGastoBonificado: "513524 - Gasto bonificado",
    // Inventarios
    cuentaCompras: "620501 - Compras",
    cuentaDevInventarios: "620502 - Dev. Compras",
    cuentaDescCompras: "620503 - Desc. Compras",
    cuentaAjusteInventario: "143599 - Ajuste Inv.",
    cuentaInvFisico: "143598 - Inv. Físico",
    // Producción e Impuestos
    costoProduccion: "710501 - Costo Producción",
    impuestoVenta: "0 - IVA 19%",
    impuestoVentaAlterno: "0 - IVA 19%"
  },
  {
    id: 2,
    codigo: "P2",
    descripcion: "GRUPO EXENTO - INSUMOS",
    activo: true,
    centroCosto: "01 - INVERSIONES DOHA",
    // Comercial
    cuentaInvVenta: "145501 - Materiales",
    cuentaInvVentaReserva: "145502 - Reserva Materiales",
    cuentaInvDevVenta: "145503 - Dev. Materiales",
    cuentaIngresoVenta: "413599 - Otras ventas",
    cuentaDevVenta: "413598 - Dev. Otras ventas",
    cuentaCostoVenta: "613599 - Otros costos",
    cuentaGastoBonificado: "513599 - Otros gastos",
    // Inventarios
    cuentaCompras: "620599 - Compras",
    cuentaDevInventarios: "620598 - Dev. Compras",
    cuentaDescCompras: "620597 - Desc. Compras",
    cuentaAjusteInventario: "145599 - Ajuste Inv.",
    cuentaInvFisico: "145598 - Inv. Físico",
    // Producción e Impuestos
    costoProduccion: "710599 - Costo Producción",
    impuestoVenta: "1 - EXENTOS",
    impuestoVentaAlterno: "1 - EXENTOS"
  },
];

export default function ClasificacionContablePage() {
  const [clasificaciones, setClasificaciones] = useState(
    mockClasificacionesIniciales,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    codigo: "",
    descripcion: "",
    activo: true,
    centroCosto: "01 - INVERSIONES DOHA",
    // Comercial
    cuentaInvVenta: "",
    cuentaInvVentaReserva: "",
    cuentaInvDevVenta: "",
    cuentaIngresoVenta: "",
    cuentaDevVenta: "",
    cuentaCostoVenta: "",
    cuentaGastoBonificado: "",
    // Inventarios
    cuentaCompras: "",
    cuentaDevInventarios: "",
    cuentaDescCompras: "",
    cuentaAjusteInventario: "",
    cuentaInvFisico: "",
    // Producción e Impuestos
    costoProduccion: "",
    impuestoVenta: "0 - IVA 19%",
    impuestoVentaAlterno: ""
  });

  const handleOpenCreate = () => {
    setFormData({
      id: 0,
      codigo: "",
      descripcion: "",
      activo: true,
      centroCosto: "01 - INVERSIONES DOHA",
      cuentaInvVenta: "",
      cuentaInvVentaReserva: "",
      cuentaInvDevVenta: "",
      cuentaIngresoVenta: "",
      cuentaDevVenta: "",
      cuentaCostoVenta: "",
      cuentaGastoBonificado: "",
      cuentaCompras: "",
      cuentaDevInventarios: "",
      cuentaDescCompras: "",
      cuentaAjusteInventario: "",
      cuentaInvFisico: "",
      costoProduccion: "",
      impuestoVenta: "0 - IVA 19%",
      impuestoVentaAlterno: ""
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenEdit = (clasificacion: any) => {
    setFormData(clasificacion);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (
      confirm("¿Estás seguro de que deseas eliminar esta clasificación contable?")
    ) {
      setClasificaciones(clasificaciones.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setClasificaciones(
        clasificaciones.map((c) => (c.id === formData.id ? formData : c)),
      );
    } else {
      const nuevaClasificacion = {
        ...formData,
        id: Date.now(),
      };
      setClasificaciones([...clasificaciones, nuevaClasificacion]);
    }
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const clasificacionesFiltradas = clasificaciones.filter((c) => {
    const term = searchTerm.toLowerCase();
    const coincideBusqueda =
      c.codigo.toLowerCase().includes(term) ||
      c.descripcion.toLowerCase().includes(term);
    const estadoMap: Record<string, boolean | string> = { "Activo": true, "Inactivo": false };
    const coincideEstado =
      filtroEstado === "Todos" || c.activo === estadoMap[filtroEstado];
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
              <span className="text-[#D3AB80] font-bold">Clasificación Contable</span>
            </p>
            <h1 className="text-3xl font-black text-[#472825]">
              Clasificación Contable
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
            Nueva Clasificación
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
              placeholder="Buscar por nombre o cuenta..."
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
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
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
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-3/6">
                    Descripción
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-1/6">
                    Activo
                  </th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center w-1/6">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clasificacionesFiltradas.length > 0 ? (
                  clasificacionesFiltradas.map((clasificacion) => (
                    <tr
                      key={clasificacion.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-5">
                        <span className="text-sm font-black text-[#472825]">
                          {clasificacion.codigo}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#D3AB80]/20 flex items-center justify-center text-[#472825] flex-shrink-0">
                            <BookOpen size={18} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {clasificacion.descripcion}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            clasificacion.activo
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {clasificacion.activo ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}
                          {clasificacion.activo ? "Sí" : "No"}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(clasificacion)}
                            className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(clasificacion.id)}
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
                      No se encontraron clasificaciones contables.
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-5xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h2 className="text-xl font-black text-[#472825]">
                      Registrar Clasificación
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      {isEditing ? "Edita" : "Define"} la clasificación contable para enlazar con el PUC.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
                  <div className="p-8 overflow-y-auto max-h-[85vh] space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
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
                        placeholder="Ej. P1"
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
                        placeholder="Ej. GRUPO GRAVADO - ORO LAMINADO"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Activo
                      </label>
                      <div className="flex items-center h-[46px] px-4 bg-gray-50 border border-gray-200 rounded-xl">
                        <label className="flex items-center cursor-pointer gap-2">
                          <input
                            type="checkbox"
                            name="activo"
                            checked={formData.activo}
                            onChange={handleChange}
                            className="w-5 h-5 accent-[#D3AB80] rounded cursor-pointer"
                          />
                          <span className="text-sm font-medium text-[#472825]">{formData.activo ? 'Sí' : 'No'}</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Centro de Costo
                      </label>
                      <select
                        name="centroCosto"
                        value={formData.centroCosto}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                      >
                        <option value="01 - INVERSIONES DOHA">01 - INVERSIONES DOHA</option>
                        <option value="02 - OTRO CENTRO">02 - OTRO CENTRO</option>
                      </select>
                    </div>
                  </div>

                  {/* BLOQUE 1: COMERCIAL */}
                  <div className="border border-[#D3AB80]/30 rounded-2xl p-6 bg-[#fdfbf9]/50 shadow-sm">
                    <h3 className="text-sm font-black text-[#472825] mb-4 border-b border-[#D3AB80]/20 pb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D3AB80]"></span>
                      COMERCIAL
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {["cuentaInvVenta", "cuentaInvVentaReserva", "cuentaInvDevVenta", "cuentaIngresoVenta", "cuentaDevVenta", "cuentaCostoVenta", "cuentaGastoBonificado"].map((campo) => (
                        <div key={campo} className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                            {campo.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          <input
                            type="text"
                            name={campo}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            value={(formData as any)[campo]}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 focus:border-[#D3AB80] rounded-xl py-2.5 px-3 text-xs font-medium outline-none transition-all text-[#472825]"
                            placeholder="Ej. 143501..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BLOQUE 2: INVENTARIOS */}
                  <div className="border border-blue-100 rounded-2xl p-6 bg-blue-50/20 shadow-sm">
                    <h3 className="text-sm font-black text-[#472825] mb-4 border-b border-blue-100 pb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      INVENTARIOS
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {["cuentaCompras", "cuentaDevInventarios", "cuentaDescCompras", "cuentaAjusteInventario", "cuentaInvFisico"].map((campo) => (
                        <div key={campo} className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                            {campo.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          <input
                            type="text"
                            name={campo}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            value={(formData as any)[campo]}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 focus:border-blue-400 rounded-xl py-2.5 px-3 text-xs font-medium outline-none transition-all text-[#472825]"
                            placeholder="Ej. 620501..."
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BLOQUE 3: PRODUCCIÓN E IMPUESTOS */}
                  <div className="border border-emerald-100 rounded-2xl p-6 bg-emerald-50/20 shadow-sm">
                    <h3 className="text-sm font-black text-[#472825] mb-4 border-b border-emerald-100 pb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      PRODUCCIÓN E IMPUESTOS
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                          Costo Producción
                        </label>
                        <input
                          type="text"
                          name="costoProduccion"
                          value={formData.costoProduccion}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 focus:border-emerald-400 rounded-xl py-2.5 px-3 text-xs font-medium outline-none transition-all text-[#472825]"
                          placeholder="Ej. 710501..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                          Impuesto Venta
                        </label>
                        <select
                          name="impuestoVenta"
                          value={formData.impuestoVenta}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 focus:border-emerald-400 rounded-xl py-2.5 px-3 text-xs font-medium outline-none transition-all text-[#472825] appearance-none"
                        >
                          <option value="0 - IVA 19%">0 - IVA 19%</option>
                          <option value="1 - EXENTOS">1 - EXENTOS</option>
                          <option value="3 - DESCUENTO">3 - DESCUENTO</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                          Impuesto Venta Alterno
                        </label>
                        <select
                          name="impuestoVentaAlterno"
                          value={formData.impuestoVentaAlterno}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 focus:border-emerald-400 rounded-xl py-2.5 px-3 text-xs font-medium outline-none transition-all text-[#472825] appearance-none"
                        >
                          <option value="">Seleccione...</option>
                          <option value="0 - IVA 19%">0 - IVA 19%</option>
                          <option value="1 - EXENTOS">1 - EXENTOS</option>
                          <option value="3 - DESCUENTO">3 - DESCUENTO</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  </div>
                  <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-[#472825] transition-colors bg-gray-100 rounded-xl"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#D3AB80] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b89570] transition-all shadow-md"
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
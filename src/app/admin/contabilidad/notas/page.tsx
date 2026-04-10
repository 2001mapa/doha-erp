"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Eye,
  X,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getNotasContables,
  createNotaContable,
  getDetalleNota,
} from "@/src/actions/notas";
import { getTerceros } from "@/src/actions/terceros";

export default function NotasContablesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notas, setNotas] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [terceros, setTerceros] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [modalStep, setModalStep] = useState<0 | 1 | 2>(0);
  const [selectedType, setSelectedType] = useState("CONTABLE");

  // --- NUEVOS ESTADOS PARA VISTA PREVIA ---
  const [modalVerDetalle, setModalVerDetalle] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [notaSeleccionada, setNotaSeleccionada] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [detallesVisualizar, setDetallesVisualizar] = useState<any[]>([]);

  // Estado para la nueva nota (Cabecera)
  const [cabecera, setCabecera] = useState({
    numero_nota: "",
    fecha: new Date().toISOString().split("T")[0],
    tipo_nota: "CONTABLE",
    tercero_id: "",
    concepto_general: "",
  });

  // Estado para las líneas del asiento
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lineas, setLineas] = useState<any[]>([
    { cuenta_puc: "", tercero_id: "", debito: 0, credito: 0 },
  ]);

  useEffect(() => {
    const refreshData = async () => {
      setIsLoading(true);
      const [nRes, tRes] = await Promise.all([
        getNotasContables(),
        getTerceros(),
      ]);
      if (nRes.data) setNotas(nRes.data);
      if (tRes.data) setTerceros(tRes.data);
      setIsLoading(false);
    };
    refreshData();
  }, []);

  const refreshDataManual = async () => {
    setIsLoading(true);
    const [nRes, tRes] = await Promise.all([
      getNotasContables(),
      getTerceros(),
    ]);
    if (nRes.data) setNotas(nRes.data);
    if (tRes.data) setTerceros(tRes.data);
    setIsLoading(false);
  };

  // --- FUNCIÓN PARA EL OJO ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleVerDetalle = async (nota: any) => {
    setNotaSeleccionada(nota);
    const res = await getDetalleNota(nota.id);
    if (res.data) {
      setDetallesVisualizar(res.data);
      setModalVerDetalle(true);
    } else {
      alert("Error al cargar detalles: " + res.error);
    }
  };

  const handleGuardar = async () => {
    if (sumas.debito !== sumas.credito || sumas.debito === 0) {
      alert(
        "¡Error! El asiento contable no está cuadrado (Débitos debe ser igual a Créditos) o está en cero.",
      );
      return;
    }

    setIsSaving(true);
    const res = await createNotaContable(cabecera, lineas);
    if (res.error) {
      alert("Error al guardar: " + res.error);
    } else {
      await refreshDataManual();
      setModalStep(0);
      setLineas([{ cuenta_puc: "", tercero_id: "", debito: 0, credito: 0 }]);
    }
    setIsSaving(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLineaChange = (index: number, field: string, value: any) => {
    const nuevasLineas = [...lineas];
    nuevasLineas[index][field] = field.includes("ito")
      ? parseFloat(value) || 0
      : value;
    setLineas(nuevasLineas);
  };

  const eliminarLinea = (index: number) => {
    const nuevasLineas = lineas.filter((_, i) => i !== index);
    setLineas(nuevasLineas);
  };

  const sumas = lineas.reduce(
    (acc, curr) => ({
      debito: acc.debito + (curr.debito || 0),
      credito: acc.credito + (curr.credito || 0),
    }),
    { debito: 0, credito: 0 },
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(val);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-[#472825] bg-[#fdfbf9]">
        Sincronizando Contabilidad DOHA...
      </div>
    );

  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen bg-[#fdfbf9] text-[#472825]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black mb-1 text-[#472825]">
            Notas Contables
          </h1>
          <p className="text-sm opacity-80 font-medium">
            Gestión de ajustes y notas en el sistema contable.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedType("CONTABLE");
            setModalStep(1);
          }}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D3AB80] text-white font-bold shadow-lg hover:bg-[#b38e65] transition-all shadow-[#D3AB80]/30"
        >
          <Plus size={20} />
          <span>Nueva Nota</span>
        </button>
      </div>

      {/* TABLA PRINCIPAL */}
      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-zinc-50/50">
            <tr>
              <th className="p-5 text-[10px] font-black uppercase text-zinc-400">
                Fecha
              </th>
              <th className="p-5 text-[10px] font-black uppercase text-zinc-400">
                Documento
              </th>
              <th className="p-5 text-[10px] font-black uppercase text-zinc-400">
                Tercero
              </th>
              <th className="p-5 text-[10px] font-black uppercase text-zinc-400 text-right">
                Débito
              </th>
              <th className="p-5 text-[10px] font-black uppercase text-zinc-400 text-right">
                Crédito
              </th>
              <th className="p-5 text-[10px] font-black uppercase text-zinc-400 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {notas.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-zinc-400 italic"
                >
                  No hay registros reales. Crea tu primera nota.
                </td>
              </tr>
            ) : (
              notas.map((nota) => {
                const totalD =
                  nota.notas_contables_detalle?.reduce(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (a: any, b: any) => a + (b.debito || 0),
                    0,
                  ) || 0;
                const totalC =
                  nota.notas_contables_detalle?.reduce(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (a: any, b: any) => a + (b.credito || 0),
                    0,
                  ) || 0;
                return (
                  <tr
                    key={nota.id}
                    className="hover:bg-zinc-50/30 transition-colors group"
                  >
                    <td className="p-5 text-sm font-medium">{nota.fecha}</td>
                    <td className="p-5 text-sm font-black">
                      {nota.numero_nota}
                    </td>
                    <td className="p-5 text-sm">
                      {nota.terceros?.nombre_completo ||
                        nota.terceros?.razon_social}
                    </td>
                    <td className="p-5 text-sm text-right font-bold text-[#D3AB80]">
                      {formatCurrency(totalD)}
                    </td>
                    <td className="p-5 text-sm text-right font-bold text-[#D3AB80]">
                      {formatCurrency(totalC)}
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => handleVerDetalle(nota)}
                        className="p-2 bg-zinc-50 rounded-lg group-hover:bg-[#D3AB80]/10 transition-colors"
                      >
                        <Eye size={16} className="text-[#D3AB80]" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {/* MODAL 1: SELECCIÓN */}
        {modalStep === 1 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <h2 className="text-xl font-black mb-6">Tipo de Nota</h2>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl outline-none font-bold mb-8"
              >
                <option value="CONTABLE">CONTABLE</option>
                <option value="SALDOS INICIALES">SALDOS INICIALES</option>
              </select>
              <div className="flex gap-4">
                <button
                  onClick={() => setModalStep(0)}
                  className="flex-1 font-bold text-red-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setCabecera({ ...cabecera, tipo_nota: selectedType });
                    setModalStep(2);
                  }}
                  className="flex-1 bg-[#D3AB80] text-white p-4 rounded-2xl font-black shadow-lg"
                >
                  Aceptar
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* MODAL 2: FORMULARIO REAL */}
        {modalStep === 2 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-white"
            >
              <div className="p-8 border-b flex justify-between items-center bg-zinc-50/50">
                <h2 className="text-2xl font-black">
                  {cabecera.tipo_nota} - NUEVA NOTA
                </h2>
                <button onClick={() => setModalStep(0)}>
                  <X />
                </button>
              </div>
              <div className="p-8 overflow-y-auto flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-100">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                      Número de Nota
                    </label>
                    <input
                      value={cabecera.numero_nota}
                      onChange={(e) =>
                        setCabecera({
                          ...cabecera,
                          numero_nota: e.target.value,
                        })
                      }
                      placeholder="Ej: NC-001"
                      className="w-full p-4 rounded-2xl border bg-white font-bold outline-none focus:border-[#D3AB80]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      value={cabecera.fecha}
                      onChange={(e) =>
                        setCabecera({ ...cabecera, fecha: e.target.value })
                      }
                      className="w-full p-4 rounded-2xl border bg-white font-bold outline-none focus:border-[#D3AB80]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 ml-1">
                      Tercero Responsable
                    </label>
                    <select
                      value={cabecera.tercero_id}
                      onChange={(e) =>
                        setCabecera({ ...cabecera, tercero_id: e.target.value })
                      }
                      className="w-full p-4 rounded-2xl border bg-white font-bold outline-none"
                    >
                      <option value="">Seleccionar Tercero...</option>
                      {terceros.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.nombre_completo || t.razon_social}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="border border-zinc-100 rounded-[2rem] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-zinc-50 p-4 font-black text-[10px] uppercase text-zinc-400">
                      <tr>
                        <th className="p-4 text-left">Cuenta PUC</th>
                        <th className="p-4 text-left">Tercero</th>
                        <th className="p-4 text-right">Débito</th>
                        <th className="p-4 text-right">Crédito</th>
                        <th className="p-4 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {lineas.map((linea, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <input
                              value={linea.cuenta_puc}
                              onChange={(e) =>
                                handleLineaChange(
                                  index,
                                  "cuenta_puc",
                                  e.target.value,
                                )
                              }
                              placeholder="110505"
                              className="w-full p-3 bg-zinc-50 rounded-xl outline-none text-sm font-bold"
                            />
                          </td>
                          <td className="p-2">
                            <select
                              value={linea.tercero_id}
                              onChange={(e) =>
                                handleLineaChange(
                                  index,
                                  "tercero_id",
                                  e.target.value,
                                )
                              }
                              className="w-full p-3 bg-zinc-50 rounded-xl outline-none text-sm font-bold"
                            >
                              <option value="">Seleccionar...</option>
                              {terceros.map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.nombre_completo || t.razon_social}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={linea.debito}
                              onChange={(e) =>
                                handleLineaChange(
                                  index,
                                  "debito",
                                  e.target.value,
                                )
                              }
                              className="w-full p-3 bg-zinc-50 rounded-xl text-right outline-none text-sm font-bold"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              value={linea.credito}
                              onChange={(e) =>
                                handleLineaChange(
                                  index,
                                  "credito",
                                  e.target.value,
                                )
                              }
                              className="w-full p-3 bg-zinc-50 rounded-xl text-right outline-none text-sm font-bold"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => eliminarLinea(index)}
                              className="p-2 text-red-300 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() =>
                      setLineas([
                        ...lineas,
                        {
                          cuenta_puc: "",
                          tercero_id: "",
                          debito: 0,
                          credito: 0,
                        },
                      ])
                    }
                    className="p-4 text-xs font-black text-[#D3AB80] hover:text-[#b38e65] flex items-center gap-2"
                  >
                    + AGREGAR LÍNEA
                  </button>
                </div>
              </div>
              <div className="p-8 bg-zinc-50/50 border-t flex justify-between items-center">
                <div className="flex gap-8">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-zinc-400 uppercase">
                      Total Débito
                    </p>
                    <p className="text-lg font-black text-[#D3AB80]">
                      {formatCurrency(sumas.debito)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-zinc-400 uppercase">
                      Total Crédito
                    </p>
                    <p className="text-lg font-black text-[#D3AB80]">
                      {formatCurrency(sumas.credito)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setModalStep(0)}
                    className="px-6 py-3 font-bold text-zinc-400"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleGuardar}
                    disabled={isSaving}
                    className="bg-[#472825] text-white px-10 py-3 rounded-2xl font-black shadow-xl hover:bg-black transition-all"
                  >
                    {isSaving ? "GUARDANDO..." : "GUARDAR NOTA"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* --- MODAL VISTA DETALLE (ARQUITECTO) --- */}
        {modalVerDetalle && notaSeleccionada && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#fdfbf9] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-zinc-100"
            >
              <div className="p-8 border-b flex justify-between items-center bg-[#fdfbf9]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#D3AB80]/10 rounded-2xl text-[#D3AB80]">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#472825] uppercase tracking-tighter">
                      Nota {notaSeleccionada.numero_nota}
                    </h2>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      {notaSeleccionada.fecha}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setModalVerDetalle(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                      Tercero Responsable
                    </p>
                    <p className="font-bold text-[#472825]">
                      {notaSeleccionada.terceros?.nombre_completo ||
                        notaSeleccionada.terceros?.razon_social}
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                      Concepto General
                    </p>
                    <p className="font-bold text-[#472825]">
                      {notaSeleccionada.concepto_general || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="border border-zinc-100 rounded-3xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-zinc-50 text-[10px] font-black uppercase text-zinc-400">
                      <tr>
                        <th className="p-4 text-left">Cuenta PUC</th>
                        <th className="p-4 text-right">Débito</th>
                        <th className="p-4 text-right">Crédito</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                      detallesVisualizar.map((det: any, idx: number) => (
                        <tr key={idx}>
                          <td className="p-4 text-sm font-bold text-[#472825]">
                            {det.cuenta_puc}
                          </td>
                          <td className="p-4 text-sm text-right font-medium">
                            {formatCurrency(det.debito)}
                          </td>
                          <td className="p-4 text-sm text-right font-medium">
                            {formatCurrency(det.credito)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-8 bg-zinc-50/50 border-t flex justify-end gap-12">
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase">
                    Total Débito
                  </p>
                  <p className="text-2xl font-black text-[#D3AB80]">
                    {formatCurrency(
                      detallesVisualizar.reduce((a, b) => a + (b.debito || 0), 0),
                    )}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase">
                    Total Crédito
                  </p>
                  <p className="text-2xl font-black text-[#D3AB80]">
                    {formatCurrency(
                      detallesVisualizar.reduce((a, b) => a + (b.credito || 0), 0),
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

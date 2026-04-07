"use client";
import { useState, useEffect } from "react";
import {
  Save,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../../../src/lib/supabaseClient";
import { updateDatosEmpresa } from "../../../../../src/actions/empresa";
import { useRouter } from "next/navigation";

export default function EmpresaPage() {
  const router = useRouter();
  const [empresaId, setEmpresaId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    tipoDocumento: "31 - NIT",
    identificacion: "900.123.456",
    dv: "4",
    razonSocial: "DOHA 18K SAS",
    nombreComercial: "",
    regimen: "Régimen Común",
    actividadEconomica: "",
    fechaActividad: "",
    direccion: "",
    departamento: "Antioquia",
    ciudad: "Medellín",
    barrio: "",
    telefono: "",
    telefono2: "",
    email: "",
    moneda: "Peso Colombiano",
    consecutivosAutomaticos: false,
    fechaConsecutivo: "",
    decimalesCantidades: 0,
    decimalesValores: 0,
    decimalesCompras: 2,
    decimalesVentas: 0,
    decimalesCartera: 0,
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const { data, error } = await supabase
          .from("empresa")
          .select("*")
          .limit(1)
          .single();

        if (error) {
          console.error("Error fetching empresa:", error.message);
          setIsLoading(false);
          return;
        }

        if (data) {
          setEmpresaId(data.id);
          setFormData({
            tipoDocumento: data.tipo_identificacion || "31 - NIT",
            identificacion: data.numero_identificacion || "",
            dv: data.dv || "",
            razonSocial: data.razon_social || "",
            nombreComercial: data.nombre_comercial || "",
            regimen: data.regimen || "Régimen Común",
            actividadEconomica: data.actividad_economica || "",
            fechaActividad: data.fecha_actividad ? data.fecha_actividad.split('T')[0] : "",
            direccion: data.direccion || "",
            departamento: data.departamento || "Antioquia",
            ciudad: data.ciudad || "Medellín",
            barrio: data.barrio || "",
            telefono: data.telefono || "",
            telefono2: data.telefono2 || "",
            email: data.email || "",
            moneda: data.moneda || "Peso Colombiano",
            consecutivosAutomaticos: data.consecutivos_automaticos || false,
            fechaConsecutivo: data.fecha_consecutivo ? data.fecha_consecutivo.split('T')[0] : "",
            decimalesCantidades: data.decimales_cantidades || 0,
            decimalesValores: data.decimales_valores || 0,
            decimalesCompras: data.decimales_compras || 0,
            decimalesVentas: data.decimales_ventas || 0,
            decimalesCartera: data.decimales_cartera || 0,
          });
        }
      } catch (err) {
        console.error("Exception fetching empresa:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmpresa();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Type narrowing to safely access checked
    if (type === "checkbox") {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({ ...formData, [name]: checked });
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empresaId) {
        console.error("No company ID found to update.");
        return;
    }

    setIsSaving(true);
    try {
      const response = await updateDatosEmpresa(formData, empresaId);
      if (response.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
        router.refresh();
      } else {
        console.error("Update failed:", response.error);
        alert("Hubo un error al guardar los cambios: " + response.error);
      }
    } catch (err) {
      console.error("Exception during update:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdfbf9] flex items-center justify-center">
        <div className="text-[#472825] font-medium">Cargando datos de la empresa...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf9] pb-24">
      {/* Contenedor central actualizado: max-w-5xl mx-auto w-full p-4 md:p-6 */}
      <div className="max-w-5xl mx-auto w-full p-4 md:p-6">

        {/* Encabezado con título y botón de guardar en la parte superior derecha */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Configuración Inicial /{" "}
              <span className="text-[#D3AB80] font-bold">Perfil de Empresa</span>
            </p>
            <h1 className="text-3xl font-black text-[#472825]">
              Configuración General de la Empresa
            </h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-[#D3AB80] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#b8956e] transition-colors flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>

        <AnimatePresence>
          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm"
            >
              <CheckCircle2 size={20} />
              <span className="text-sm font-bold">
                ¡Los datos de la empresa se han actualizado correctamente!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Tarjeta 1: Identificación Principal */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-[#472825] mb-4 border-b border-gray-100 pb-2">
              Identificación Principal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="flex flex-col gap-1 md:col-span-2 mb-2">
                 <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#D3AB80] hover:text-[#D3AB80] hover:bg-orange-50/50 transition-colors cursor-pointer group">
                  <UploadCloud
                    size={32}
                    className="mb-2 group-hover:-translate-y-1 transition-transform"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2">
                    Subir Logo
                  </span>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Tipo Identificación</label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                >
                  <option value="31 - NIT">31 - NIT</option>
                  <option value="13 - Cédula">13 - Cédula</option>
                </select>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1 col-span-3">
                  <label className="text-xs font-bold text-gray-500 uppercase">Número de Identificación</label>
                  <input
                    type="text"
                    name="identificacion"
                    value={formData.identificacion}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1 col-span-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">DV</label>
                  <input
                    type="text"
                    name="dv"
                    value={formData.dv}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors text-center"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Razón Social</label>
                <input
                  type="text"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Nombre Comercial / Descripción</label>
                <input
                  type="text"
                  name="nombreComercial"
                  value={formData.nombreComercial}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Régimen</label>
                <select
                  name="regimen"
                  value={formData.regimen}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                >
                  <option value="Régimen Común">Régimen Común</option>
                  <option value="Régimen Simplificado">Régimen Simplificado</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Actividad Económica</label>
                <input
                  type="text"
                  name="actividadEconomica"
                  value={formData.actividadEconomica}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Fecha de Actividad</label>
                <input
                  type="date"
                  name="fechaActividad"
                  value={formData.fechaActividad}
                  onChange={handleChange}
                  className="w-full md:w-1/2 bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Ubicación y Contacto */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-[#472825] mb-4 border-b border-gray-100 pb-2">
              Ubicación y Contacto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Departamento</label>
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                >
                  <option value="Antioquia">Antioquia</option>
                  <option value="Cundinamarca">Cundinamarca</option>
                  <option value="Valle del Cauca">Valle del Cauca</option>
                  {/* Más opciones se pueden agregar */}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Ciudad</label>
                <select
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                >
                  <option value="Medellín">Medellín</option>
                  <option value="Bogotá">Bogotá</option>
                  <option value="Cali">Cali</option>
                  {/* Más opciones se pueden agregar */}
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Barrio</label>
                <input
                  type="text"
                  name="barrio"
                  value={formData.barrio}
                  onChange={handleChange}
                  className="w-full md:w-1/2 bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Teléfono Principal</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Teléfono 2</label>
                <input
                  type="text"
                  name="telefono2"
                  value={formData.telefono2}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Moneda Principal</label>
                <select
                  name="moneda"
                  value={formData.moneda}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                >
                  <option value="Peso Colombiano">Peso Colombiano</option>
                  <option value="Dólar Estadounidense">Dólar Estadounidense</option>
                </select>
              </div>

            </div>
          </div>

          {/* Tarjeta 3: Configuración de Documentos */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-[#472825] mb-4 border-b border-gray-100 pb-2">
              Configuración de Documentos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-1 flex flex-col justify-center">
                <label className="flex items-center gap-2 text-sm font-medium text-[#472825] cursor-pointer">
                  <input
                    type="checkbox"
                    name="consecutivosAutomaticos"
                    checked={formData.consecutivosAutomaticos}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#D3AB80] cursor-pointer"
                  />
                  Maneja Consecutivos Automáticos
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Consecutivos a partir de</label>
                <input
                  type="date"
                  name="fechaConsecutivo"
                  value={formData.fechaConsecutivo}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

            </div>
          </div>

          {/* Tarjeta 4: Configuración de Decimales */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-[#472825] mb-4 border-b border-gray-100 pb-2">
              Configuración de Decimales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Cantidades</label>
                <input
                  type="number"
                  name="decimalesCantidades"
                  value={formData.decimalesCantidades}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Valores Generales</label>
                <input
                  type="number"
                  name="decimalesValores"
                  value={formData.decimalesValores}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Valores en Compras</label>
                <input
                  type="number"
                  name="decimalesCompras"
                  value={formData.decimalesCompras}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Valores en Ventas</label>
                <input
                  type="number"
                  name="decimalesVentas"
                  value={formData.decimalesVentas}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Valores en Cartera</label>
                <input
                  type="number"
                  name="decimalesCartera"
                  value={formData.decimalesCartera}
                  onChange={handleChange}
                  min="0"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-lg py-2 px-3 text-sm text-[#472825] outline-none transition-colors"
                />
              </div>

            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

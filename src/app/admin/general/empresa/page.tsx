"use client";
import { useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Percent,
  Save,
  UploadCloud,
  CheckCircle2,
  Hash,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmpresaPage() {
  const [formData, setFormData] = useState({
    razonSocial: "DOHA 18K S.A.S.",
    nombreComercial: "DOHA 18K",
    tipoDocumento: "31 - NIT",
    identificacion: "901234567",
    dv: "8",
    regimen: "Régimen Común (Responsable de IVA)",
    actividadEconomica: "4777",
    telefono: "+57 300 123 4567",
    email: "contacto@doha18k.com",
    direccion: "Centro Comercial Principal, Local 123",
    ciudad: "Medellín",
    departamento: "Antioquia",
    moneda: "COP",
    impuestoDefecto: "19",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-8 min-h-screen bg-[#fdfbf9] pb-24">
      {/* CONTENEDOR CENTRAL: Aquí agregamos mx-auto y max-w-5xl para centrar todo */}
      <div className="max-w-5xl mx-auto w-full">
        {/* Encabezado */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 mb-1">
            Configuración Inicial /{" "}
            <span className="text-[#D3AB80] font-bold">Perfil de Empresa</span>
          </p>
          <h1 className="text-3xl font-black text-[#472825]">
            Datos de la Empresa
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Configuración legal y tributaria para facturación y reportes.
          </p>
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
          {/* BLOQUE 1: Logo e Identidad Legal */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-3 w-full md:w-auto">
              <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#D3AB80] hover:text-[#D3AB80] hover:bg-orange-50/50 transition-colors cursor-pointer group">
                <UploadCloud
                  size={32}
                  className="mb-2 group-hover:-translate-y-1 transition-transform"
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2">
                  Subir Logo
                </span>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                  Razón Social
                </label>
                <div className="relative">
                  <Building2
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="razonSocial"
                    value={formData.razonSocial}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                  />
                </div>
              </div>

              {/* Documento, NIT y DV agrupados */}
              <div className="space-y-1.5 md:col-span-2 grid grid-cols-12 gap-3">
                <div className="col-span-12 sm:col-span-5">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                    Tipo Identificación
                  </label>
                  <select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                  >
                    <option value="31 - NIT">31 - NIT</option>
                    <option value="13 - Cédula">
                      13 - Cédula de Ciudadanía
                    </option>
                    <option value="42 - Extranjería">
                      42 - Documento Extranjero
                    </option>
                  </select>
                </div>
                <div className="col-span-9 sm:col-span-5">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                    Número
                  </label>
                  <div className="relative">
                    <FileText
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="identificacion"
                      value={formData.identificacion}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                    />
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                    DV
                  </label>
                  <input
                    type="text"
                    name="dv"
                    value={formData.dv}
                    onChange={handleChange}
                    maxLength={1}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE 2: Parámetros Legales y Contables */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
            <h2 className="md:col-span-2 text-lg font-bold text-[#472825] mb-2 border-b border-gray-100 pb-3">
              Parámetros Fiscales
            </h2>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                Régimen
              </label>
              <select
                name="regimen"
                value={formData.regimen}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
              >
                <option value="Régimen Común (Responsable de IVA)">
                  Régimen Común
                </option>
                <option value="Régimen Simplificado (No Responsable)">
                  Régimen Simplificado
                </option>
                <option value="No Contribuyente">No Contribuyente</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                Actividad Económica (CIIU)
              </label>
              <div className="relative">
                <Hash
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="actividadEconomica"
                  value={formData.actividadEconomica}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                  placeholder="Ej. 4777"
                />
              </div>
            </div>
          </div>

          {/* BLOQUE 3: Contacto y Ubicación */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5">
            <h2 className="md:col-span-2 text-lg font-bold text-[#472825] mb-2 border-b border-gray-100 pb-3">
              Información de Contacto
            </h2>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                Teléfono Principal
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
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
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                Departamento
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                Ciudad
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                />
              </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                Dirección Completa
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                />
              </div>
            </div>
          </div>

          {/* Botón Flotante / Fijo para Guardar */}
          <div className="fixed bottom-8 right-8 z-40">
            <button
              type="submit"
              className="bg-[#472825] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-black transition-all shadow-[0_8px_30px_rgba(71,40,37,0.4)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1 flex items-center gap-3 group"
            >
              <Save
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

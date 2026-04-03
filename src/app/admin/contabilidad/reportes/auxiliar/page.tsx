"use client";
import { ArrowLeft, Search, FileText, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AuxiliarReportePage() {
  const [cuentaContable, setCuentaContable] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Todos...");
  const [agrupadoTercero, setAgrupadoTercero] = useState("NO");
  const [agrupadoTerceroDoc, setAgrupadoTerceroDoc] = useState("NO");
  const [sucursal, setSucursal] = useState("Todos");
  const [centroCosto, setCentroCosto] = useState("Todos");
  const [moneda, setMoneda] = useState("COP - PESO COLOMBIANO");
  const [omitirCeros, setOmitirCeros] = useState("NO");
  const [decimales, setDecimales] = useState(1);
  const [cruceTipo, setCruceTipo] = useState("Texto");
  const [cruceNumero, setCruceNumero] = useState("Números");

  return (
    <div className="max-w-7xl mx-auto p-6 w-full min-h-screen" style={{ backgroundColor: "#fdfbf9", color: "#472825" }}>
      {/* Encabezado */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/contabilidad/reportes" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-black">Consulta de Auxiliares</h1>
          <p className="text-sm opacity-80 mt-1">Configuración y generación del reporte auxiliar contable</p>
        </div>
      </div>

      {/* Panel de Filtros */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 mb-6">
        <h2 className="text-lg font-bold mb-4 border-b border-zinc-100 pb-2">Filtros de Búsqueda</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {/* Fila 1 */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold mb-1">Cuenta Contable</label>
            <input
              type="text"
              list="cuentas-list"
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              placeholder="Ej: 110505 - CAJA GENERAL"
              value={cuentaContable}
              onChange={(e) => setCuentaContable(e.target.value)}
            />
            <datalist id="cuentas-list">
              <option value="110505 - CAJA GENERAL" />
              <option value="111005 - BANCOS NACIONALES" />
              <option value="130505 - CLIENTES NACIONALES" />
              <option value="220505 - PROVEEDORES NACIONALES" />
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fecha Desde</label>
            <input
              type="date"
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Fecha Hasta</label>
            <input
              type="date"
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
            />
          </div>

          {/* Fila 2 */}
          <div>
            <label className="block text-sm font-semibold mb-1">Tipo Documento</label>
            <select
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
              <option value="Todos...">Todos...</option>
              <option value="RC - RECIBO DE CAJA">RC - RECIBO DE CAJA</option>
              <option value="REM - REMISIÓN">REM - REMISIÓN</option>
              <option value="NC - NOTA CONTABLE">NC - NOTA CONTABLE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Agrupado en tercero</label>
            <select
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={agrupadoTercero}
              onChange={(e) => setAgrupadoTercero(e.target.value)}
            >
              <option value="NO">NO</option>
              <option value="SI">SI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Agrupado en tercero por doc.</label>
            <select
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={agrupadoTerceroDoc}
              onChange={(e) => setAgrupadoTerceroDoc(e.target.value)}
            >
              <option value="NO">NO</option>
              <option value="SI">SI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Sucursal</label>
            <select
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={sucursal}
              onChange={(e) => setSucursal(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Sede Medellín">Sede Medellín</option>
            </select>
          </div>

          {/* Fila 3 */}
          <div>
            <label className="block text-sm font-semibold mb-1">Centro de costo</label>
            <select
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={centroCosto}
              onChange={(e) => setCentroCosto(e.target.value)}
            >
              <option value="Todos">Todos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Moneda</label>
            <select
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
            >
              <option value="COP - PESO COLOMBIANO">COP - PESO COLOMBIANO</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Omitir Cuentas en 0</label>
            <select
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={omitirCeros}
              onChange={(e) => setOmitirCeros(e.target.value)}
            >
              <option value="NO">NO</option>
              <option value="SI">SI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Decimales</label>
            <input
              type="number"
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={decimales}
              onChange={(e) => setDecimales(Number(e.target.value))}
            />
          </div>

          {/* Fila 4 */}
          <div>
            <label className="block text-sm font-semibold mb-1">Cruce tipo</label>
            <input
              type="text"
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={cruceTipo}
              onChange={(e) => setCruceTipo(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Cruce número</label>
            <input
              type="text"
              className="w-full p-2 border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#D3AB80]"
              value={cruceNumero}
              onChange={(e) => setCruceNumero(e.target.value)}
            />
          </div>
          <div className="lg:col-span-2 flex items-end">
            <div className="flex gap-2 w-full">
              <div className="flex-1">
                 <label className="block text-sm font-semibold mb-1">Exportar</label>
                 <div className="flex gap-2">
                    <button
                      className="flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors w-12 h-10"
                      title="Exportar a PDF"
                    >
                      <FileText size={20} />
                    </button>
                    <button
                      className="flex items-center justify-center p-2 rounded-lg bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition-colors w-12 h-10"
                      title="Exportar a Excel"
                    >
                      <FileSpreadsheet size={20} />
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mb-8">
        <button className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5" style={{ backgroundColor: "#D3AB80" }}>
          <Search size={20} />
          Generar Reporte
        </button>
      </div>

      {/* Resultados Placeholder */}
      <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-12 flex items-center justify-center bg-zinc-50/50">
        <p className="text-zinc-400 font-medium text-lg">Los resultados del reporte se mostrarán aquí</p>
      </div>

    </div>
  );
}

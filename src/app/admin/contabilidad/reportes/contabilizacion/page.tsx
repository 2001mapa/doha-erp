"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileBarChart } from 'lucide-react';

export default function ContabilizacionPorTipoDocumento() {
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('Todos');
  const [tipoGrupo, setTipoGrupo] = useState('Agrupado en cuenta');
  const [tercero, setTercero] = useState('Todos');

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] p-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            href="/admin/contabilidad/reportes"
            className="mr-4 p-2 rounded hover:bg-gray-200 transition-colors"
            title="Volver"
          >
            <ArrowLeft className="w-6 h-6 text-[#472825]" />
          </Link>
          <h1 className="text-2xl font-bold">Contabilización Por Tipo de Documento</h1>
        </div>

        {/* Filter Panel */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Fecha Inicial */}
            <div className="flex flex-col">
              <label htmlFor="fechaInicial" className="text-sm font-semibold mb-1 text-[#472825]">
                Fecha Inicial
              </label>
              <input
                type="date"
                id="fechaInicial"
                value={fechaInicial}
                onChange={(e) => setFechaInicial(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
              />
            </div>

            {/* Fecha Final */}
            <div className="flex flex-col">
              <label htmlFor="fechaFinal" className="text-sm font-semibold mb-1 text-[#472825]">
                Fecha Final
              </label>
              <input
                type="date"
                id="fechaFinal"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
              />
            </div>

            {/* Tipo Documento */}
            <div className="flex flex-col">
              <label htmlFor="tipoDocumento" className="text-sm font-semibold mb-1 text-[#472825]">
                Tipo Documento
              </label>
              <select
                id="tipoDocumento"
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
              >
                <option value="Todos">Todos</option>
                <option value="AJT - AJUSTE DE INVENTARIO">AJT - AJUSTE DE INVENTARIO</option>
                <option value="CC - CIERRE CONTABLE">CC - CIERRE CONTABLE</option>
                <option value="DV - DEVOLUCION EN VENTA">DV - DEVOLUCION EN VENTA</option>
                <option value="RC - RECIBO DE CAJA">RC - RECIBO DE CAJA</option>
                <option value="REM - REMISION">REM - REMISION</option>
              </select>
            </div>

            {/* Tipo de grupo */}
            <div className="flex flex-col">
              <label htmlFor="tipoGrupo" className="text-sm font-semibold mb-1 text-[#472825]">
                Tipo de grupo
              </label>
              <select
                id="tipoGrupo"
                value={tipoGrupo}
                onChange={(e) => setTipoGrupo(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
              >
                <option value="Agrupado en cuenta">Agrupado en cuenta</option>
                <option value="Agrupado en documento">Agrupado en documento</option>
              </select>
            </div>

            {/* Tercero */}
            <div className="flex flex-col">
              <label htmlFor="tercero" className="text-sm font-semibold mb-1 text-[#472825]">
                Tercero
              </label>
              <select
                id="tercero"
                value={tercero}
                onChange={(e) => setTercero(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#D3AB80]"
              >
                <option value="Todos">Todos</option>
                <option value="901393219 - EMPOWER BEAUTY CLINIC">901393219 - EMPOWER BEAUTY CLINIC</option>
                <option value="10203040 - CAMILO SHOP">10203040 - CAMILO SHOP</option>
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="bg-[#D3AB80] hover:bg-[#b89570] text-white font-medium py-2 px-6 rounded-md flex items-center transition-colors"
            >
              <FileBarChart className="w-5 h-5 mr-2" />
              Generar
            </button>
          </div>
        </div>

        {/* Results Area */}
        <div className="bg-white rounded-lg p-12 border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[300px]">
          <p className="text-gray-400 text-center max-w-md">
            Seleccione los filtros y presione Generar para visualizar la contabilización de los documentos.
          </p>
        </div>
      </div>
    </div>
  );
}

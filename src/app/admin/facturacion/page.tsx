"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  Search,
  RotateCcw,
  ClipboardList,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function FacturacionDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-[#fdfbf9] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#472825]">
          Módulo de Facturación
        </h1>
        <p className="text-[#472825]/70 mt-2">
          Gestión integral de ventas, devoluciones y reportes
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Facturas */}
        <motion.div variants={itemVariants}>
          <Link href="/admin/facturacion/facturas">
            <div className="bg-white rounded-2xl p-6 h-full shadow-sm border border-[#D3AB80]/20 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col justify-between cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#D3AB80]/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdfbf9] border border-[#D3AB80]/30 flex items-center justify-center text-[#D3AB80] mb-4 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#472825] mb-2">
                  Facturas
                </h3>
                <p className="text-[#472825]/70 text-sm">
                  Gestionar y crear facturas de venta de joyas
                </p>
              </div>
              <div className="mt-6 flex items-center text-[#D3AB80] text-sm font-medium">
                Acceder <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Buscador */}
        <motion.div variants={itemVariants}>
          <Link href="/admin/facturacion/buscador">
            <div className="bg-white rounded-2xl p-6 h-full shadow-sm border border-[#D3AB80]/20 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col justify-between cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#D3AB80]/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdfbf9] border border-[#D3AB80]/30 flex items-center justify-center text-[#D3AB80] mb-4 group-hover:scale-110 transition-transform">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#472825] mb-2">
                  Buscador
                </h3>
                <p className="text-[#472825]/70 text-sm">
                  Búsqueda global de documentos y transacciones
                </p>
              </div>
              <div className="mt-6 flex items-center text-[#D3AB80] text-sm font-medium">
                Acceder <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Devoluciones */}
        <motion.div variants={itemVariants}>
          <Link href="/admin/facturacion/devoluciones">
            <div className="bg-white rounded-2xl p-6 h-full shadow-sm border border-[#D3AB80]/20 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col justify-between cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#D3AB80]/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdfbf9] border border-[#D3AB80]/30 flex items-center justify-center text-[#D3AB80] mb-4 group-hover:scale-110 transition-transform">
                  <RotateCcw size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#472825] mb-2">
                  Devoluciones
                </h3>
                <p className="text-[#472825]/70 text-sm">
                  Registrar devoluciones de clientes
                </p>
              </div>
              <div className="mt-6 flex items-center text-[#D3AB80] text-sm font-medium">
                Acceder <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Notas Débito */}
        <motion.div variants={itemVariants}>
          <Link href="/admin/facturacion/notas-debito">
            <div className="bg-white rounded-2xl p-6 h-full shadow-sm border border-[#D3AB80]/20 hover:shadow-md hover:border-[#D3AB80] transition-all group flex flex-col justify-between cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#D3AB80]/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdfbf9] border border-[#D3AB80]/30 flex items-center justify-center text-[#D3AB80] mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardList size={24} />
                </div>
                <h3 className="text-xl font-semibold text-[#472825] mb-2">
                  Notas Débito
                </h3>
                <p className="text-[#472825]/70 text-sm">
                  Ajustes de saldo a cargo del cliente
                </p>
              </div>
              <div className="mt-6 flex items-center text-[#D3AB80] text-sm font-medium">
                Acceder <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Reportes */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl p-6 h-full shadow-sm border border-[#D3AB80]/20 transition-all group flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-[#D3AB80]/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#fdfbf9] border border-[#D3AB80]/30 flex items-center justify-center text-[#D3AB80] mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#472825] mb-2">
                Reportes
              </h3>
              <p className="text-[#472825]/70 text-sm">
                Acceso a Cuadre Diario y Utilidad Bruta
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <Link href="/admin/facturacion/reportes/cuadre">
                <div className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#fdfbf9] border border-transparent hover:border-[#D3AB80]/30 transition-colors flex items-center justify-between group/btn">
                  <span className="text-[#472825] text-sm font-medium">Cuadre Diario</span>
                  <ArrowRight size={14} className="text-[#D3AB80] opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                </div>
              </Link>
              <Link href="/admin/facturacion/reportes/utilidad">
                <div className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#fdfbf9] border border-transparent hover:border-[#D3AB80]/30 transition-colors flex items-center justify-between group/btn">
                  <span className="text-[#472825] text-sm font-medium">Utilidad Bruta</span>
                  <ArrowRight size={14} className="text-[#D3AB80] opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

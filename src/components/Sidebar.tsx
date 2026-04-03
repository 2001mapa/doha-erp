"use client";
import { useState } from "react";
import {
  Settings,
  Building2,
  UserPlus,
  ShieldCheck,
  Package,
  Users,
  UserCheck,
  FileText,
  Wallet,
  Wallet2,
  Tag,
  CalendarDays,
  ClipboardList,
  Receipt,
  ChevronDown,
  Book,
  Hash,
  BarChart3,
  CircleDot,
  ChevronLeft,
  ShoppingBag,
  LogOut,
  Undo2,
  CircleDollarSign,
  ClipboardCheck,
  Search,
  FileSpreadsheet,
  Boxes,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "../context/AdminAuthContext";

const menuItems = [
  {
    name: "General",
    icon: <Settings size={20} />,
    subItems: [
      {
        name: "Creación de Usuarios",
        icon: <UserPlus size={16} />,
        href: "/admin/general/usuarios",
      },
      {
        name: "Tipo de Usuarios",
        icon: <ShieldCheck size={16} />,
        href: "/admin/general/roles",
      },
      {
        name: "Datos de Empresa",
        icon: <Building2 size={16} />,
        href: "/admin/general/empresa",
      },
    ],
  },
  {
    name: "Productos",
    icon: <Package size={20} />,
    subItems: [
      {
        name: "Catálogo",
        icon: <ShoppingBag size={16} />,
        href: "/admin/productos",
      },
      { name: "Unidades", href: "/admin/productos/unidades" },
      { name: "Categoría", href: "/admin/productos/categoria" },
      { name: "Bodegas", href: "/admin/productos/bodegas" },
      {
        name: "Clasificación Contable",
        href: "/admin/productos/clasificacion",
      },
    ],
  },
  {
    name: "Gestión de Terceros",
    icon: <Users size={20} />,
    subItems: [
      {
        name: "Terceros",
        icon: <Users size={16} />,
        href: "/admin/terceros/general",
      },
      {
        name: "Vendedores",
        icon: <UserCheck size={16} />,
        href: "/admin/terceros/vendedores",
      },
    ],
  },
  {
    name: "Contabilidad",
    icon: <Book size={20} />,
    subItems: [
      {
        name: "Notas contables",
        icon: <ClipboardList size={16} />,
        href: "/admin/contabilidad/notas",
      },
      {
        name: "PUC",
        icon: <Hash size={16} />,
        href: "/admin/contabilidad/puc",
      },
      {
        name: "Reportes",
        icon: <BarChart3 size={16} />,
        href: "/admin/contabilidad/reportes", // Ruta verificada
      },
    ],
  },
  {
    name: "Cartera",
    icon: <Wallet size={20} />,
    subItems: [
      {
        name: "Conceptos",
        icon: <Tag size={16} />,
        href: "/admin/cartera/conceptos",
      },
      {
        name: "Formas de pago",
        icon: <Wallet2 size={16} />,
        href: "/admin/cartera/formas-pago",
      },
      {
        name: "Recibos",
        icon: <Receipt size={16} />,
        href: "/admin/cartera/recibos",
      },
      {
        name: "Edades",
        icon: <CalendarDays size={16} />,
        href: "/admin/cartera/edades",
      },
    ]
  },
  {
    name: "Inventario",
    icon: <ClipboardList size={20} />,
    subItems: [
      {
        name: "Compras",
        icon: <ShoppingCart size={16} />,
        href: "/admin/inventario/compras",
      },
      {
        name: "Devoluciones",
        icon: <Undo2 size={16} />,
        href: "/admin/inventario/devoluciones",
      },
      {
        name: "Costo Producto",
        icon: <CircleDollarSign size={16} />,
        href: "/admin/inventario/costo",
      },
      {
        name: "Inventario Físico",
        icon: <ClipboardCheck size={16} />,
        href: "/admin/inventario/fisico",
      },
      {
        name: "Consulta Unidades",
        icon: <Search size={16} />,
        href: "/admin/inventario/consulta",
      },
      {
        name: "Kardex",
        icon: <FileSpreadsheet size={16} />,
        href: "/admin/inventario/kardex",
      },
    ],
  },
  {
    name: "Facturación",
    icon: <Receipt size={20} />,
    subItems: [
      {
        name: "Punto de Venta",
        icon: <ShoppingBag size={16} />,
        href: "/admin/pos",
      },
      {
        name: "Remisiones",
        icon: <Receipt size={16} />,
        href: "/admin/pos/remisiones",
      },
    ],
  },
];

export const DohaSidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAdminAuth();

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  // Definimos las transiciones comunes para sincronizar perfectamente botón y panel
  const transitionClass =
    "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";

  const filteredMenuItems = menuItems.filter(item => {
    if (user?.rol === "Vendedor") {
      // Requisito estricto: Todo el bloque de "Gestión de Terceros" debe estar oculto
      if (item.name === "Gestión de Terceros") return false;
      // Seguridad: Módulo "Contabilidad" oculto para el rol Vendedor
      if (item.name === "Contabilidad") return false;
      if (item.name === "Cartera") return false;
      if (item.name === "Inventario") return false;

      return item.name === "Facturación";
    }
    return true; // Administrador y Supervisor ven todo
  });

  return (
    <>
      {/* --- BOTÓN FLOTANTE CON FLECHA --- */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-[60] ${transitionClass}`}
        style={{
          left: isSidebarOpen ? "288px" : "20px",
        }}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          {/* Efecto de brillo */}
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Ícono animado */}
          <div
            className={`relative transition-transform duration-500 ${isSidebarOpen ? "rotate-180" : "rotate-0"}`}
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="text-white" />
          </div>

          {/* Anillo de pulso */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-ping opacity-0 group-hover:opacity-100" />
        </button>
      </div>

      {/* OVERLAY OSCURO (Suave backdrop-blur) */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* MENÚ LATERAL DESLIZABLE */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col text-white shadow-2xl z-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 px-2 flex items-center justify-between">
          <h1 className="text-2xl font-black bg-linear-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
            DOHA 18K
          </h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-none">
          {filteredMenuItems.map((item) => (
            <div key={item.name} className="group">
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="w-full flex items-center justify-between p-3 rounded-xl transition-all text-zinc-100 hover:bg-white/10 hover:text-amber-500 focus:bg-amber-500/10 focus:text-amber-500"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-semibold text-sm">{item.name}</span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-all duration-200 ${
                        openSubmenu === item.name
                          ? "opacity-100 rotate-180 text-amber-500"
                          : "opacity-0 group-hover:opacity-100 text-zinc-400"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openSubmenu === item.name ? "max-h-60 mt-1" : "max-h-0"}`}
                  >
                    <div className="flex flex-col pl-9 pr-3 space-y-1 border-l-2 border-zinc-800 ml-3">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <span className="flex items-center gap-2.5 py-2.5 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors">
                            {"icon" in sub ? sub.icon : <CircleDot size={8} />}
                            {sub.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={("href" in item ? item.href : "#") as string} onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl transition-all text-zinc-100 hover:bg-white/10 hover:text-amber-500 focus:bg-amber-500/10 focus:text-amber-500">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-semibold text-sm">{item.name}</span>
                    </div>
                  </button>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {user && (
          <div className="mt-auto pt-6 border-t border-zinc-800">
            <div className="mb-4 px-2">
              <p className="text-sm font-bold text-white">{user.nombre}</p>
              <p className="text-xs text-zinc-400">{user.rol}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-between p-3 rounded-xl transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300 focus:bg-red-500/10 focus:text-red-300"
            >
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <span className="font-semibold text-sm">Cerrar Sesión</span>
              </div>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default DohaSidebar;

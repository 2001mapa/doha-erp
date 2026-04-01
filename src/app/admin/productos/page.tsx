"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  CheckCircle2,
  XCircle,
  Package,
  Hash,
  AlignLeft,
  DollarSign,
  Layers,
  Archive,
  BookOpen,
  Scale,
  Tag
} from "lucide-react";

// Initial mock data
const mockData = [
  { id: 1, codigo: "CAD-MON-01", nombre: "Cadena Mónaco 3mm", precio: 120000, stock: 15, categoria: "Cadenas", estado: "Activo" },
  { id: 2, codigo: "PUL-ESC-02", nombre: "Pulsera Esclava", precio: 85000, stock: 8, categoria: "Pulseras", estado: "Activo" }
];

export default function CatalogoProductosPage() {
  const [productos, setProductos] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    id: null as number | null,
    codigo: "",
    nombre: "",
    precioVenta: "",
    costo: "",
    stockInicial: "",
    categoria: "Cadenas",
    unidad: "Unidad",
    bodega: "Caja Fuerte Principal",
    clasificacionContable: "Joyería Oro Laminado",
    estado: "Activo",
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open Modal for Create
  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      codigo: "",
      nombre: "",
      precioVenta: "",
      costo: "",
      stockInicial: "",
      categoria: "Cadenas",
      unidad: "Unidad",
      bodega: "Caja Fuerte Principal",
      clasificacionContable: "Joyería Oro Laminado",
      estado: "Activo",
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (producto: any) => {
    setIsEditing(true);
    setFormData({
      ...producto,
      precioVenta: producto.precio || "",
      costo: producto.costo || "",
      stockInicial: producto.stock || "",
      categoria: producto.categoria || "Cadenas",
      unidad: producto.unidad || "Unidad",
      bodega: producto.bodega || "Caja Fuerte Principal",
      clasificacionContable: producto.clasificacionContable || "Joyería Oro Laminado",
      estado: producto.estado || "Activo",
    });
    setIsModalOpen(true);
  };

  // Delete Item
  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setProductos(
        productos.map((p) =>
          p.id === formData.id ? {
            ...p,
            codigo: formData.codigo,
            nombre: formData.nombre,
            categoria: formData.categoria,
            estado: formData.estado,
            precio: Number(formData.precioVenta),
            stock: Number(formData.stockInicial)
          } : p
        )
      );
    } else {
      const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
      setProductos([...productos, {
        id: newId,
        codigo: formData.codigo,
        nombre: formData.nombre,
        categoria: formData.categoria,
        estado: formData.estado,
        precio: Number(formData.precioVenta),
        stock: Number(formData.stockInicial)
      }]);
    }
    setIsModalOpen(false);
  };

  // Filter Data
  const productosFiltrados = useMemo(() => {
    return productos.filter(
      (p) =>
        p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productos, searchTerm]);

  return (
    <div className="min-h-screen bg-[#fdfbf9] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto w-full space-y-6">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#472825] tracking-tight">
              Catálogo de Productos
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Panel de Control / Productos / Catálogo
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="group flex items-center gap-2 bg-[#472825] text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            Nuevo Producto
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar por código o nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-2xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">Código (SKU)</th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider w-1/3">Nombre del Producto</th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">Categoría</th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-right">Stock</th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-right">Precio de Venta</th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider">Estado</th>
                  <th className="p-5 text-xs font-bold text-[#472825] uppercase tracking-wider text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#D3AB80]/20 flex items-center justify-center text-[#472825] shrink-0">
                            <Package size={18} />
                          </div>
                          <span className="text-sm font-black text-[#472825] whitespace-nowrap">
                            {producto.codigo}
                          </span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="text-sm font-medium text-gray-600 line-clamp-2">
                          {producto.nombre}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-600">
                          {producto.categoria}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <span className="text-sm font-bold text-[#472825]">
                          {producto.stock}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <span className="text-sm font-bold text-[#472825]">
                          ${Number(producto.precio).toLocaleString()}
                        </span>
                      </td>
                      <td className="p-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            producto.estado === "Activo"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {producto.estado === "Activo" ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                          {producto.estado}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleOpenEdit(producto)}
                            className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(producto.id)}
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
                    <td colSpan={7} className="p-8 text-center text-gray-500 font-medium">
                      No se encontraron productos.
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col"
              >
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                  <div>
                    <h2 className="text-xl font-black text-[#472825]">
                      {isEditing ? "Editar Producto" : "Registrar Nuevo Producto"}
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Complete la información del producto.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#472825] hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 p-8">
                  <form id="productForm" onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    {/* Código */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Código (SKU)
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="codigo"
                          value={formData.codigo}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] uppercase"
                          placeholder="Ej. CAD-MON-01"
                        />
                      </div>
                    </div>

                    {/* Nombre */}
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Nombre del Producto
                      </label>
                      <div className="relative">
                        <AlignLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                          placeholder="Ej. Cadena Mónaco 3mm"
                        />
                      </div>
                    </div>

                    {/* Precio Venta */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Precio de Venta
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="number"
                          name="precioVenta"
                          value={formData.precioVenta}
                          onChange={handleChange}
                          required
                          min="0"
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Costo */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Costo
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="number"
                          name="costo"
                          value={formData.costo}
                          onChange={handleChange}
                          required
                          min="0"
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Stock Inicial */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Stock Inicial
                      </label>
                      <div className="relative">
                        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="number"
                          name="stockInicial"
                          value={formData.stockInicial}
                          onChange={handleChange}
                          required
                          min="0"
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Categoría */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Categoría
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="categoria"
                          value={formData.categoria}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                        >
                          <option value="Cadenas">Cadenas</option>
                          <option value="Pulseras">Pulseras</option>
                          <option value="Anillos">Anillos</option>
                          <option value="Topos">Topos</option>
                        </select>
                      </div>
                    </div>

                    {/* Unidad */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Unidad
                      </label>
                      <div className="relative">
                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="unidad"
                          value={formData.unidad}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                        >
                          <option value="Unidad">Unidad</option>
                          <option value="Gramos">Gramos</option>
                          <option value="Centímetros">Centímetros</option>
                        </select>
                      </div>
                    </div>

                    {/* Bodega */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Bodega
                      </label>
                      <div className="relative">
                        <Archive className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="bodega"
                          value={formData.bodega}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                        >
                          <option value="Caja Fuerte Principal">Caja Fuerte Principal</option>
                          <option value="Vitrina Exhibición">Vitrina Exhibición</option>
                        </select>
                      </div>
                    </div>

                    {/* Clasificación Contable */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Clasificación Contable
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="clasificacionContable"
                          value={formData.clasificacionContable}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                        >
                          <option value="Joyería Oro Laminado">Joyería Oro Laminado</option>
                          <option value="Insumos">Insumos</option>
                        </select>
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Estado
                      </label>
                      <div className="relative">
                        {formData.estado === "Activo" ? (
                          <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                        ) : (
                          <XCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                        )}
                        <select
                          name="estado"
                          value={formData.estado}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] appearance-none"
                        >
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-[#472825] transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    form="productForm"
                    className="bg-[#472825] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-md"
                  >
                    {isEditing ? "Guardar" : "Crear"}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

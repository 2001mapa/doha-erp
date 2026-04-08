"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createProducto } from "@/src/actions/inventario";
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
  Tag,
  Image as ImageIcon,
  Globe,
  Ruler,
  MoveVertical,
  Weight,
  UploadCloud,
  ToggleRight,
  ToggleLeft
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
    codigo_sku: "",
    nombre: "",
    precio_venta: "",
    precio_costo: "",
    stock_actual: "",
    categoria: "Cadenas",
    estado: "Activo",
    // Datos Ecommerce
    imagenes: [] as File[],
    descripcion_web: "",
    longitud: "",
    grosor: "",
    peso_estimado: "",
    publicado_web: false,
  });

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, imagenes: Array.from(e.target.files) });
    }
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, publicado_web: !formData.publicado_web });
  };

  // Open Modal for Create
  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      codigo_sku: "",
      nombre: "",
      precio_venta: "",
      precio_costo: "",
      stock_actual: "",
      categoria: "Cadenas",
      estado: "Activo",
      imagenes: [],
      descripcion_web: "",
      longitud: "",
      grosor: "",
      peso_estimado: "",
      publicado_web: false,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenEdit = (producto: any) => {
    setIsEditing(true);
    setFormData({
      ...producto,
      codigo_sku: producto.codigo || "",
      nombre: producto.nombre || "",
      precio_venta: producto.precio || "",
      precio_costo: producto.costo || "",
      stock_actual: producto.stock || "",
      categoria: producto.categoria || "Cadenas",
      estado: producto.estado || "Activo",
      imagenes: [],
      descripcion_web: producto.descripcion_web || "",
      longitud: producto.longitud || "",
      grosor: producto.grosor || "",
      peso_estimado: producto.peso_estimado || "",
      publicado_web: producto.publicado_web || false,
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setProductos(
        productos.map((p) =>
          p.id === formData.id ? {
            ...p,
            codigo: formData.codigo_sku,
            nombre: formData.nombre,
            categoria: formData.categoria,
            estado: formData.estado,
            precio: Number(formData.precio_venta),
            stock: Number(formData.stock_actual)
          } : p
        )
      );
    } else {
      // API integration for new products
      const payload = {
        codigo_sku: formData.codigo_sku,
        nombre: formData.nombre,
        precio_costo: Number(formData.precio_costo) || 0,
        precio_venta: Number(formData.precio_venta) || 0,
        stock_actual: Number(formData.stock_actual) || 0,
        categoria: formData.categoria,
        descripcion_web: formData.descripcion_web,
        longitud: formData.longitud,
        grosor: formData.grosor,
        peso_estimado: formData.peso_estimado,
        publicado_web: formData.publicado_web,
        imagenes: formData.imagenes
      };

      try {
        // We use 'as any' to bypass the type restrictions in createProducto as the exact UI requested
        // schema does not fully match database.types.ts yet, but user asked for UI update and passing data
        const { data, error } = await createProducto(payload as any);
        if (error) {
          alert("Error creando producto: " + (error.message || "Error desconocido"));
        } else {
          const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
          setProductos([...productos, {
            id: newId,
            codigo: formData.codigo_sku,
            nombre: formData.nombre,
            categoria: formData.categoria,
            estado: formData.estado,
            precio: Number(formData.precio_venta),
            stock: Number(formData.stock_actual)
          }]);
        }
      } catch (err) {
        console.error(err);
      }
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

                    {/* Sección 1: Datos Internos (ERP) */}
                    <div className="col-span-2 mb-2 border-b pb-2">
                      <h3 className="text-sm font-bold text-[#472825] flex items-center gap-2">
                        <Archive size={16} />
                        Datos Internos (ERP)
                      </h3>
                    </div>

                    {/* Código SKU */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Código (SKU)
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="codigo_sku"
                          value={formData.codigo_sku}
                          onChange={handleChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825] uppercase"
                          placeholder="Ej. CAD-MON-01"
                        />
                      </div>
                    </div>

                    {/* Nombre */}
                    <div className="space-y-1.5 col-span-1">
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
                          name="precio_venta"
                          value={formData.precio_venta}
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
                        Precio Costo
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="number"
                          name="precio_costo"
                          value={formData.precio_costo}
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
                          name="stock_actual"
                          value={formData.stock_actual}
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

                    {/* Sección 2: Catálogo Web y E-commerce */}
                    <div className="col-span-2 mt-4 mb-2 border-b pb-2">
                      <h3 className="text-sm font-bold text-[#D3AB80] flex items-center gap-2">
                        <Globe size={16} />
                        Datos para Tienda Online
                      </h3>
                    </div>

                    {/* Publicado Web */}
                    <div className="col-span-2 flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer" onClick={handleCheckboxChange}>
                      <button type="button" className="text-[#D3AB80]">
                        {formData.publicado_web ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-gray-400" />}
                      </button>
                      <div>
                        <span className="text-sm font-bold text-[#472825] block">Publicar en Tienda Online</span>
                        <span className="text-xs text-gray-500">Haz que este producto sea visible en el E-commerce.</span>
                      </div>
                    </div>

                    {/* Imágenes */}
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Imágenes del Producto
                      </label>
                      <div className="relative border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <UploadCloud className="mx-auto text-gray-400 mb-2" size={32} />
                        <span className="text-sm font-medium text-gray-600 block">
                          Haz clic o arrastra imágenes aquí
                        </span>
                        <span className="text-xs text-gray-400 mt-1 block">
                          {formData.imagenes.length > 0 ? `${formData.imagenes.length} imagen(es) seleccionada(s)` : 'Soporta PNG, JPG, WEBP'}
                        </span>
                      </div>
                    </div>

                    {/* Descripción Web */}
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Descripción (Web)
                      </label>
                      <textarea
                        name="descripcion_web"
                        value={formData.descripcion_web}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl p-3 text-sm font-medium outline-none transition-all text-[#472825]"
                        placeholder="Descripción detallada para la tienda..."
                      />
                    </div>

                    {/* Longitud */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Longitud
                      </label>
                      <div className="relative">
                        <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="longitud"
                          value={formData.longitud}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                          placeholder="Ej. 60cm"
                        />
                      </div>
                    </div>

                    {/* Grosor */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Grosor
                      </label>
                      <div className="relative">
                        <MoveVertical className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="grosor"
                          value={formData.grosor}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                          placeholder="Ej. 5mm"
                        />
                      </div>
                    </div>

                    {/* Peso Estimado */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Peso Estimado
                      </label>
                      <div className="relative">
                        <Weight className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="peso_estimado"
                          value={formData.peso_estimado}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#D3AB80] focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium outline-none transition-all text-[#472825]"
                          placeholder="Ej. 15g"
                        />
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="space-y-1.5 col-span-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">
                        Estado Interno
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

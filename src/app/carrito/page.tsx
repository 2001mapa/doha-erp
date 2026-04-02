"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Plus, Minus, Trash2, MapPin, CreditCard } from "lucide-react";

type Product = {
  id: number;
  nombre: string;
  atributo: string;
  precio: number;
  cantidad: number;
  imagen: string;
};

type FormErrors = {
  nombre?: string;
  documento?: string;
  direccion?: string;
  ciudad?: string;
  telefono?: string;
};

export default function CarritoPage() {
  const [productos, setProductos] = useState<Product[]>([
    {
      id: 1,
      nombre: "Cadena Mónaco 3mm",
      atributo: "Largo: 45cm",
      precio: 60000,
      cantidad: 2,
      imagen: "/placeholder.jpg",
    },
    {
      id: 2,
      nombre: "Pulsera Esclava",
      atributo: "Talla: Única",
      precio: 45000,
      cantidad: 1,
      imagen: "/placeholder.jpg",
    },
    {
      id: 3,
      nombre: "Anillo Sello de Oro",
      atributo: "Talla: 8",
      precio: 80000,
      cantidad: 1,
      imagen: "/placeholder.jpg",
    },
  ]);

  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleQuantityChange = (id: number, delta: number) => {
    setProductos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nuevaCantidad = p.cantidad + delta;
          return { ...p, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
        }
        return p;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.nombre || formData.nombre.length < 3) {
      newErrors.nombre = "El nombre completo debe tener al menos 3 caracteres.";
    }
    if (!formData.documento || !/^[0-9]+$/.test(formData.documento)) {
      newErrors.documento = "El documento debe contener solo números.";
    }
    if (!formData.direccion) {
      newErrors.direccion = "La dirección de entrega es requerida.";
    }
    if (!formData.ciudad) {
      newErrors.ciudad = "La ciudad es requerida.";
    }
    if (!formData.telefono || !/^[0-9]+$/.test(formData.telefono) || formData.telefono.length < 10) {
      newErrors.telefono = "El teléfono debe ser un número válido de al menos 10 dígitos.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process payment
    alert("Redirigiendo a pasarela de pago...");
  };

  // Math Logic
  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const totalArticulos = productos.reduce((acc, p) => acc + p.cantidad, 0);

  const descuento = totalArticulos >= 6 ? subtotal * 0.1 : 0;

  let envio = 0;
  if (subtotal > 150000) {
    envio = 0;
  } else if (subtotal > 0) {
    envio = 15000;
  }

  const totalPago = subtotal - descuento + envio;

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] py-10">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Resumen de Artículos</h2>
            {productos.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              productos.map((producto) => (
                <div key={producto.id} className="flex flex-col sm:flex-row items-center gap-4 border-b border-[#e6dfd8] pb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <div className="text-gray-400 text-xs">IMG</div>
                  </div>
                  <div className="flex-1 w-full text-center sm:text-left">
                    <h3 className="font-semibold text-lg">{producto.nombre}</h3>
                    <p className="text-sm text-[#8a726f]">{producto.atributo}</p>
                    <p className="font-bold mt-1 text-[#D3AB80]">${(producto.precio * producto.cantidad).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="flex items-center border border-[#e6dfd8] rounded">
                      <button onClick={() => handleQuantityChange(producto.id, -1)} className="p-2 hover:bg-[#f5f1ec] transition text-[#472825]">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{producto.cantidad}</span>
                      <button onClick={() => handleQuantityChange(producto.id, 1)} className="p-2 hover:bg-[#f5f1ec] transition text-[#472825]">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => handleRemoveItem(producto.id)} className="text-red-500 hover:text-red-700 transition flex items-center text-sm mt-1">
                      <Trash2 className="w-4 h-4 mr-1" /> Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e6dfd8]">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D3AB80]" /> Envío y Facturación
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 mb-8" noValidate>
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] bg-[#fdfbf9] ${errors.nombre ? 'border-red-500' : 'border-[#e6dfd8]'}`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Documento de Identidad</label>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                    className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] bg-[#fdfbf9] ${errors.documento ? 'border-red-500' : 'border-[#e6dfd8]'}`}
                    placeholder="123456789"
                  />
                  {errors.documento && <p className="text-red-500 text-xs mt-1">{errors.documento}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dirección de Entrega</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] bg-[#fdfbf9] ${errors.direccion ? 'border-red-500' : 'border-[#e6dfd8]'}`}
                    placeholder="Calle 123 #45-67"
                  />
                  {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] bg-[#fdfbf9] ${errors.ciudad ? 'border-red-500' : 'border-[#e6dfd8]'}`}
                      placeholder="Ciudad"
                    />
                    {errors.ciudad && <p className="text-red-500 text-xs mt-1">{errors.ciudad}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D3AB80] bg-[#fdfbf9] ${errors.telefono ? 'border-red-500' : 'border-[#e6dfd8]'}`}
                      placeholder="3001234567"
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                  </div>
                </div>
              </form>

              <hr className="border-[#e6dfd8] my-6" />

              <div className="space-y-3">
                <h3 className="font-semibold text-lg mb-4">Resumen Financiero</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8a726f]">Subtotal ({totalArticulos} artículos)</span>
                  <span className="font-medium">${subtotal.toLocaleString()}</span>
                </div>

                {descuento > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-medium bg-green-50 p-2 rounded">
                    <span>Descuento por volumen (10%)</span>
                    <span>-${descuento.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-[#8a726f]">Envío</span>
                  {envio === 0 ? (
                    <span className="text-[#D3AB80] font-bold">¡Gratis!</span>
                  ) : (
                    <span className="font-medium">${envio.toLocaleString()}</span>
                  )}
                </div>

                <div className="border-t border-[#e6dfd8] pt-4 mt-4 flex justify-between items-center">
                  <span className="font-bold text-lg">Total a Pagar</span>
                  <span className="font-bold text-2xl text-[#472825]">${totalPago.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mt-8 bg-[#D3AB80] hover:bg-[#b8956e] text-white py-3.5 px-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <CreditCard className="w-5 h-5" /> Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Plus, Minus, Trash2, MapPin, CreditCard } from "lucide-react";
import { useCart } from "../../context/CartContext";

type FormErrors = {
  nombre?: string;
  documento?: string;
  direccion?: string;
  ciudad?: string;
  telefono?: string;
};

export default function CarritoPage() {
  const { cartItems: productos, updateQuantity: handleQuantityChange, removeFromCart: handleRemoveItem } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

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

  const isFormValid = formData.nombre.length >= 3 &&
                      /^[0-9]+$/.test(formData.documento) &&
                      formData.direccion.length > 0 &&
                      formData.ciudad.length > 0 &&
                      /^[0-9]{10,}$/.test(formData.telefono);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] py-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Carrito de Compras</h1>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="w-full lg:col-span-7 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Resumen de Artículos</h2>
            {productos.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              productos.map((producto) => (
                <div key={producto.id} className="flex flex-row items-start sm:items-center gap-4 border-b border-[#e6dfd8] pb-4 w-full">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <div className="text-gray-400 text-xs">IMG</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-lg truncate">{producto.nombre}</h3>
                    <p className="text-xs sm:text-sm text-[#8a726f]">{producto.atributo}</p>
                    <p className="font-bold mt-1 text-[#D3AB80] text-sm sm:text-base">${(producto.precio * producto.cantidad).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <div className="flex items-center border border-[#e6dfd8] rounded-lg overflow-hidden h-12">
                      <button onClick={() => handleQuantityChange(producto.id, producto.atributo, -1)} className="h-full px-3 hover:bg-[#f5f1ec] transition text-[#472825] flex items-center justify-center min-w-[48px]">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{producto.cantidad}</span>
                      <button onClick={() => handleQuantityChange(producto.id, producto.atributo, 1)} className="h-full px-3 hover:bg-[#f5f1ec] transition text-[#472825] flex items-center justify-center min-w-[48px]">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => handleRemoveItem(producto.id, producto.atributo)} className="text-red-500 hover:text-red-700 transition flex items-center justify-center p-2 min-h-[48px] min-w-[48px]">
                      <Trash2 className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-1" /> <span className="hidden sm:inline text-sm">Eliminar</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Column */}
          <div className="w-full lg:col-span-5">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-[#e6dfd8] w-full">
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
                disabled={!isFormValid}
                className={`w-full mt-8 py-4 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[56px] text-lg ${
                  isFormValid
                    ? "bg-[#D3AB80] hover:bg-[#b8956e] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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

"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { supabase } from "@/src/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: string;
  rawPrice: number;
  image: string;
  description: string;
  stock: number;
}

const CATEGORIES = [
  "Cadenas", "Dijes", "Pulseras", "Topos", "Tobilleras", "Candongas", "Collares", "Juegos", "Anillos"
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("Estándar");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('productos').select('*').eq('publicado_web', true);
      if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyErr = error as any;
        console.error("Error fetching products:", anyErr.message, anyErr.details, anyErr.hint);
      } else if (data) {
        const mappedProducts: Product[] = data.map(p => ({
          id: p.id,
          name: p.nombre || p.descripcion,
          price: `$ ${new Intl.NumberFormat('es-CO').format(p.precio_venta || 0)}`,
          rawPrice: p.precio_venta || 0,
          image: p.imagenes?.[0] || 'https://images.unsplash.com/photo-1599643478514-4a820cbf311e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          description: p.descripcion,
          stock: p.saldo_actual || 0,
        }));
        setProducts(mappedProducts);
      }
    }
    fetchProducts();
  }, []);
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("Estándar");
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart({
        // The CartContext expects a number ID for legacy reasons (the mock data used numbers)
        // Since Supabase returns UUIDs, we have two options: refactor all Cart uses to accept string,
        // or bypass the type here specifically to avoid breaking other parts of the UI that rely on the cart.
        // Given the isolated scope of this page, we type assert to bypass.
        id: selectedProduct.id as unknown as number,
        nombre: selectedProduct.name,
        atributo: `Talla: ${selectedSize}`,
        precio: selectedProduct.rawPrice,
        cantidad: quantity,
        imagen: selectedProduct.image,
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      closeProduct();
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] font-sans pb-24">

      {/* HEADER */}
      <header className="py-12 text-center px-4">
        <h1 className="text-6xl md:text-8xl tracking-widest" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
          DOHA
        </h1>
        <p className="mt-4 text-sm tracking-[0.3em] text-[#D3AB80] uppercase font-light">
          Joyas en Oro 18K
        </p>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto w-full">

        {/* CATEGORIES ROW */}
        <section className="flex overflow-x-auto snap-x hide-scrollbar gap-3 px-4 pb-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="whitespace-nowrap px-6 py-3 rounded-xl border border-[#D3AB80] text-[#472825] hover:bg-[#D3AB80] hover:text-[#fdfbf9] transition-all duration-300 text-sm tracking-wide snap-center min-h-[48px]"
            >
              {cat}
            </button>
          ))}
        </section>

        {/* PRODUCTS GRID */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mb-20">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col" onClick={() => openProduct(product)}>
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-[#472825] shadow-lg">
                    <Eye size={20} />
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-sm sm:text-lg leading-tight">{product.name}</h3>
              <p className="text-[#D3AB80] font-semibold mt-1 text-sm sm:text-base">{product.price}</p>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 px-4 border-t border-[#D3AB80]/30 text-sm">
          <div>
            <h4 className="font-semibold mb-4 text-lg">Redes</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#D3AB80] transition-colors text-sm">Instagram</a>
              <a href="#" className="hover:text-[#D3AB80] transition-colors text-sm">Facebook</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Envíos</h4>
            <div className="space-y-2 text-gray-600">
              <p>Servientrega</p>
              <p>Coordinadora</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Legal</h4>
            <div className="space-y-2 flex flex-col">
              <a href="#" className="hover:text-[#D3AB80] transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-[#D3AB80] transition-colors">Política de Privacidad</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-lg">Newsletter</h4>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Tu correo..."
                className="w-full px-4 py-3 bg-transparent border border-[#D3AB80]/50 rounded-lg focus:outline-none focus:border-[#D3AB80]"
              />
              <button className="bg-[#D3AB80] text-[#fdfbf9] px-4 py-3 rounded-lg hover:bg-[#c2986b] transition-colors font-medium min-h-[48px]">
                Suscribirme
              </button>
            </div>
          </div>
        </footer>

      </main>

      {/* FLOATING BAR (LIQUIDGLASS) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-white/60 backdrop-blur-md shadow-[0_8px_32px_rgba(71,40,37,0.1)] border border-white/40 px-8 py-4 rounded-full flex items-center gap-10 text-[#472825]">
          <button className="hover:text-[#D3AB80] transition-colors hover:scale-110 transform duration-200">
            <Search size={22} strokeWidth={2} />
          </button>
          <Link href="/login" className="hover:text-[#D3AB80] transition-colors hover:scale-110 transform duration-200">
            <User size={22} strokeWidth={2} />
          </Link>
          <Link href="/carrito" className="relative hover:text-[#D3AB80] transition-colors hover:scale-110 transform duration-200">
            <ShoppingBag size={22} strokeWidth={2} />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D3AB80] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* PRODUCT DETAIL SIDE PANEL */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#fdfbf9] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative"
              >
                <button
                  onClick={closeProduct}
                  className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur p-2 rounded-full text-[#472825] hover:bg-gray-100 transition-colors shadow-sm min-h-[48px] min-w-[48px] flex items-center justify-center"
                >
                  <X size={20} />
                </button>

                <div className="overflow-y-auto hide-scrollbar flex-1 pb-20">
                  <div className="relative aspect-square bg-gray-100 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-medium text-[#472825] mb-2 font-serif leading-tight">{selectedProduct.name}</h2>
                    <p className="text-xl text-[#D3AB80] font-semibold mb-4">{selectedProduct.price}</p>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {selectedProduct.description}
                    </p>

                    <div className="mb-6">
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Talla / Tamaño</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Pequeña", "Estándar", "Grande"].map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-3 rounded-lg border text-sm transition-colors min-h-[48px] ${
                              selectedSize === size
                                ? "border-[#472825] bg-[#472825] text-[#fdfbf9]"
                                : "border-gray-300 text-gray-600 hover:border-[#D3AB80]"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Cantidad</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-12">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-4 py-2 h-full text-gray-600 hover:bg-gray-100 transition-colors min-w-[48px] flex items-center justify-center"
                          >-</button>
                          <span className="w-10 text-center font-medium">{quantity}</span>
                          <button
                            onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                            className="px-4 py-2 h-full text-gray-600 hover:bg-gray-100 transition-colors min-w-[48px] flex items-center justify-center"
                          >+</button>
                        </div>
                        <span className="text-xs text-gray-500">
                          {selectedProduct.stock} disp.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-[#fdfbf9] p-4 border-t border-gray-100">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#D3AB80] hover:bg-[#c2986b] text-[#fdfbf9] py-4 rounded-xl text-lg font-medium transition-colors shadow-lg shadow-[#D3AB80]/20 min-h-[56px]"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#472825] text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            <span>¡Joyas agregadas con éxito!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

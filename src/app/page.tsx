"use client";

import { useState } from "react";
import { Search, User, ShoppingBag, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "../context/CartContext";

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    name: "Cadena Mónaco 18K",
    price: "$ 1.250.000",
    image: "https://images.unsplash.com/photo-1599643478514-4a820cbf311e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Elegante cadena Mónaco forjada en oro de 18 quilates. Perfecta para lucir sola o acompañada de un dije exclusivo.",
    stock: 5,
  },
  {
    id: 2,
    name: "Pulsera Cartier 18K",
    price: "$ 890.000",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Clásica pulsera estilo Cartier, diseñada con eslabones entrelazados que reflejan luz y lujo.",
    stock: 3,
  },
  {
    id: 3,
    name: "Anillo Diamante Solitario",
    price: "$ 2.100.000",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b2548e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Anillo de compromiso en oro 18K con un delicado solitario brillante. La promesa de eternidad.",
    stock: 1,
  },
  {
    id: 4,
    name: "Aretes Candonga 18K",
    price: "$ 450.000",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Candongas de aro grueso, un diseño atemporal y moderno ideal para el día a día.",
    stock: 8,
  },
];

const CATEGORIES = [
  "Cadenas", "Dijes", "Pulseras", "Topos", "Tobilleras", "Candongas", "Collares", "Juegos", "Anillos"
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("Estándar");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const { addToCart, cartItems } = useCart();
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  const openProduct = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedSize("Estándar");
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      // Parse price to number
      const parsedPrice = parseInt(selectedProduct.price.replace(/[^0-9]/g, ''), 10);
      addToCart({
        id: selectedProduct.id,
        nombre: selectedProduct.name,
        atributo: `Talla: ${selectedSize}`,
        precio: parsedPrice,
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
      <header className="py-12 text-center">
        <h1 className="text-6xl md:text-8xl tracking-widest" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
          DOHA
        </h1>
        <p className="mt-4 text-sm tracking-[0.3em] text-[#D3AB80] uppercase font-light">
          Joyas en Oro 18K
        </p>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto w-full px-6">

        {/* CATEGORIES ROW */}
        <section className="flex overflow-x-auto gap-4 pb-4 mb-12 scrollbar-hide snap-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="whitespace-nowrap px-6 py-2 rounded-xl border border-[#D3AB80] text-[#472825] hover:bg-[#D3AB80] hover:text-[#fdfbf9] transition-all duration-300 text-sm tracking-wide snap-center"
            >
              {cat}
            </button>
          ))}
        </section>

        {/* PRODUCTS GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {PRODUCTS.map((product) => (
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
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-[#D3AB80] font-semibold mt-1">{product.price}</p>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-t border-[#D3AB80]/30 text-sm">
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
              <button className="bg-[#D3AB80] text-[#fdfbf9] px-4 py-3 rounded-lg hover:bg-[#c2986b] transition-colors font-medium">
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProduct}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#fdfbf9] shadow-2xl z-50 overflow-y-auto flex flex-col"
            >
              <button
                onClick={closeProduct}
                className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur p-2 rounded-full text-[#472825] hover:bg-gray-100 transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="relative h-[50vh] min-h-[400px] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h2 className="text-3xl font-medium text-[#472825] mb-2 font-serif">{selectedProduct.name}</h2>
                <p className="text-2xl text-[#D3AB80] font-semibold mb-6">{selectedProduct.price}</p>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Talla / Tamaño</h3>
                  <div className="flex gap-3">
                    {["Pequeña", "Estándar", "Grande"].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
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

                <div className="mb-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-3">Cantidad</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >-</button>
                      <span className="w-10 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >+</button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedProduct.stock} unidades disponibles
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#D3AB80] hover:bg-[#c2986b] text-[#fdfbf9] py-4 rounded-xl text-lg font-medium transition-colors shadow-lg shadow-[#D3AB80]/20"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </motion.div>
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

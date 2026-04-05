"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: number;
  nombre: string;
  atributo: string;
  precio: number;
  cantidad: number;
  imagen: string;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, atributo: string) => void;
  updateQuantity: (id: number, atributo: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch {
          console.error("Failed to parse cart items from local storage");
        }
      }
      setIsLoaded(true);
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id && i.atributo === item.atributo);
      if (existingItem) {
        return prev.map((i) =>
          (i.id === item.id && i.atributo === item.atributo) ? { ...i, cantidad: i.cantidad + item.cantidad } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number, atributo: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.atributo === atributo)));
  };

  const updateQuantity = (id: number, atributo: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.id === id && i.atributo === atributo) {
          const newQuantity = i.cantidad + delta;
          return { ...i, cantidad: newQuantity > 0 ? newQuantity : 1 };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

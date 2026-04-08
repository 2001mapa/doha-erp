"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAdminAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!usuario || !clave) {
      setError("Por favor, ingresa usuario y contraseña.");
      return;
    }

    const success = await login(usuario, clave);

    if (success) {
      // Si el rol es vendedor, la redirección se debería manejar aquí idealmente para tener acceso al rol actualizado.
      // Ya que login actualiza el estado de forma síncrona en React pero no devuelve el usuario, lo simularemos aquí
      // basándonos en el input o podemos actualizar `login` para devolver el usuario.
      if (usuario === "vendedor") {
        router.push("/admin/pos");
      } else {
        router.push("/admin");
      }
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl shadow-amber-900/5 border border-amber-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-linear-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
            DOHA 18K
          </h1>
          <p className="text-[#472825]/60 mt-2 font-medium">
            Panel de Administración
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#472825] mb-2">
              Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={20} className="text-[#D3AB80]" />
              </div>
              <input
                type="text"
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value);
                  setError("");
                }}
                className="w-full pl-11 pr-4 py-3 bg-[#fdfbf9] border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent transition-all text-[#472825]"
                placeholder="ej. admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#472825] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-[#D3AB80]" />
              </div>
              <input
                type="password"
                value={clave}
                onChange={(e) => {
                  setClave(e.target.value);
                  setError("");
                }}
                className="w-full pl-11 pr-4 py-3 bg-[#fdfbf9] border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D3AB80] focus:border-transparent transition-all text-[#472825]"
                placeholder="••••"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#D3AB80] hover:bg-[#c2986c] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#D3AB80]/30 hover:shadow-xl hover:shadow-[#D3AB80]/40 transition-all duration-300 transform active:scale-95"
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

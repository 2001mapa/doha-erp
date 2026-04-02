"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ correo?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { correo?: string; password?: string } = {};

    if (!correo) {
      newErrors.correo = "El correo es requerido";
    } else if (!correo.includes("@")) {
      newErrors.correo = "Ingresa un correo válido (ej. debe incluir '@')";
    }

    if (!password) {
      newErrors.password = "La contraseña no puede estar vacía";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      router.push("/perfil");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] text-[#472825] flex items-center justify-center px-4 py-8 pb-24 relative">
      <Link
        href="/"
        className="absolute top-6 left-4 sm:left-6 p-2 rounded-full hover:bg-black/5 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
      >
        <ArrowLeft className="w-6 h-6 text-[#472825]" />
      </Link>

      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-[#fdfbf9]">
        <h1 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="correo">
              Correo Electrónico
            </label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => {
                setCorreo(e.target.value);
                if (errors.correo) setErrors({ ...errors, correo: undefined });
              }}
              className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#D3AB80] ${
                errors.correo ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1">{errors.correo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#D3AB80] ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#D3AB80] text-white py-4 rounded-xl font-medium hover:bg-[#c2986f] transition-colors shadow-md min-h-[56px] text-lg"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => alert("Redirigiendo a recuperación...")}
              className="text-sm text-[#472825] hover:underline min-h-[48px] px-4"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

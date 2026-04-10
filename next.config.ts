import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Esta es la línea mágica para destapar el límite de peso a 10 Megabytes:
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  
  // Mantenemos la autorización para que tu web pueda mostrar fotos de Supabase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Autoriza cualquier proyecto de Supabase
      },
    ],
  },
};

export default nextConfig;
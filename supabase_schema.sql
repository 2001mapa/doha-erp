-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUM type for tercero
CREATE TYPE tercero_tipo AS ENUM ('cliente', 'proveedor', 'vendedor');

-- TERCEROS
CREATE TABLE terceros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nit VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    tipo tercero_tipo NOT NULL,
    telefono VARCHAR(50),
    direccion TEXT,
    ciudad VARCHAR(100),
    estado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for terceros
ALTER TABLE terceros ENABLE ROW LEVEL SECURITY;

-- Create public policy for development (terceros)
CREATE POLICY "Public Access for Development (Terceros)"
ON terceros FOR ALL USING (true);


-- BODEGAS
CREATE TABLE bodegas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for bodegas
ALTER TABLE bodegas ENABLE ROW LEVEL SECURITY;

-- Create public policy for development (bodegas)
CREATE POLICY "Public Access for Development (Bodegas)"
ON bodegas FOR ALL USING (true);


-- PRODUCTOS
CREATE TABLE productos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo VARCHAR(100) UNIQUE NOT NULL,
    ref_fabrica VARCHAR(100),
    descripcion TEXT NOT NULL,
    presentacion VARCHAR(100),
    saldo_actual NUMERIC DEFAULT 0,
    costo NUMERIC DEFAULT 0,
    bodega_id UUID REFERENCES bodegas(id) ON DELETE SET NULL,
    estado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for productos
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Create public policy for development (productos)
CREATE POLICY "Public Access for Development (Productos)"
ON productos FOR ALL USING (true);

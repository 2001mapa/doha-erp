export type TerceroTipo = 'cliente' | 'proveedor' | 'vendedor';

export interface Tercero {
  id: string; // UUID
  nit: string;
  nombre: string;
  tipo: TerceroTipo;
  telefono?: string | null;
  direccion?: string | null;
  ciudad?: string | null;
  estado: boolean;
  created_at?: string;
}

export interface Bodega {
  id: string; // UUID
  codigo: string;
  nombre: string;
  estado: boolean;
  created_at?: string;
}

export interface Producto {
  id: string; // UUID
  codigo: string;
  ref_fabrica?: string | null;
  descripcion: string;
  presentacion?: string | null;
  saldo_actual: number;
  costo: number;
  bodega_id?: string | null; // UUID referencing Bodega
  estado: boolean;
  created_at?: string;
}

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

export interface Factura {
  id: string; // UUID
  documento?: string | null;
  fecha?: string | null;
  cliente_id?: string | null; // UUID referencing Tercero
  valor_bruto?: number | null;
  impuesto?: number | null;
  total?: number | null;
  estado?: string | null;
  created_at?: string;
}

export interface DetalleFactura {
  id: string; // UUID
  factura_id: string; // UUID referencing Factura
  producto_id: string; // UUID referencing Producto
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  created_at?: string;
}

'use server';

import { supabase } from '@/src/lib/supabaseClient';
import type { Bodega, Producto } from '@/src/types/database.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getBodegas(): Promise<{ data: Bodega[] | null; error: any }> {
  try {
    const { data, error } = await supabase
      .from('bodegas')
      .select('*')
      .order('nombre');

    if (error) {
      console.error('Error in getBodegas:', { message: error.message, details: error.details, hint: error.hint });
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error in getBodegas:', err);
    return { data: null, error: err };
  }
}

export interface ProductoFiltros {
  ref_fabrica?: string;
  descripcion?: string;
  bodega_id?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getProductos(filtros?: ProductoFiltros): Promise<{ data: Producto[] | null; error: any }> {
  try {
    let query = supabase.from('productos').select('*');

    if (filtros) {
      if (filtros.ref_fabrica) {
        query = query.ilike('ref_fabrica', `%${filtros.ref_fabrica}%`);
      }
      if (filtros.descripcion) {
        query = query.ilike('descripcion', `%${filtros.descripcion}%`);
      }
      if (filtros.bodega_id) {
        query = query.eq('bodega_id', filtros.bodega_id);
      }
    }

    const { data, error } = await query.order('descripcion');

    if (error) {
      console.error('Error in getProductos:', { message: error.message, details: error.details, hint: error.hint });
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error in getProductos:', err);
    return { data: null, error: err };
  }
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProducto(data: Omit<Producto, 'id' | 'estado' | 'created_at'> & { imagenes?: any[] }): Promise<{ data: Producto | null; error: any }> {
  try {
    // Manejar la subida de imagenes si existen
    const payload = { ...data };

    if (payload.imagenes && Array.isArray(payload.imagenes) && payload.imagenes.length > 0) {
      const publicUrls = [];
      for (const file of payload.imagenes) {
        if (typeof file === 'object' && file !== null && 'arrayBuffer' in file) {
          try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('productos_imagenes')
              .upload(`productos/${fileName}`, buffer, {
                contentType: file.type || 'image/jpeg',
                upsert: false
              });

            if (uploadError) {
              console.error('Error subiendo imagen:', { message: uploadError.message, details: uploadError.name });
            } else if (uploadData) {
              const { data: publicUrlData } = supabase.storage
                .from('productos_imagenes')
                .getPublicUrl(`productos/${fileName}`);

              if (publicUrlData && publicUrlData.publicUrl) {
                publicUrls.push(publicUrlData.publicUrl);
              }
            }
          } catch (uploadErr) {
            console.error('Error procesando imagen para subida:', uploadErr);
          }
        } else if (typeof file === 'string') {
          // If it's already a URL string
          publicUrls.push(file);
        }
      }
      payload.imagenes = publicUrls;
    }

    const { data: result, error } = await supabase
      .from('productos')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error in createProducto:', { message: error.message, details: error.details, hint: error.hint });
      return { data: null, error };
    }

    return { data: result, error: null };
  } catch (err) {
    console.error('Unexpected error in createProducto:', err);
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

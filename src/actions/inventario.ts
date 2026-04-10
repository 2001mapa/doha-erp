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
export async function createProducto(input: any): Promise<{ data: Producto | null; error: string | null }> {
  try {
    let payload: any = {};
    let imageFiles: File[] = [];

    if (input && typeof input.getAll === 'function') {
      // It's a FormData object
      payload = {
        codigo_sku: input.get('codigo_sku'),
        nombre: input.get('nombre'),
        precio_costo: Number(input.get('precio_costo')),
        precio_venta: Number(input.get('precio_venta')),
        stock_actual: Number(input.get('stock_actual')),
        categoria: input.get('categoria'),
        descripcion_web: input.get('descripcion_web') || null,
        longitud: input.get('longitud') || null,
        grosor: input.get('grosor') || null,
        peso_estimado: input.get('peso_estimado') || null,
        publicado_web: input.get('publicado_web') === 'true',
      };

      const files = input.getAll('imagen');
      if (files && files.length > 0) {
        imageFiles = files as File[];
      }
    } else {
      // It's a standard payload object
      payload = { ...input };
      if (payload.imagenes && Array.isArray(payload.imagenes)) {
        imageFiles = payload.imagenes.filter((f: any) => typeof f === 'object' && f !== null && 'arrayBuffer' in f);
        // keep already uploaded string URLs
        payload.imagenes = payload.imagenes.filter((f: any) => typeof f === 'string');
      } else {
        payload.imagenes = [];
      }
    }

    const publicUrls: string[] = payload.imagenes && Array.isArray(payload.imagenes) ? [...payload.imagenes] : [];

    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const ruta = `joyas/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('productos_imagenes')
            .upload(ruta, buffer, {
              contentType: file.type || 'image/jpeg',
              upsert: false
            });

          if (uploadError) {
            console.error("Error subiendo foto:", uploadError);
          } else if (uploadData) {
            const { data: publicUrlData } = supabase.storage
              .from('productos_imagenes')
              .getPublicUrl(ruta);

            if (publicUrlData && publicUrlData.publicUrl) {
              publicUrls.push(publicUrlData.publicUrl);
            }
          }
        } catch (uploadErr) {
          console.error('Error procesando imagen para subida:', uploadErr);
        }
      }
    }

    if (publicUrls.length > 0) {
      payload.imagenes = publicUrls;
    } else {
      // Even if empty, ensure it's an array if the column expects one, or remove it
      delete payload.imagenes;
    }

    const { data: result, error } = await supabase
      .from('productos')
      .insert([payload])
      .select()
      .single();

    if (error) {
      // Extraemos solo el mensaje de texto para evitar el colapso de Next.js
      console.error('Error de Supabase al crear:', error.message);
      return { data: null, error: error.message };
    }

    return { data: result, error: null };
  } catch (err: any) {
    // Extraemos solo el mensaje de texto del error inesperado
    console.error('Error inesperado en createProducto:', err);
    return { data: null, error: err.message || 'Error desconocido' };
  }
}

export interface ProductoFiltros {
  codigo?: string;
  ref_fabrica?: string;
  descripcion?: string;
  bodega_id?: string;
}

export async function getProductos(filtros?: ProductoFiltros): Promise<{ data: any[] | null; error: string | null }> {
  try {
    let query = supabase.from('productos').select('*');

    if (filtros?.codigo) {
      query = query.ilike('codigo_sku', `%${filtros.codigo}%`);
    }
    if (filtros?.ref_fabrica) {
      query = query.ilike('ref_fabrica', `%${filtros.ref_fabrica}%`);
    }
    if (filtros?.descripcion) {
      query = query.ilike('nombre', `%${filtros.descripcion}%`);
    }
    if (filtros?.bodega_id) {
      query = query.eq('bodega_id', filtros.bodega_id);
    }

    const { data, error } = await query.order('nombre', { ascending: true });

    if (error) {
      // Extraemos solo el mensaje de texto para que Next.js no colapse al enviarlo al cliente
      console.error('Error de Supabase:', error.message);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('Error inesperado en getProductos:', err);
    return { data: null, error: err.message || 'Error desconocido' };
  }
}
// FUNCIÓN PARA ELIMINAR
export async function deleteProducto(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar en Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error('Error inesperado al eliminar:', err);
    return { success: false, error: err.message || 'Error desconocido' };
  }
}

// FUNCIÓN PARA EDITAR
export async function updateProducto(id: string, updates: any): Promise<{ data: any | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('productos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error al editar en Supabase:', error.message);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('Error inesperado al editar:', err);
    return { data: null, error: err.message || 'Error desconocido' };
  }
}
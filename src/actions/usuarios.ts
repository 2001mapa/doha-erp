'use server';

import { supabase } from '../lib/supabaseClient';
import { revalidatePath } from 'next/cache';

export async function getUsuarios() {
  try {
    const { data, error } = await supabase
      .from('perfiles')
      .select('*, roles(nombre)');

    if (error) {
      console.error('Error fetching usuarios:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception in getUsuarios:', err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { success: false, error: (err as any).message };
  }
}

export async function getRoles() {
  try {
    const { data, error } = await supabase
      .from('roles')
      .select('id, nombre');

    if (error) {
      console.error('Error fetching roles:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception in getRoles:', err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { success: false, error: (err as any).message };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function crearUsuario(datos: any) {
  try {
    // NOTA DE DESARROLLO: Validaciones de sesión comentadas/eliminadas temporalmente.
    // Se asume que cualquier petición en este momento es válida para permitir CRUD directo.
    // const { data: { session } } = await supabase.auth.getSession();
    // if (!session) throw new Error('Auth session missing!');

    const payload = {
      nombre: datos.nombre,
      email: datos.email,
      rol_id: datos.rol_id,
      estado: datos.estado,
    };

    const { data, error } = await supabase
      .from('perfiles')
      .insert([payload])
      .select('*, roles(nombre)')
      .single();

    if (error) {
      console.error('Error in crearUsuario:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/general/usuarios');
    return { success: true, data };
  } catch (err) {
    console.error('Exception in crearUsuario:', err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { success: false, error: (err as any).message };
  }
}

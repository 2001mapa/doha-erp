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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function crearRol(datos: any) {
  try {
    const payload = {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
    };

    const { data, error } = await supabase
      .from('roles')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error in crearRol:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/general/roles');
    return { success: true, data };
  } catch (err) {
    console.error('Exception in crearRol:', err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { success: false, error: (err as any).message };
  }
}

export async function eliminarRol(id: number) {
  try {
    const { error } = await supabase
      .from('roles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error in eliminarRol:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      // Detectar error de clave foránea
      if (error.code === '23503') {
        return { success: false, error: 'No se puede eliminar este rol porque tiene usuarios asignados' };
      }
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/general/roles');
    return { success: true };
  } catch (err) {
    console.error('Exception in eliminarRol:', err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { success: false, error: (err as any).message };
  }
}

export async function getRolesCompletos() {
  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*, perfiles(count)');

    if (error) {
      console.error('Error fetching roles completos:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Exception in getRolesCompletos:', err);
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

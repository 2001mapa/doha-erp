'use server';

import { supabase } from '../lib/supabaseClient';
import { revalidatePath } from 'next/cache';

export async function getPermisos() {
  try {
    const { data, error } = await supabase.from('permisos').select('*');
    if (error) throw error;
    return { success: true, data };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return { success: false, error: err.message };
  }
}

export async function getPermisosRol(rolId: number) {
  try {
    const { data, error } = await supabase
      .from('permisos_rol')
      .select('permiso_id')
      .eq('rol_id', rolId);
    if (error) throw error;
    return { success: true, data: data.map((pr: any) /* eslint-disable-line @typescript-eslint/no-explicit-any */ => pr.permiso_id) };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return { success: false, error: err.message };
  }
}

export async function updatePermisosRol(rolId: number, permisosIds: number[]) {
  try {
    const { error: delError } = await supabase
      .from('permisos_rol')
      .delete()
      .eq('rol_id', rolId);

    if (delError) throw delError;

    if (permisosIds.length > 0) {
      const payload = permisosIds.map((pid) => ({
        rol_id: rolId,
        permiso_id: pid,
      }));

      const { error: insError } = await supabase
        .from('permisos_rol')
        .insert(payload);

      if (insError) throw insError;
    }

    revalidatePath('/admin/general/roles');
    return { success: true };
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return { success: false, error: err.message };
  }
}

'use server';

import { supabase } from '@/src/lib/supabaseClient';

// 1. OBTENER TERCEROS
export async function getTerceros() {
  try {
    const { data, error } = await supabase
      .from('terceros')
      .select('*')
      .order('created_at', { ascending: false });

    // IMPORTANTE: Devolvemos el objeto EXACTO que espera el page.tsx
    return { data: data || [], error: error ? error.message : null };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}

// 2. CREAR TERCERO
export async function createTercero(datos: any) {
  try {
    const { data, error } = await supabase
      .from('terceros')
      .insert([datos])
      .select()
      .single();

    return { data, error: error ? error.message : null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}

// 3. EDITAR TERCERO (Esta es la que faltaba y causaba el error 2305)
export async function updateTercero(id: string, updates: any) {
  try {
    const { data, error } = await supabase
      .from('terceros')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error: error ? error.message : null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}
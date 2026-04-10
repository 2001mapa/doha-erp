'use server';

import { supabase } from '@/src/lib/supabaseClient';

// Obtener vendedores con info de terceros
export async function getVendedores() {
  const { data, error } = await supabase
    .from('vendedores')
    .select(`
      *,
      terceros (
        nombre_completo,
        razon_social,
        numero_identificacion
      )
    `)
    .order('codigo', { ascending: true });

  if (error) return { data: null, error: error.message };
  return { data: data || [], error: null };
}

// Crear vendedor
export async function createVendedor(vendedor: any) {
  const { data, error } = await supabase
    .from('vendedores')
    .insert([vendedor])
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// Actualizar vendedor
export async function updateVendedor(id: string, updates: any) {
  const { data, error } = await supabase
    .from('vendedores')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

// Eliminar vendedor
export async function deleteVendedor(id: string) {
  const { error } = await supabase
    .from('vendedores')
    .delete()
    .eq('id', id);

  return { error: error ? error.message : null };
}
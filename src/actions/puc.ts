'use server';
import { supabase } from '@/src/lib/supabaseClient';

export async function getPUC() {
  const { data, error } = await supabase
    .from('puc')
    .select('*')
    .order('codigo', { ascending: true });

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

export async function createCuentaPUC(datos: any) {
  const { data, error } = await supabase
    .from('puc')
    .insert([datos])
    .select()
    .single();

  return { data, error: error ? error.message : null };
}
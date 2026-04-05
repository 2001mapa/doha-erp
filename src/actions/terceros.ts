'use server';

import { supabase } from '@/src/lib/supabaseClient';
import { Tercero } from '@/src/types/database.types';

export async function getTerceros(): Promise<Tercero[]> {
  const { data, error } = await supabase
    .from('terceros')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching terceros:', error);
    throw new Error('Failed to fetch terceros');
  }

  return data as Tercero[];
}

export async function createTercero(tercero: Omit<Tercero, 'id' | 'created_at'>): Promise<Tercero> {
  const { data, error } = await supabase
    .from('terceros')
    .insert([tercero])
    .select()
    .single();

  if (error) {
    console.error('Error creating tercero:', error);
    throw new Error('Failed to create tercero');
  }

  return data as Tercero;
}

export async function updateTercero(id: string, updates: Partial<Omit<Tercero, 'id' | 'created_at'>>): Promise<Tercero> {
  const { data, error } = await supabase
    .from('terceros')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating tercero with id ${id}:`, error);
    throw new Error('Failed to update tercero');
  }

  return data as Tercero;
}

export async function deleteTercero(id: string): Promise<void> {
  const { error } = await supabase
    .from('terceros')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting tercero with id ${id}:`, error);
    throw new Error('Failed to delete tercero');
  }
}

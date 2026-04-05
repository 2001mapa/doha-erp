'use server';

import { supabase } from '@/src/lib/supabaseClient';

export async function getConceptos() {
  try {
    const { data, error } = await supabase
      .from('conceptos')
      .select('*')
      .order('codigo');

    if (error) {
      console.error('Error fetching conceptos:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getConceptos:', error);
    throw error;
  }
}

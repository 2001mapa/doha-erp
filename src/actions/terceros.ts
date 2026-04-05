import { supabase } from '@/src/lib/supabaseClient'

export async function getTerceros() {
  try {
    const { data, error } = await supabase.from('terceros').select('*')
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching terceros:', error)
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTercero(data: any) {
  try {
    // Exclude id to let Supabase auto-generate it if necessary, though
    // it depends on how the DB is configured. But since the original code
    // appended an ID locally, we'll strip any empty string id.
    const insertData = { ...data };
    if (insertData.id === "") {
        delete insertData.id;
    }

    console.log("Payload enviado a Supabase:", insertData);
    const { data: result, error } = await supabase.from('terceros').insert([insertData]).select();
    if (error) {
      console.error('Error exacto de Supabase:', error.message, error.details, error.hint);
      throw new Error(error.message);
    }
    return result;
  } catch (error) {
    console.error('Error creating tercero:', error)
    throw error
  }
}

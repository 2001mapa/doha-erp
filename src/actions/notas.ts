'use server';
import { supabase } from '@/src/lib/supabaseClient';

// 1. OBTENER TODAS LAS NOTAS CON SUS DETALLES Y TERCEROS
export async function getNotasContables() {
  try {
    const { data, error } = await supabase
      .from('notas_contables')
      .select(`
        *,
        terceros (
          nombre_completo,
          razon_social,
          numero_identificacion
        ),
        notas_contables_detalle (
          debito,
          credito
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], error: null };
  } catch (err: any) {
    console.error('Error al obtener notas:', err.message);
    return { data: [], error: err.message };
  }
}

// 2. CREAR UNA NOTA (Cabecera + Líneas)
export async function createNotaContable(cabecera: any, lineas: any[]) {
  try {
    // A. Insertamos la Cabecera
    const { data: nota, error: errorNota } = await supabase
      .from('notas_contables')
      .insert([cabecera])
      .select()
      .single();

    if (errorNota) throw errorNota;

    // B. Preparamos las líneas con el ID de la nota recién creada
    const detallesConId = lineas.map(linea => ({
      nota_id: nota.id,
      cuenta_puc: linea.cuenta_puc,
      tercero_id: linea.tercero_id || null, // El tercero en la línea es opcional
      debito: linea.debito || 0,
      credito: linea.credito || 0
    }));

    // C. Insertamos todos los detalles masivamente
    const { error: errorDetalle } = await supabase
      .from('notas_contables_detalle')
      .insert(detallesConId);

    if (errorDetalle) throw errorDetalle;

    return { data: nota, error: null };
  } catch (err: any) {
    console.error('Error al crear nota contable:', err.message);
    return { data: null, error: err.message };
  }
}

// 3. OBTENER EL DETALLE ESPECÍFICO DE UNA NOTA
export async function getDetalleNota(notaId: string) {
  try {
    const { data, error } = await supabase
      .from('notas_contables_detalle')
      .select('*')
      .eq('nota_id', notaId);

    if (error) throw error;
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}
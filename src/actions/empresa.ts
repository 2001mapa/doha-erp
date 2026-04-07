'use server';

import { supabase } from '../lib/supabaseClient';
import { revalidatePath } from 'next/cache';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateDatosEmpresa(formData: any, id: string) {
  try {
    const payload = {
      tipo_identificacion: formData.tipoDocumento,
      numero_identificacion: formData.identificacion,
      dv: formData.dv,
      razon_social: formData.razonSocial,
      nombre_comercial: formData.nombreComercial,
      regimen: formData.regimen,
      actividad_economica: formData.actividadEconomica,
      fecha_actividad: formData.fechaActividad || null,
      direccion: formData.direccion,
      departamento: formData.departamento,
      ciudad: formData.ciudad,
      barrio: formData.barrio,
      telefono: formData.telefono,
      telefono2: formData.telefono2,
      email: formData.email,
      moneda: formData.moneda,
      consecutivos_automaticos: formData.consecutivosAutomaticos,
      fecha_consecutivo: formData.fechaConsecutivo || null,
      decimales_cantidades: Number(formData.decimalesCantidades) || 0,
      decimales_valores: Number(formData.decimalesValores) || 0,
      decimales_compras: Number(formData.decimalesCompras) || 0,
      decimales_ventas: Number(formData.decimalesVentas) || 0,
      decimales_cartera: Number(formData.decimalesCartera) || 0,
    };

    const { data, error } = await supabase
      .from('empresa')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Error in updateDatosEmpresa:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/general/empresa');
    return { success: true, data };
  } catch (err) {
    console.error('Exception in updateDatosEmpresa:', err);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { success: false, error: (err as any).message };
  }
}

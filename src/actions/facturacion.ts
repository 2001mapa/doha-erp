"use server";

import { supabase } from "@/src/lib/supabaseClient";
import { Factura, DetalleFactura } from "@/src/types/database.types";

export async function createFacturaCompleta(
  datosFactura: Omit<Factura, "id" | "created_at">,
  arrayDetalles: Omit<DetalleFactura, "id" | "factura_id" | "created_at">[]
) {
  try {
    // Autogenerar número de factura si no viene del frontend
    if (!datosFactura.numero_factura) {
      const prefijo = datosFactura.documento?.split(' ')[0] || 'FAC'; // Toma "REM" o "FC", o usa "FAC"
      datosFactura.numero_factura = `${prefijo}-${Date.now().toString().slice(-6)}`;
    }

    // 1. Insert Factura
    const { data: facturaData, error: facturaError } = await supabase
      .from("facturas")
      .insert([datosFactura])
      .select("id")
      .single();

    if (facturaError) {
      console.error("Error inserting factura:", facturaError.message, facturaError.details, facturaError.hint);
      return { success: false, error: facturaError.message };
    }

    const facturaId = facturaData.id;

    // 2. Map and Insert Detalles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detallesLimpios = arrayDetalles.map((detalle: any) => ({
      factura_id: facturaId, // El ID de la factura recién creada
      producto_id: detalle.producto_id || detalle.id, // Asegurar que sea el UUID del producto
      cantidad: Number(detalle.cantidad),
      precio_unitario: Number(detalle.precio_unitario || detalle.precio)
    }));

    const { error: detallesError } = await supabase
      .from("detalles_factura")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(detallesLimpios as any);

    if (detallesError) {
      console.error("Error inserting detalles:", detallesError.message, detallesError.details, detallesError.hint);
      return { success: false, error: detallesError.message };
    }

    // 3. Update Productos saldo_actual
    for (const detalle of arrayDetalles) {
      // Fetch current product
      const { data: productData, error: productQueryError } = await supabase
        .from("productos")
        .select("saldo_actual")
        .eq("id", detalle.producto_id)
        .single();

      if (productQueryError) {
        console.error(`Error querying product ${detalle.producto_id}:`, productQueryError.message);
        continue; // or handle more strictly
      }

      const currentSaldo = productData?.saldo_actual || 0;
      const newSaldo = currentSaldo - detalle.cantidad;

      const { error: productUpdateError } = await supabase
        .from("productos")
        .update({ saldo_actual: newSaldo })
        .eq("id", detalle.producto_id);

      if (productUpdateError) {
        console.error(`Error updating product ${detalle.producto_id}:`, productUpdateError.message);
      }
    }

    return { success: true, facturaId };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Unexpected error in createFacturaCompleta:", err);
    return { success: false, error: "Error inesperado al crear la factura" };
  }
}

export async function getFacturas() {
  try {
    const { data, error } = await supabase
      .from("facturas")
      .select(`
        *,
        terceros (
          nombre,
          nit
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching facturas:", error.message, error.details, error.hint);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Unexpected error in getFacturas:", err);
    return { success: false, error: "Error inesperado al obtener las facturas" };
  }
}

export async function getDetallesFactura(facturaId: string) {
  try {
    const { data, error } = await supabase
      .from("detalles_factura")
      .select(`
        *,
        productos (
          descripcion,
          ref_fabrica
        )
      `)
      .eq("factura_id", facturaId);

    if (error) {
      console.error("Error fetching detalles:", error.message, error.details, error.hint);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Unexpected error in getDetallesFactura:", err);
    return { success: false, error: "Error inesperado al obtener los detalles de la factura" };
  }
}

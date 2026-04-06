import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generarFacturaPDF = (factura: any, detalles: any[], cliente: any) => {
  const doc = new jsPDF();

  // Color palette
  const DOHA_GOLD = [211, 171, 128];
  const DOHA_BROWN = [71, 40, 37];

  // Title
  doc.setFontSize(22);
  doc.setTextColor(DOHA_BROWN[0], DOHA_BROWN[1], DOHA_BROWN[2]);
  doc.text("DOHA 18K - FACTURA DE VENTA", 105, 20, { align: "center" });

  // Factura Details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Factura No: ${factura.documento || factura.id || 'N/A'}`, 14, 40);
  doc.text(`Fecha: ${factura.fecha || 'N/A'}`, 14, 48);

  // Client Details
  doc.text(`Cliente: ${cliente?.nombre || factura.tercero || 'Consumidor Final'}`, 14, 56);
  if (cliente?.nit) doc.text(`NIT: ${cliente.nit}`, 14, 64);

  // Table
  const tableColumn = ["Producto", "Cantidad", "Precio Unitario", "Subtotal"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableRows: any[] = [];

  detalles.forEach(detalle => {
    const row = [
      detalle.nombre || detalle.producto_nombre || 'Producto Desconocido',
      detalle.cantidad,
      `$${detalle.precio_unitario?.toLocaleString()}`,
      `$${detalle.subtotal?.toLocaleString()}`
    ];
    tableRows.push(row);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 75,
    theme: 'grid',
    headStyles: {
      fillColor: DOHA_GOLD as [number, number, number],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
    },
  });

  // Totals
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (doc as any).lastAutoTable.finalY || 75;
  doc.setFontSize(14);
  doc.setTextColor(DOHA_BROWN[0], DOHA_BROWN[1], DOHA_BROWN[2]);
  doc.text(`Total: $${factura.total?.toLocaleString() || 0}`, 14, finalY + 15);

  doc.save(`factura_${factura.documento || factura.id || 'export'}.pdf`);
};

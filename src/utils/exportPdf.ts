import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPdf = (
  columns: string[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[][],
  title: string,
  filename: string
) => {
  const doc = new jsPDF();

  // Membrete sencillo DOHA 18K
  doc.setFontSize(20);
  doc.setTextColor(211, 171, 128); // #D3AB80 (Gold)
  doc.text('DOHA 18K', 14, 22);

  doc.setFontSize(14);
  doc.setTextColor(71, 40, 37); // #472825 (Dark Brown)
  doc.text(title, 14, 32);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 40);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - jspdf-autotable adds autoTable to jsPDF type
  doc.autoTable({
    startY: 45,
    head: [columns],
    body: data,
    theme: 'grid',
    headStyles: {
      fillColor: [211, 171, 128], // #D3AB80
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    alternateRowStyles: {
      fillColor: [253, 251, 249], // #fdfbf9
    },
  });

  doc.save(`${filename}.pdf`);
};

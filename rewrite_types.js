const fs = require('fs');
let content = fs.readFileSync('src/app/admin/terceros/general/page.tsx', 'utf-8');

const newTypes = `type Tercero = {
  id: string;
  codigo: string;
  tipoIdentificacion: string;
  nit: string;
  dv: string;
  razonSocial: string;
  nombreCompleto: string;
  roles: {
    cliente: boolean;
    empleado: boolean;
    proveedor: boolean;
    prospecto: boolean;
  };
  vendedor: string;
  correo: string;
  correoNovedades: string;
  telefono1: string;
  telefono2: string;
  celular: string;
  pais: string;
  departamento: string;
  ciudad: string;
  direccionFiscal: string;
  direccionDespachos: string;
  cumpleDia: string;
  cumpleMes: string;
  cartera: string;
  formaPago: string;
  nivelPrecio: string;
  clasificacion: string;
  aplicaCredito: boolean;
  observaciones: string;
  estado: "Activo" | "Inactivo";
  // For backwards compatibility / initial parsing map
  nombre?: string;
  tipo?: "Cliente" | "Proveedor";
  telefono?: string;
  direccion?: string;
};

// Mock inicial
const initialTerceros: Tercero[] = [
  {
    id: "1",
    codigo: "TERC-001",
    tipoIdentificacion: "NIT",
    nit: "900123456",
    dv: "1",
    razonSocial: "Joyería El Diamante S.A.S",
    nombreCompleto: "Joyería El Diamante",
    roles: { cliente: false, empleado: false, proveedor: true, prospecto: false },
    vendedor: "Vendedor 1",
    correo: "contacto@eldiamante.com",
    correoNovedades: "novedades@eldiamante.com",
    telefono1: "3001234567",
    telefono2: "",
    celular: "3001234567",
    pais: "Colombia",
    departamento: "Bogotá D.C.",
    ciudad: "Bogotá",
    direccionFiscal: "Centro de Bogotá, Calle 14",
    direccionDespachos: "Centro de Bogotá, Calle 14",
    cumpleDia: "",
    cumpleMes: "",
    cartera: "Contado",
    formaPago: "Efectivo",
    nivelPrecio: "Distribuidor",
    clasificacion: "A",
    aplicaCredito: false,
    observaciones: "Excelente proveedor",
    estado: "Activo",
  },
  {
    id: "2",
    codigo: "TERC-002",
    tipoIdentificacion: "CC",
    nit: "1020304050",
    dv: "",
    razonSocial: "",
    nombreCompleto: "María Fernanda López",
    roles: { cliente: true, empleado: false, proveedor: false, prospecto: false },
    vendedor: "Vendedor 2",
    correo: "mafe.lopez@email.com",
    correoNovedades: "",
    telefono1: "3159876543",
    telefono2: "",
    celular: "3159876543",
    pais: "Colombia",
    departamento: "Valle del Cauca",
    ciudad: "Cali",
    direccionFiscal: "Norte de Cali, Cra 50",
    direccionDespachos: "Norte de Cali, Cra 50",
    cumpleDia: "15",
    cumpleMes: "08",
    cartera: "30 Días",
    formaPago: "Transferencia",
    nivelPrecio: "Detal",
    clasificacion: "B",
    aplicaCredito: true,
    observaciones: "Cliente frecuente",
    estado: "Activo",
  },
];`;

content = content.replace(/type Tercero = \{[\s\S]*?\};\n\n\/\/ Mock inicial\nconst initialTerceros: Tercero\[\] = \[[\s\S]*?\];/, newTypes);

fs.writeFileSync('src/app/admin/terceros/general/page.tsx', content);

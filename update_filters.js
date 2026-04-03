const fs = require('fs');
let content = fs.readFileSync('src/app/admin/terceros/general/page.tsx', 'utf-8');

// Update formData initial state to match new fields
const newFormData = `const [formData, setFormData] = useState<Tercero>({
    id: "",
    codigo: "",
    tipoIdentificacion: "CC",
    nit: "",
    dv: "",
    razonSocial: "",
    nombreCompleto: "",
    roles: {
      cliente: false,
      empleado: false,
      proveedor: false,
      prospecto: false,
    },
    vendedor: "",
    correo: "",
    correoNovedades: "",
    telefono1: "",
    telefono2: "",
    celular: "",
    pais: "Colombia",
    departamento: "",
    ciudad: "",
    direccionFiscal: "",
    direccionDespachos: "",
    cumpleDia: "",
    cumpleMes: "",
    cartera: "",
    formaPago: "",
    nivelPrecio: "",
    clasificacion: "",
    aplicaCredito: false,
    observaciones: "",
    estado: "Activo",
  });

  const [activeTab, setActiveTab] = useState("Datos Principales");

  // Filters state
  const [filterCodigo, setFilterCodigo] = useState("");
  const [filterDescripcion, setFilterDescripcion] = useState("");
  const [filterActivo, setFilterActivo] = useState("Todos");
  const [filterCliente, setFilterCliente] = useState("Todos");
  const [filterEmpleado, setFilterEmpleado] = useState("Todos");
  const [filterProveedor, setFilterProveedor] = useState("Todos");`;

content = content.replace(/const \[formData, setFormData\] = useState<Tercero>\(\{[\s\S]*?\}\);/, newFormData);

// Update handleOpenNew to use correct fields
const newHandleOpenNew = `const handleOpenNew = () => {
    setIsEditing(false);
    setFormData({
      id: "",
      codigo: "",
      tipoIdentificacion: "CC",
      nit: "",
      dv: "",
      razonSocial: "",
      nombreCompleto: "",
      roles: {
        cliente: false,
        empleado: false,
        proveedor: false,
        prospecto: false,
      },
      vendedor: "",
      correo: "",
      correoNovedades: "",
      telefono1: "",
      telefono2: "",
      celular: "",
      pais: "Colombia",
      departamento: "",
      ciudad: "",
      direccionFiscal: "",
      direccionDespachos: "",
      cumpleDia: "",
      cumpleMes: "",
      cartera: "",
      formaPago: "",
      nivelPrecio: "",
      clasificacion: "",
      aplicaCredito: false,
      observaciones: "",
      estado: "Activo",
    });
    setActiveTab("Datos Principales");
    setIsModalOpen(true);
  };`;

content = content.replace(/const handleOpenNew = \(\) => \{[\s\S]*?setIsModalOpen\(true\);\n  \};/, newHandleOpenNew);

const filteredLogic = `const filteredTerceros = terceros.filter((t) => {
    const matchCodigo = t.codigo.toLowerCase().includes(filterCodigo.toLowerCase());
    const desc = \`\${t.razonSocial} \${t.nombreCompleto}\`.toLowerCase();
    const matchDesc = desc.includes(filterDescripcion.toLowerCase());

    const matchActivo = filterActivo === "Todos" ? true : (filterActivo === "Sí" && t.estado === "Activo") || (filterActivo === "No" && t.estado === "Inactivo");
    const matchCliente = filterCliente === "Todos" ? true : (filterCliente === "Sí" && t.roles.cliente) || (filterCliente === "No" && !t.roles.cliente);
    const matchEmpleado = filterEmpleado === "Todos" ? true : (filterEmpleado === "Sí" && t.roles.empleado) || (filterEmpleado === "No" && !t.roles.empleado);
    const matchProveedor = filterProveedor === "Todos" ? true : (filterProveedor === "Sí" && t.roles.proveedor) || (filterProveedor === "No" && !t.roles.proveedor);

    return matchCodigo && matchDesc && matchActivo && matchCliente && matchEmpleado && matchProveedor;
  });`;

content = content.replace(/const filteredTerceros = terceros\.filter\(\(t\) =>\n    t\.nombre\.toLowerCase\(\)\.includes\(searchTerm\.toLowerCase\(\)\)\n  \);/, filteredLogic);

const headerSection = `return (
    <div className="min-h-screen bg-[#fdfbf9] p-8 font-sans text-[#472825]">
      {/* HEADER Y FILTROS */}
      <div className="max-w-6xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Gestión de Terceros
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Administra clientes, proveedores, empleados y prospectos.
            </p>
          </div>
          <button
            onClick={handleOpenNew}
            className="bg-[#D3AB80] hover:bg-[#b8946d] text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Plus size={20} />
            <span>Nuevo Tercero</span>
          </button>
        </div>

        {/* BARRA DE FILTROS */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[150px] space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Código</label>
            <input
              type="text"
              value={filterCodigo}
              onChange={(e) => setFilterCodigo(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
              placeholder="Buscar por código..."
            />
          </div>
          <div className="flex-1 min-w-[200px] space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Descripción</label>
            <input
              type="text"
              value={filterDescripcion}
              onChange={(e) => setFilterDescripcion(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
              placeholder="Razón social o nombre..."
            />
          </div>
          <div className="w-[120px] space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Activo</label>
            <select
              value={filterActivo}
              onChange={(e) => setFilterActivo(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
            >
              <option value="Todos">Todos</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="w-[120px] space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Cliente</label>
            <select
              value={filterCliente}
              onChange={(e) => setFilterCliente(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
            >
              <option value="Todos">Todos</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="w-[120px] space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Empleado</label>
            <select
              value={filterEmpleado}
              onChange={(e) => setFilterEmpleado(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
            >
              <option value="Todos">Todos</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="w-[120px] space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Proveedor</label>
            <select
              value={filterProveedor}
              onChange={(e) => setFilterProveedor(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:border-[#D3AB80] focus:bg-white transition-all"
            >
              <option value="Todos">Todos</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
          <button className="bg-[#1f2937] hover:bg-black text-white p-3 rounded-xl transition-colors shrink-0">
            <Search size={20} />
          </button>
        </div>
      </div>`;

content = content.replace(/return \(\n    <div className="min-h-screen bg-gray-50\/50 p-8">[\s\S]*?<\/div>\n      <\/div>/, headerSection);

const tableSection = `<div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%]">
                  NIT/CC
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[20%]">
                  Razón Social / Nombre
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%]">
                  Dirección
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%]">
                  Teléfonos
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[10%]">
                  Ciudad
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[10%]">
                  Estado
                </th>
                <th className="p-5 text-[11px] uppercase tracking-wider font-black text-gray-500 w-[15%] text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTerceros.length > 0 ? (
                filteredTerceros.map((tercero) => (
                  <tr
                    key={tercero.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="font-bold text-[#472825]">
                        {tercero.nit} {tercero.dv && \`-\${tercero.dv}\`}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {tercero.tipoIdentificacion}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="font-bold text-[#472825]">
                        {tercero.razonSocial || tercero.nombreCompleto || tercero.nombre}
                      </div>
                      <div className="text-xs text-gray-500 font-medium truncate max-w-[200px]">
                        {tercero.correo}
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600 truncate max-w-[150px]">
                      {tercero.direccionFiscal || tercero.direccion}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      <div>{tercero.telefono1 || tercero.telefono}</div>
                      {tercero.celular && (
                        <div className="text-xs text-gray-400">{tercero.celular}</div>
                      )}
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600">
                      {tercero.ciudad}
                    </td>
                    <td className="p-5">
                      <span
                        className={\`px-3 py-1.5 rounded-lg text-xs font-bold \${
                          tercero.estado === "Activo"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }\`}
                      >
                        {tercero.estado}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleOpenEdit(tercero)}
                          className="p-2 text-[#D3AB80] hover:bg-[#D3AB80]/10 rounded-xl transition-colors tooltip"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(tercero.id)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors tooltip"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-500 font-medium"
                  >
                    No se encontraron terceros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`;

content = content.replace(/<div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">[\s\S]*?<\/div>\n      <\/div>/, tableSection);

fs.writeFileSync('src/app/admin/terceros/general/page.tsx', content);

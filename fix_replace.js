const fs = require('fs');
let content = fs.readFileSync('src/app/admin/terceros/general/page.tsx', 'utf-8');

const newHeader = `  return (
    <div className="p-8 max-w-6xl mx-auto w-full bg-[#fdfbf9] min-h-screen text-[#472825]">
      {/* HEADER Y FILTROS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#472825]">
            Gestión de Terceros
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Administra clientes, proveedores, empleados y prospectos.
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 bg-[#D3AB80] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b8946d] transition-all shadow-md shadow-[#D3AB80]/20 hover:-translate-y-0.5"
        >
          <Plus size={18} strokeWidth={2.5} />
          Nuevo Tercero
        </button>
      </div>

      {/* BARRA DE FILTROS */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
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
        <button className="bg-[#1f2937] hover:bg-black text-white p-3 rounded-xl transition-colors shrink-0 flex items-center justify-center">
          <Search size={20} />
        </button>
      </div>`;

content = content.replace(/  return \([\s\S]*?{?\/\* BARRA DE BÚSQUEDA \*\/}?[\s\S]*?<\/div>\n      <\/div>/, newHeader);

fs.writeFileSync('src/app/admin/terceros/general/page.tsx', content);

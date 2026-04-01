export default function AdminDashboard() {
  return (
    <div className="p-10 w-full h-full text-[#472825]">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-black">Centro de Análisis DOHA</h1>
        <p className="text-gray-500 mt-2 font-medium">
          Sistema de gestión empresarial para joyería de 18K.
        </p>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center max-w-2xl mx-auto mt-20">
        <h2 className="text-xl font-bold text-[#D3AB80] mb-4">
          ¡Base de operaciones lista!
        </h2>
        <p className="text-gray-600 font-medium">
          El cascarón del proyecto está funcionando perfectamente. Selecciona
          una opción en el menú oscuro de la izquierda para navegar.
        </p>
      </div>
    </div>
  );
}

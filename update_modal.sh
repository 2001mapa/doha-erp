#!/bin/bash
# We will use sed to make targeted changes to src/app/admin/facturacion/facturas/page.tsx

# First we need to add the new states
sed -i 's/const \[isSaving, setIsSaving\] = useState(false);/const [isSaving, setIsSaving] = useState(false);\n  const [showCreateForm, setShowCreateForm] = useState(false);\n  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("REM");/g' src/app/admin/facturacion/facturas/page.tsx

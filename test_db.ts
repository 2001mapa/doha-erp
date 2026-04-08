import { supabase } from './src/lib/supabaseClient';
async function test() {
  const { data: p } = await supabase.from('permisos').select('*');
  const { data: pr } = await supabase.from('permisos_rol').select('*, permisos(*)');
  const { data: r } = await supabase.from('roles').select('*');
  console.log('permisos:', p);
  console.log('permisos_rol:', pr);
  console.log('roles:', r);
}
test();

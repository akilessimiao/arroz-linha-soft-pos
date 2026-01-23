import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bem-vindo ao Dashboard, {user.email}!</h1>
      <p>Aqui você gerencia preços, produtos, vendas...</p>
    </div>
  );
}
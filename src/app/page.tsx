import Link from "next/link";
import { toast } from "sonner"; // Se quiser usar toasts no futuro para erros

export default function LoginPage() {
  // Função placeholder para submit (integre com Supabase depois)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui vai a lógica de login com Supabase
    // Exemplo:
    // const formData = new FormData(e.currentTarget);
    // const email = formData.get("usuario") as string;
    // const password = formData.get("senha") as string;
    // const { error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) toast.error("Erro ao logar");
    // else redirect("/dashboard");

    toast("Funcionalidade de login em desenvolvimento!", {
      description: "Integre com Supabase para autenticação real.",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Logo / Ícone principal */}
      <div className="mb-8 flex flex-col items-center">
        {/* SVG inline como placeholder para sua logomarca (círculo azul + figura estilizada) */}
        <div className="relative h-32 w-32">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Círculo azul de fundo */}
            <circle cx="50" cy="50" r="45" fill="#3B82F6" />
            {/* Figura estilizada simples (pessoa + carrinho abstrato) */}
            <path
              d="M50 30 C40 30 32 38 32 48 C32 58 40 66 50 66 C60 66 68 58 68 48 C68 38 60 30 50 30 Z"
              fill="white"
            />
            <rect x="38" y="55" width="24" height="15" rx="4" fill="white" />
            <circle cx="42" cy="72" r="5" fill="#1E40AF" />
            <circle cx="58" cy="72" r="5" fill="#1E40AF" />
          </svg>
        </div>

        {/* Se você tiver uma imagem real da logomarca, substitua o SVG acima por: */}
        {/* <Image
          src="/logo-arroz-linha.png"  // Coloque sua imagem na pasta public/
          alt="Arroz & Linha Soft Logo"
          width={128}
          height={128}
          className="rounded-full"
          priority
        /> */}

        <h1 className="mt-6 text-4xl font-bold text-blue-900">
          Arroz & Linha Soft
        </h1>
        <p className="mt-2 text-lg text-gray-600 text-center max-w-md">
          Do arroz ao botão, tudo no seu controle!
        </p>
      </div>

      {/* Formulário de Login */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6 rounded-xl bg-white p-8 shadow-xl"
      >
        <div className="space-y-2">
          <label
            htmlFor="usuario"
            className="block text-sm font-medium text-gray-700"
          >
            Usuário
          </label>
          <input
            id="usuario"
            name="usuario"
            type="text"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Digite seu usuário"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Digite sua senha"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Login
        </button>

        <div className="text-center text-sm">
          <Link
            href="/forgot-password" // Crie essa página depois se quiser
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
      </form>

      {/* Rodapé opcional */}
      <p className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Arroz & Linha Soft – Todos os direitos reservados
      </p>
    </main>
    );
}
    
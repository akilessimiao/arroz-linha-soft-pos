# Arroz & Linha Soft

**Do arroz ao botão, tudo no seu controle!**

Sistema de PDV (ponto de venda) + gestão de estoque simples para mercadinhos, armarinhos e pequenos comércios.

Funcionalidades principais:
- Tela de login
- Cadastro de produtos e preços pelo cliente
- Upload de logomarca e nome do empreendimento
- Tela de venda (PDV) com opções: Pix, Dinheiro, Cartão
- Dashboard básico com vendas do dia/mês
- Branding fixo: Arroz & Linha Soft sempre visível

Tecnologias planejadas: [Next.js 14+ / React + TypeScript] + [Supabase ou Firebase] + TailwindCSS

**Estrutura sugerida de pastas:**
src/
├── app/
│   ├── login/
│   │   └── page.tsx           ← tela de login
│   ├── dashboard/
│   │   ├── page.tsx           ← dashboard principal
│   │   ├── precos/            ← tela para alterar preços
│   │   ├── produtos/          ← cadastro/edição de produtos
│   │   ├── configuracao/      ← logomarca + nome do negócio
│   │   └── vendas/            ← PDV (tela de venda)
│   ├── layout.tsx             ← layout global (mostra sempre "Arroz & Linha Soft")
│   └── page.tsx               ← redireciona para login ou dashboard
├── components/
│   ├── ui/                    ← shadcn/ui ou componentes próprios
│   ├── CartAnimated.tsx       ← carrinho animado/cartoon
│   └── LogoComercio.tsx       ← espaço para logo do cliente
├── lib/
│   └── supabase.ts            ← client + server supabase
└── types/
    └── index.ts

3. Estrutura inicial do projeto (Next.js + Supabase)
Após criar o repositório:
Bashnpx create-next-app@latest arroz-linha-soft-pos --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd arroz-linha-soft-pos
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs lucide-react sonner
Estrutura sugerida de pastas:
textsrc/
├── app/
│   ├── login/
│   │   └── page.tsx           ← tela de login
│   ├── dashboard/
│   │   ├── page.tsx           ← dashboard principal
│   │   ├── precos/            ← tela para alterar preços
│   │   ├── produtos/          ← cadastro/edição de produtos
│   │   ├── configuracao/      ← logomarca + nome do negócio
│   │   └── vendas/            ← PDV (tela de venda)
│   ├── layout.tsx             ← layout global (mostra sempre "Arroz & Linha Soft")
│   └── page.tsx               ← redireciona para login ou dashboard
├── components/
│   ├── ui/                    ← shadcn/ui ou componentes próprios
│   ├── CartAnimated.tsx       ← carrinho animado/cartoon
│   └── LogoComercio.tsx       ← espaço para logo do cliente
├── lib/
│   └── supabase.ts            ← client + server supabase
└── types/
    └── index.ts
4. Funcionalidades mínimas iniciais (MVP)

Login
Supabase Auth (email + senha)
Após login → salva perfil com nome_comercio, logo_url

Configuração inicial do comércio
Primeira vez: formulário para nome + upload de logo (Supabase Storage)
Depois: aparece no header/topo do dashboard

Cadastro de produtos
Campos: nome, código barras (opcional), preço_venda, estoque_atual, categoria
Foto do produto (opcional)

Tela de venda (PDV)
Busca produto (por nome/código)
Carrinho animado (o bonequinho que criamos)
Total, descontos
Finalizar com:
Dinheiro
Pix (gera QR Code via Asaas/Mercado Pago)
Cartão (integração futura ou só registrar)


Dashboard cliente
Resumo vendas do dia/mês
Produtos mais vendidos
Estoque baixo

Branding fixo
Footer ou canto fixo: "Powered by Arroz & Linha Soft – Do arroz ao botão, tudo no seu controle!"


5. Integração Pix (essencial para Brasil)
Opções reais e baratas (2026):

Asaas → taxa baixa, API boa, gera QR Code instantâneo
Mercado Pago → Checkout Pro ou Pix via API
Pagar.me / Stone / PagSeguro → todas têm SDKs

Exemplo mínimo com Asaas (recomendado para começar):
tsx// src/app/api/pix/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { valor, descricao } = await req.json()
  
  const response = await fetch('https://api.asaas.com/v3/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access_token': process.env.ASAAS_API_KEY!
    },
    body: JSON.stringify({
      value: valor,
      description: descricao,
      billingType: 'PIX',
      dueDate: new Date().toISOString().split('T')[0]
    })
  })

  const data = await response.json()
  return NextResponse.json({ qrCode: data.invoiceUrl, copiaCola: data.pixKey })
}
6. Próximos passos concretos (hoje/próximos dias)

Crie o repositório e faça o primeiro commit com README + .gitignore
Inicialize Next.js + Supabase (crie projeto grátis em supabase.com)
Implemente tela de login + autenticação (use docs do Supabase Auth + Next.js)
Crie tabela perfis no Supabase com campos: user_id, nome_comercio, logo_url
Adicione upload de logo (Supabase Storage)
Implemente tela de cadastro de produtos simples
Adicione o bonequinho cartoon como componente reutilizável (ex: carrinho animado)

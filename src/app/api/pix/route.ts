// src/app/api/pix/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { valor, descricao, clienteId, vendaId } = body;

    // Validações básicas
    if (!valor || valor <= 0) {
      return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });
    }
    if (!descricao) {
      return NextResponse.json({ error: 'Descrição obrigatória' }, { status: 400 });
    }

    // Sua chave API do Asaas (pegue no painel: https://app.asaas.com/integrations/api)
    const asaasApiKey = process.env.ASAAS_API_KEY;
    if (!asaasApiKey) {
      console.error('ASAAS_API_KEY não configurada no .env');
      return NextResponse.json({ error: 'Configuração do servidor inválida' }, { status: 500 });
    }

    // Endpoint da Asaas para criar cobrança Pix
    const response = await fetch('https://api.asaas.com/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': asaasApiKey,  // chave de produção ou sandbox
      },
      body: JSON.stringify({
        customer: clienteId,          // ID do cliente no Asaas (crie antes ou use um fixo para testes)
        billingType: 'PIX',
        value: Number(valor),
        description: descricao || 'Venda no Arroz & Linha Soft',
        dueDate: new Date().toISOString().split('T')[0],  // vence hoje
        externalReference: vendaId || 'venda-' + Date.now(),  // referência interna sua
        // Opcional: split, fine, interest, etc.
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro Asaas:', errorData);
      return NextResponse.json(
        { error: errorData.description || 'Erro ao gerar Pix' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Agora pegue o QR Code e payload (copia e cola)
    const qrResponse = await fetch(`https://api.asaas.com/v3/payments/${data.id}/pixQrCode`, {
      method: 'GET',
      headers: {
        'access_token': asaasApiKey,
      },
    });

    const qrData = await qrResponse.json();

    return NextResponse.json({
      success: true,
      paymentId: data.id,
      qrCodeBase64: qrData.encodedImage,      // imagem em base64 para mostrar
      copiaCola: qrData.payload,              // chave copia e cola
      expirationDate: qrData.expirationDate,
      status: data.status,
    });
  } catch (error: any) {
    console.error('Erro na rota /api/pix:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar Pix' },
      { status: 500 }
    );
  }
}
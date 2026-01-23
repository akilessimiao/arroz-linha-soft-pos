'use client';

import { useState } from 'react';

export default function VendasPage() {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [qrBase64, setQrBase64] = useState<string | null>(null);
  const [copiaCola, setCopiaCola] = useState<string | null>(null);

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const handlePix = async () => {
    if (total <= 0) return alert('Carrinho vazio');

    const res = await fetch('/api/pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        valor: total,
        descricao: 'Venda PDV - Arroz & Linha Soft',
        clienteId: 'cus_000000000000000', // ← coloque o ID real do Asaas
        vendaId: 'venda-' + Date.now(),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setQrBase64(data.qrCodeBase64);
      setCopiaCola(data.copiaCola);
    } else {
      alert('Erro: ' + data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">PDV - Arroz & Linha Soft</h1>

      {/* Área do carrinho (simplificado) */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Carrinho</h2>
        {/* Aqui você lista os itens – por enquanto vazio */}
        <p className="text-gray-500">Adicione produtos...</p>
        <div className="mt-4 text-right text-2xl font-bold">
          Total: R$ {total.toFixed(2)}
        </div>
      </div>

      {/* Botão Pix */}
      <button
        onClick={handlePix}
        className="w-full bg-green-600 text-white py-4 rounded-xl text-xl font-bold hover:bg-green-700"
      >
        Gerar Pix
      </button>

      {/* Exibição do QR */}
      {qrBase64 && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-xl font-bold mb-4">Pagamento via Pix</h3>
          <img
            src={`data:image/png;base64,${qrBase64}`}
            alt="QR Code Pix"
            className="mx-auto w-64 h-64 mb-6"
          />
          <div className="bg-gray-100 p-4 rounded text-sm font-mono break-all mb-4">
            {copiaCola}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(copiaCola || '')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Copiar código
          </button>
        </div>
      )}
    </div>
  );
}
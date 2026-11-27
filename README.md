# Site da Loja — Roupas e Acessórios

Site de vendas completo e 100% estático (HTML + CSS + JavaScript puro): não precisa de servidor, banco de dados nem pagamento de hospedagem — funciona em qualquer hospedagem gratuita (GitHub Pages, Netlify, Vercel, etc.).

## O que o site faz

- **Vitrine de produtos** com busca e filtro por categoria (`index.html`)
- **Página de produto** com quantidade e pedido direto pelo WhatsApp (`produto.html?id=1`)
- **Carrinho de compras** salvo no navegador do cliente (`carrinho.html`)
- **Checkout em duas formas**:
  - 🚚 Entrega — o pedido é enviado como mensagem pronta no WhatsApp da loja
  - 🏪 Retirada na loja física — gera um código de 6 dígitos para apresentar na loja
- **Página "Nossa Loja"** com endereço, horário, contato e link para o Google Maps (`nossa-loja.html`)

## Como personalizar

### 1. Dados da loja — `js/config.js`

Altere nome, WhatsApp, endereço, horário, e-mail, Instagram, cores e valores de entrega:

```js
whatsapp: "351912345678",   // código do país (351) + número, só dígitos
endereco: "Terminal",
cep: "2840-000",
plusCode: "JWW3+XP Seixal", // Plus Code do Google Maps — usado no link "Abrir no Google Maps"
cidade: "Seixal, Setúbal",
formasPagamento: "MB WAY, transferência bancária ou dinheiro na loja",
notaSinal: "Pagamento em dinheiro na loja exige um sinal de pelo menos 1/3 do valor do pedido, para garantir a retirada.",
sinalMinimo: 1 / 3,          // fração mínima do total como sinal na retirada em dinheiro
```

### 2. Produtos — `js/produtos.js`

Cada produto é um objeto dentro do array `produtos`:

```js
{
  id: 13,
  nome: "Saia Midi Plissada",
  categoria: "Saias",        // nova categoria aparece sozinha nos filtros
  preco: 89.9,
  precoAntigo: 119.9,        // opcional — mostra o desconto em %
  emoji: "👗",               // "foto" do produto
  cor: ["#fce7f3", "#f9a8d4"], // gradiente do cartão
  descricao: "Tecido leve plissado..."
}
```

Basta copiar um bloco existente, mudar os valores e salvar. Para usar fotos reais no lugar dos emojis, troque o `emoji` por uma tag `<img src="...">` no campo e ajuste o CSS se necessário.

O menu **☰ Opções** no topo do site (estilo "settings") lista as categorias principais — Crianças, Mulher, Homem, Praia, Acessórios — e cada uma abre o catálogo já filtrado: `index.html?cat=NOME_DA_CATEGORIA#catalogo` (ex.: `index.html?cat=Praia#catalogo`). Para mudar as opções do menu, edite o bloco `menu-opcoes` em `js/app.js`.

### 3. Cores — também em `js/config.js`

`corPrimaria`, `corDestaque` e `corWhatsApp` (formato `#rrggbb`).

## Como publicar de graça

1. Crie uma conta no GitHub e um repositório (ex.: `minha-loja`).
2. Envie a pasta `loja` para o repositório.
3. No repositório: **Settings → Pages → Source: Deploy from a branch → pasta raiz (`/`) → Save**.
4. Em alguns minutos o site fica no ar em `https://seu-usuario.github.io/minha-loja/`.

Também funciona arrastando a pasta para o Netlify (netlify.com/drop) ou Vercel.

## Observações

- O carrinho fica salvo apenas no navegador do cliente (localStorage) — por isso o pedido final vai pelo WhatsApp ou com código de retirada, que é o fluxo ideal para loja física pequena.
- Para vender com pagamento online automático (cartão/Pix no próprio site), seria necessário integrar um gateway (Mercado Pago, Stripe etc.) — dá para adicionar depois.
- Nunca coloque senhas ou chaves de API neste projeto: ele é só frontend.

# Site da Loja — Roupas e Acessórios

Site de vendas completo e 100% estático (HTML + CSS + JavaScript puro): não precisa de servidor, banco de dados nem pagamento de hospedagem — funciona em qualquer hospedagem gratuita (GitHub Pages, Netlify, Vercel, etc.).

## O que o site faz

- **Novidades**, **Mais vistos** e **Escolhidos em cada setor** são três carrosséis automáticos horizontais com foto: máx. 4 cartões por linha (3/2/1 no telemóvel), avançam 1 cartão a cada 3,5 s e têm setas ‹ › nas laterais (as setas escondem-se quando há poucos produtos)

- **Vitrine de produtos** com campo de pesquisa dentro da secção do catálogo e filtro por categoria (`index.html`); o topo do site tem só o logótipo + nome da empresa e o botão de menu ☰
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
paypal: "",                 // link PayPal.Me ou e-mail PayPal — se vazio, não aparece no site
formasPagamento: "PayPal, MB WAY ou transferência bancária",
notaSinal: "Para levantar na loja é obrigatório um sinal de 10% do valor total; prazo de 3 dias úteis.",
sinalMinimo: 0.1,           // 10% de sinal obrigatório no levantamento na loja física
prazoRetiradaDiasUteis: 3,  // dias úteis que o cliente tem para levantar a encomenda na loja
mbway: "",                 // número MB WAY para pagamento do sinal
iban: "",                  // IBAN para transferência do sinal
notaAceite: "Encomenda aceite! Podes ir levantar a partir de {data}.",
notaSaldo: "Passado o prazo, a encomenda é cancelada e o valor volta como saldo da loja (não ao banco)."
```

**Fluxo de levantamento na loja** (`carrinho.html` → "Retirar na loja física"): o site calcula o sinal (10%) automaticamente, mostra as instruções de pagamento e só depois do pagamento apresenta o código de retirada, com nota de encomenda aceite, data/hora mínima de levantamento e um contador ao vivo (dias/horas/minutos) até ao fim do prazo. Se algum produto tiver `fornecedorDias: N` (ex.: produto que vem do fornecedor), o site avisa o motivo e pergunta se o cliente aceita esperar esses dias antes de pagar. Passado o prazo, a encomenda é cancelada e o valor fica como **saldo da loja**.

No checkout (`carrinho.html`) o cliente escolhe **entrega em morada** (aparece um campo "Morada de entrega") ou **levantamento na loja física** (mostra o código de retirada, o valor do sinal de 10% e o prazo de 3 dias úteis). O pedido final é enviado pelo WhatsApp com todos estes dados.

### 2. Produtos — `js/produtos.js`

Cada produto é um objeto dentro do array `produtos`:

```js
{
  id: 13,
  nome: "Saia Midi Plissada",
  categoria: "Saias",        // nova categoria aparece sozinha nos filtros
  preco: 89.9,
  precoAntigo: 119.9,        // opcional — mostra o desconto em %
  cor: ["#fce7f3", "#f9a8d4"], // gradiente do cartão (a "foto" é o nome do produto sobre esta cor)
  novo: true,          // opcional — entra no carrossel automático "Novidades" (tag NOVO)
  bestseller: true,    // opcional — entra na secção "Mais vistos" (tag MAIS VISTO)
  destaque: true,      // opcional — entra na secção "Escolhidos em cada setor" (convém 1 por categoria)
  descricao: "Tecido leve plissado..."
}
```

Basta copiar um bloco existente, mudar os valores e salvar. Para usar **fotos reais**, coloca a imagem na pasta `fotos/` e adiciona o campo `foto: "fotos/nome-da-imagem.jpg"` ao produto — o cartão, a página do produto e o carrinho passam a mostrar a foto automaticamente (sem foto, mostra o nome do produto sobre a cor).

O menu **Opções** no topo do site (estilo "settings") lista as categorias principais — Crianças, Mulher, Homem, Praia, Acessórios — e cada uma abre o catálogo já filtrado: `index.html?cat=NOME_DA_CATEGORIA#catalogo` (ex.: `index.html?cat=Praia#catalogo`). Para mudar as opções do menu, edite o bloco `menu-opcoes` em `js/app.js`.

### 3. Cores e fundo — também em `js/config.js`

`corPrimaria` (azul-mar #0d3b66), `corDestaque` (ouro #c9973f), `corWhatsApp`, `corFundo` (fundo #fdfbf7) — formato `#rrggbb`. Os títulos usam fonte serif (Georgia) para o ar premium europeu, `imagemFundo` (caminho da imagem de fundo, ex.: `"fotos/fundo-site.png"`; vazio `""` = só cor) e `logo` + `logoNome` (imagem do logótipo no cabeçalho e centrada no início da página, com o nome ao lado, ex.: `"fotos/logo.png"` e `"à Beira-Mar"`; vazio `""` = só texto).

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

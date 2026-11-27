const CARRINHO_KEY = "carrinho_loja";
let qtdDetalhe = 1;
let categoriaAtiva = "todas";
let buscaAtiva = "";

function formatarPreco(v) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(v);
}

function getCarrinho() {
  try {
    return JSON.parse(localStorage.getItem(CARRINHO_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function salvarCarrinho(carrinho) {
  localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
  atualizarBadge();
}

function adicionarAoCarrinho(id, qtd) {
  qtd = qtd || 1;
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === id);
  if (item) {
    item.qtd += qtd;
  } else {
    carrinho.push({ id: id, qtd: qtd });
  }
  salvarCarrinho(carrinho);
  abrirToast("Adicionado ao carrinho");
}

function removerDoCarrinho(id) {
  salvarCarrinho(getCarrinho().filter(i => i.id !== id));
  if (document.getElementById("lista-carrinho")) renderizarCarrinho();
}

function alterarQtd(id, delta) {
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd < 1) {
    removerDoCarrinho(id);
    return;
  }
  salvarCarrinho(carrinho);
  if (document.getElementById("lista-carrinho")) renderizarCarrinho();
}

function limparCarrinho() {
  salvarCarrinho([]);
}

function produtoPorId(id) {
  return produtos.find(p => p.id === id);
}

function qtdTotal() {
  return getCarrinho().reduce((s, i) => s + i.qtd, 0);
}

function subtotalCarrinho() {
  return getCarrinho().reduce((s, i) => {
    const p = produtoPorId(i.id);
    return s + (p ? p.preco * i.qtd : 0);
  }, 0);
}

function atualizarBadge() {
  const n = qtdTotal();
  document.querySelectorAll(".badge-carrinho").forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? "inline-flex" : "none";
  });
}

function aplicarCores() {
  const r = document.documentElement.style;
  r.setProperty("--primaria", CONFIG.corPrimaria);
  r.setProperty("--destaque", CONFIG.corDestaque);
  r.setProperty("--whatsapp", CONFIG.corWhatsApp);
  document.title = CONFIG.nomeLoja + " — Roupas e acessórios";
}

function renderizarCabecalho() {
  const el = document.getElementById("cabecalho");
  if (!el) return;
  el.innerHTML = `
    <header class="topo">
      <div class="container topo-inner">
        <a class="logo" href="index.html">${CONFIG.nomeLoja}</a>
        <nav class="nav">
          <div class="menu-opcoes" id="menu-opcoes">
            <button type="button" class="opcoes-btn" id="btn-opcoes">Opções ▾</button>
            <div class="opcoes-lista" id="lista-opcoes">
              <a href="index.html?cat=Crianças#catalogo">Crianças</a>
              <a href="index.html?cat=Mulher#catalogo">Mulher</a>
              <a href="index.html?cat=Homem#catalogo">Homem</a>
              <a href="index.html?cat=Praia#catalogo">Praia</a>
              <a href="index.html?cat=Acessórios#catalogo">Acessórios</a>
            </div>
          </div>
          <a href="index.html">Início</a>
          <a href="index.html#catalogo">Produtos</a>
          <a href="nossa-loja.html">Nossa Loja</a>
          <a href="carrinho.html" class="link-carrinho">Carrinho <span class="badge-carrinho">0</span></a>
        </nav>
      </div>
    </header>`;
  const w = document.getElementById("botao-whatsapp");
  if (w) w.href = "https://wa.me/" + CONFIG.whatsapp;
  const menu = document.getElementById("menu-opcoes");
  const btn = document.getElementById("btn-opcoes");
  if (menu && btn) {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      menu.classList.toggle("aberto");
    });
    document.addEventListener("click", () => menu.classList.remove("aberto"));
  }
}

function renderizarRodape() {
  const el = document.getElementById("rodape");
  if (!el) return;
  el.innerHTML = `
    <footer class="rodape">
      <div class="container">
        <div class="rodape-grid">
          <div>
            <h3>${CONFIG.nomeLoja}</h3>
            <p>${CONFIG.slogan}</p>
          </div>
          <div>
            <h3>Loja física</h3>
            <p>${CONFIG.endereco}, ${CONFIG.cidade}${CONFIG.cep && CONFIG.cep !== "00000-000" ? " — CEP " + CONFIG.cep : ""}${CONFIG.plusCode ? `<br>${CONFIG.plusCode}` : ""}<br>${CONFIG.horario}</p>
          </div>
          <div>
            <h3>Contacto</h3>
            <p><a id="rodape-whatsapp" target="_blank" rel="noopener">WhatsApp da loja</a><br>${CONFIG.email}<br>${CONFIG.instagram}</p>
          </div>
        </div>
        <div class="rodape-bottom">© ${new Date().getFullYear()} ${CONFIG.nomeLoja} — Todos os direitos reservados.</div>
      </div>
    </footer>`;
  const w = document.getElementById("rodape-whatsapp");
  if (w) w.href = "https://wa.me/" + CONFIG.whatsapp;
}

function cardProduto(p) {
  const desconto = p.precoAntigo ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;
  return `
    <article class="card">
      <a class="card-img" href="produto.html?id=${p.id}" style="background: linear-gradient(135deg, ${p.cor[0]}, ${p.cor[1]})">
        <span class="card-titulo-img">${p.nome}</span>
        ${desconto ? `<span class="tag-desconto">-${desconto}%</span>` : ""}
        ${p.novo ? `<span class="tag-novo">NOVO</span>` : ""}
        ${p.bestseller ? `<span class="tag-mais-vendido">MAIS VENDIDO</span>` : ""}
      </a>
      <div class="card-corpo">
        <span class="card-cat">${p.categoria}</span>
        <h3 class="card-nome"><a href="produto.html?id=${p.id}">${p.nome}</a></h3>
        <p class="card-preco">${p.precoAntigo ? `<s>${formatarPreco(p.precoAntigo)}</s>` : ""}<strong>${formatarPreco(p.preco)}</strong></p>
        <button class="btn btn-adicionar" onclick="adicionarAoCarrinho(${p.id})">Adicionar ao carrinho</button>
      </div>
    </article>`;
}

function renderizarBotoesCategorias() {
  const div = document.getElementById("botoes-categorias");
  const cats = ["todas"].concat([...new Set(produtos.map(p => p.categoria))]);
  div.innerHTML = cats.map(c =>
    `<button class="filtro ${c === categoriaAtiva ? "ativo" : ""}" data-cat="${c}">${c === "todas" ? "Todos" : c}</button>`
  ).join("");
  div.querySelectorAll(".filtro").forEach(b =>
    b.addEventListener("click", () => {
      categoriaAtiva = b.dataset.cat;
      renderizarBotoesCategorias();
      renderizarCatalogo();
    })
  );
}

function renderizarCatalogo() {
  const div = document.getElementById("lista-produtos");
  const lista = produtos.filter(p =>
    (categoriaAtiva === "todas" || p.categoria === categoriaAtiva) &&
    p.nome.toLowerCase().includes(buscaAtiva.toLowerCase())
  );
  div.innerHTML = lista.length
    ? lista.map(cardProduto).join("")
    : `<p class="vazio">Nenhum produto encontrado. Tente outra pesquisa.</p>`;
}

function renderizarSecaoHome(idLista, lista) {
  const div = document.getElementById(idLista);
  if (!div) return;
  const secao = div.closest("section");
  if (!lista.length) {
    if (secao) secao.style.display = "none";
    return;
  }
  div.innerHTML = lista.map(cardProduto).join("");
}

function iniciarHome() {
  renderizarSecaoHome("lista-novidades", produtos.filter(p => p.novo));
  renderizarSecaoHome("lista-mais-vendidos", produtos.filter(p => p.bestseller));
  renderizarSecaoHome("lista-destaques", produtos.filter(p => p.destaque));
}

function iniciarCatalogo() {
  const catParam = new URLSearchParams(location.search).get("cat");
  if (catParam) {
    const encontrada = [...new Set(produtos.map(p => p.categoria))].find(c => c.toLowerCase() === catParam.toLowerCase());
    if (encontrada) categoriaAtiva = encontrada;
  }
  renderizarBotoesCategorias();
  renderizarCatalogo();
  document.getElementById("busca").addEventListener("input", e => {
    buscaAtiva = e.target.value;
    renderizarCatalogo();
  });
}

function mudarQtdDetalhe(d) {
  qtdDetalhe = Math.max(1, qtdDetalhe + d);
  const el = document.getElementById("qtd-detalhe");
  if (el) el.textContent = qtdDetalhe;
}

function adicionarQtdDetalhe(id) {
  adicionarAoCarrinho(id, qtdDetalhe);
}

function linkWhatsAppProduto(p) {
  const msg = `Olá! Quero comprar no site da *${CONFIG.nomeLoja}*:\n\n• ${p.nome} (x${qtdDetalhe}) — ${formatarPreco(p.preco * qtdDetalhe)}\n\nTotal: *${formatarPreco(p.preco * qtdDetalhe)}*`;
  return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
}

function iniciarDetalhe() {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get("id"), 10);
  const p = produtoPorId(id);
  const div = document.getElementById("detalhe-produto");
  if (!p) {
    div.innerHTML = `<section class="pagina"><p class="vazio">Produto não encontrado. <a href="index.html">Voltar ao catálogo</a></p></section>`;
    return;
  }
  qtdDetalhe = 1;
  const desconto = p.precoAntigo ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;
  div.innerHTML = `
    <div class="detalhe">
      <div class="detalhe-img" style="background: linear-gradient(135deg, ${p.cor[0]}, ${p.cor[1]})">
        ${p.nome}
        ${desconto ? `<span class="tag-desconto">-${desconto}%</span>` : ""}
      </div>
      <div class="detalhe-info">
        <span class="card-cat">${p.categoria}</span>
        <h1>${p.nome}</h1>
        <p class="detalhe-preco">${p.precoAntigo ? `<s>${formatarPreco(p.precoAntigo)}</s>` : ""}<strong>${formatarPreco(p.preco)}</strong></p>
        <p class="detalhe-desc">${p.descricao}</p>
        <div class="detalhe-acoes">
          <div class="seletor-qtd">
            <button onclick="mudarQtdDetalhe(-1)">−</button>
            <span id="qtd-detalhe">1</span>
            <button onclick="mudarQtdDetalhe(1)">+</button>
          </div>
          <button class="btn" onclick="adicionarQtdDetalhe(${p.id})">Adicionar ao carrinho</button>
        </div>
        <div class="detalhe-acoes">
          <a class="btn btn-whatsapp" id="link-whatsapp-produto" target="_blank" rel="noopener">Pedir pelo WhatsApp</a>
          <a class="btn btn-claro" href="index.html#catalogo">Continuar comprando</a>
        </div>
      </div>
    </div>`;
  const w = document.getElementById("link-whatsapp-produto");
  if (w) w.href = linkWhatsAppProduto(p);
  const relacionados = produtos.filter(x => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);
  const secao = document.getElementById("relacionados");
  if (secao && relacionados.length) {
    secao.innerHTML = `<h2>Também lhe pode interessar</h2><div class="grade">${relacionados.map(cardProduto).join("")}</div>`;
  }
}

function renderizarCarrinho() {
  const div = document.getElementById("lista-carrinho");
  const carrinho = getCarrinho();
  const area = document.getElementById("area-pedido");
  if (!carrinho.length) {
    div.innerHTML = `<div class="carrinho-vazio"><p>O teu carrinho está vazio.</p><a class="btn" href="index.html">Ver produtos</a></div>`;
    if (area) area.style.display = "none";
    return;
  }
  if (area) area.style.display = "block";
  div.innerHTML = carrinho.map(i => {
    const p = produtoPorId(i.id);
    if (!p) return "";
    return `
      <div class="item-carrinho">
        <div class="item-img" style="background: linear-gradient(135deg, ${p.cor[0]}, ${p.cor[1]})">${p.nome}</div>
        <div class="item-info">
          <a href="produto.html?id=${p.id}"><strong>${p.nome}</strong></a>
          <span class="item-cat">${p.categoria}</span>
          <span class="item-preco">${formatarPreco(p.preco)} cada</span>
        </div>
        <div class="item-qtd">
          <button onclick="alterarQtd(${p.id}, -1)">−</button>
          <span>${i.qtd}</span>
          <button onclick="alterarQtd(${p.id}, 1)">+</button>
        </div>
        <div class="item-total">${formatarPreco(p.preco * i.qtd)}</div>
        <button class="item-remover" onclick="removerDoCarrinho(${p.id})" title="Remover">Remover</button>
      </div>`;
  }).join("");
  atualizarResumo();
  atualizarBadge();
}

function entregaSelecionada() {
  const r = document.querySelector('input[name="forma"]:checked');
  return r ? r.value : "entrega";
}

function valorEntrega() {
  if (entregaSelecionada() === "retirada") return 0;
  const sub = subtotalCarrinho();
  if (CONFIG.entregaGratisAcimaDe > 0 && sub >= CONFIG.entregaGratisAcimaDe) return 0;
  return CONFIG.taxaEntrega;
}

function atualizarResumo() {
  const sub = subtotalCarrinho();
  const ent = valorEntrega();
  const retirada = entregaSelecionada() === "retirada";
  document.getElementById("resumo-subtotal").textContent = formatarPreco(sub);
  document.getElementById("resumo-entrega").textContent = retirada
    ? "Grátis (retirada na loja)"
    : (ent === 0 ? "Grátis" : formatarPreco(ent));
  document.getElementById("resumo-total").textContent = formatarPreco(sub + ent);
}

function montarMensagemPedido(forma, nome, telefone, morada, obs) {
  const carrinho = getCarrinho();
  const linhas = carrinho.map(i => {
    const p = produtoPorId(i.id);
    return `• ${p.nome} (x${i.qtd}) — ${formatarPreco(p.preco * i.qtd)}`;
  });
  const sub = subtotalCarrinho();
  const ent = valorEntrega();
  const pctSinal = Math.round(CONFIG.sinalMinimo * 100);
  let msg = `Olá! Quero fazer uma encomenda na *${CONFIG.nomeLoja}*\n\n${linhas.join("\n")}\n\nSubtotal: ${formatarPreco(sub)}\n`;
  if (forma === "retirada") {
    const sinal = Math.ceil((sub + ent) * CONFIG.sinalMinimo * 100) / 100;
    msg += `Forma: levantamento na loja física (portes grátis)\nSinal obrigatório (${pctSinal}% do total): ${formatarPreco(sinal)} — prazo de ${CONFIG.prazoRetiradaDiasUteis} dias úteis para levantar\n`;
  } else {
    msg += `Forma: entrega em morada (${ent === 0 ? "portes grátis" : "portes " + formatarPreco(ent)})\n`;
    if (morada) msg += `Morada de entrega: ${morada}\n`;
  }
  msg += `*Total: ${formatarPreco(sub + ent)}*\n`;
  msg += `Pagamento: ${CONFIG.formasPagamento}` + (CONFIG.paypal ? ` — PayPal: ${CONFIG.paypal}` : "") + "\n";
  if (nome) msg += `Nome: ${nome}\n`;
  if (telefone) msg += `Telemóvel: ${telefone}\n`;
  if (obs) msg += `Observações: ${obs}`;
  return msg;
}

function finalizarPedido() {
  const carrinho = getCarrinho();
  if (!carrinho.length) return;
  const forma = entregaSelecionada();
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const obs = document.getElementById("obs").value.trim();
  const campoMorada = document.getElementById("morada");
  const morada = campoMorada ? campoMorada.value.trim() : "";
  const msg = montarMensagemPedido(forma, nome, telefone, morada, obs);
  const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
  const resultado = document.getElementById("resultado-pedido");
  if (forma === "retirada") {
    const codigo = String(Math.floor(100000 + Math.random() * 900000));
    const total = subtotalCarrinho() + valorEntrega();
    const sinal = Math.ceil(total * CONFIG.sinalMinimo * 100) / 100;
    resultado.innerHTML = `
      <div class="pedido-ok">
        <h2>Pedido registado!</h2>
        <p>O seu código de retirada é:</p>
        <span class="codigo">${codigo}</span>
        <p>Apresente este código na nossa loja física:<br><strong>${CONFIG.endereco}, ${CONFIG.cidade}</strong></p>
        <p>Pagamento: <strong>${CONFIG.formasPagamento}</strong>${CONFIG.paypal ? ` — PayPal: <a href="${CONFIG.paypal}" target="_blank" rel="noopener">${CONFIG.paypal}</a>` : ""}.</p>
        <p>${CONFIG.notaSinal}</p>
        <p>Sinal obrigatório neste pedido (${Math.round(CONFIG.sinalMinimo * 100)}%): <strong>${formatarPreco(sinal)}</strong> · Prazo para levantar: <strong>${CONFIG.prazoRetiradaDiasUteis} dias úteis</strong>.</p>
        <a class="btn btn-whatsapp" href="${url}" target="_blank" rel="noopener">Confirmar também pelo WhatsApp</a>
      </div>`;
  } else {
    resultado.innerHTML = `
      <div class="pedido-ok">
        <h2>Quase pronto!</h2>
        <p>Reveja e envie o seu pedido pelo WhatsApp da loja para confirmarmos a entrega:</p>
        <a class="btn btn-whatsapp" href="${url}" target="_blank" rel="noopener">Enviar pedido no WhatsApp</a>
      </div>`;
  }
  limparCarrinho();
  renderizarCarrinho();
  resultado.scrollIntoView({ behavior: "smooth" });
}

function iniciarCarrinho() {
  renderizarCarrinho();
  const campoMorada = document.getElementById("campo-morada");
  const atualizarVisibilidadeMorada = () => {
    if (campoMorada) campoMorada.style.display = entregaSelecionada() === "entrega" ? "block" : "none";
  };
  document.querySelectorAll('input[name="forma"]').forEach(r =>
    r.addEventListener("change", () => { atualizarResumo(); atualizarVisibilidadeMorada(); })
  );
  atualizarVisibilidadeMorada();
  const lp = document.getElementById("linha-paypal");
  if (lp && CONFIG.paypal) {
    lp.style.display = "block";
    lp.innerHTML = `Pagamento com PayPal: <a href="${CONFIG.paypal}" target="_blank" rel="noopener">${CONFIG.paypal}</a>`;
  }
  document.getElementById("btn-finalizar").addEventListener("click", finalizarPedido);
  const te = document.getElementById("texto-entrega");
  if (te) {
    te.textContent = `Entrega na tua zona por ${formatarPreco(CONFIG.taxaEntrega)}` +
      (CONFIG.entregaGratisAcimaDe > 0 ? ` — grátis em compras acima de ${formatarPreco(CONFIG.entregaGratisAcimaDe)}` : "") + ".";
  }
  const tr = document.getElementById("texto-retirada");
  if (tr) tr.textContent = "Retirada grátis — geramos um código para apresentares na loja. " + CONFIG.notaSinal;
}

function preencherPaginaLoja() {
  const set = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  };
  const cepValido = CONFIG.cep && CONFIG.cep !== "00000-000";
  set("info-endereco", `${CONFIG.endereco}, ${CONFIG.cidade}` + (cepValido ? ` — CEP ${CONFIG.cep}` : ""));
  set("info-pluscode", CONFIG.plusCode || "");
  set("info-horario", CONFIG.horario);
  set("info-whatsapp", "+" + CONFIG.whatsapp);
  set("info-email", CONFIG.email);
  set("info-instagram", CONFIG.instagram);
  set("formas-pagamento", CONFIG.formasPagamento + ".");
  set("nota-sinal", CONFIG.notaSinal);
  const maps = document.getElementById("link-maps");
  if (maps) {
    const q = CONFIG.plusCode ? `${CONFIG.plusCode}, ${CONFIG.cidade}` : `${CONFIG.endereco}, ${CONFIG.cidade} ${CONFIG.cep}`;
    maps.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }
  const wl = document.getElementById("link-whatsapp-loja");
  if (wl) wl.href = "https://wa.me/" + CONFIG.whatsapp;
}

let toastTimer;
function abrirToast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("visivel");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("visivel"), 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  aplicarCores();
  renderizarCabecalho();
  renderizarRodape();
  atualizarBadge();
  const tph = document.getElementById("texto-pagamento-home");
  if (tph) tph.textContent = CONFIG.formasPagamento + " — na entrega ou na retirada.";
  if (document.getElementById("lista-produtos")) { iniciarCatalogo(); iniciarHome(); }
  if (document.getElementById("detalhe-produto")) iniciarDetalhe();
  if (document.getElementById("lista-carrinho")) iniciarCarrinho();
  if (document.getElementById("info-endereco")) preencherPaginaLoja();
});

const produtos = [
  {
    id: 1,
    nome: "Camiseta Básica Algodão",
    categoria: "Camisetas",
    preco: 49.9,
    precoAntigo: 69.9,
    emoji: "👕",
    cor: ["#dbeafe", "#93c5fd"],
    descricao: "Camiseta 100% algodão, toque macio e caimento reto. Disponível em várias cores. Tamanhos P ao GG."
  },
  {
    id: 2,
    nome: "Camiseta Estampada",
    categoria: "Camisetas",
    preco: 59.9,
    precoAntigo: null,
    emoji: "👕",
    cor: ["#fef3c7", "#fcd34d"],
    descricao: "Estampa exclusiva da loja, tecido premium com gola reforçada. Tamanhos P ao XG."
  },
  {
    id: 3,
    nome: "Vestido Floral",
    categoria: "Vestidos",
    preco: 129.9,
    precoAntigo: null,
    emoji: "👗",
    cor: ["#fce7f3", "#f9a8d4"],
    descricao: "Vestido midi com estampa floral, tecido leve e fluido. Ideal para o dia a dia e ocasiões especiais."
  },
  {
    id: 4,
    nome: "Vestido Social Preto",
    categoria: "Vestidos",
    preco: 149.9,
    precoAntigo: 189.9,
    emoji: "👗",
    cor: ["#e5e7eb", "#6b7280"],
    descricao: "Vestido social preto com corte elegante e leve elasticidade no tecido. Tamanhos P ao GG."
  },
  {
    id: 5,
    nome: "Calça Jeans Slim",
    categoria: "Calças",
    preco: 119.9,
    precoAntigo: null,
    emoji: "👖",
    cor: ["#c7d2fe", "#818cf8"],
    descricao: "Jeans slim com elastano, cintura média e lavagem azul tradicional. Numeração 36 a 46."
  },
  {
    id: 6,
    nome: "Calça Chino",
    categoria: "Calças",
    preco: 99.9,
    precoAntigo: 129.9,
    emoji: "👖",
    cor: ["#fde68a", "#d97706"],
    descricao: "Chino de brim leve com corte reto, versátil para trabalho e lazer. Cores: bege, marinho e preto."
  },
  {
    id: 7,
    nome: "Tênis Casual Branco",
    categoria: "Calçados",
    preco: 179.9,
    precoAntigo: null,
    emoji: "👟",
    cor: ["#f3f4f6", "#d1d5db"],
    descricao: "Tênis casual branco com solado de borracha antiderrapante e palmilha confortável. Numeração 35 a 44."
  },
  {
    id: 8,
    nome: "Sandália de Couro",
    categoria: "Calçados",
    preco: 139.9,
    precoAntigo: null,
    emoji: "👠",
    cor: ["#fbcfe8", "#ec4899"],
    descricao: "Sandália de couro legítimo com salto bloco confortável. Numeração 35 a 40."
  },
  {
    id: 9,
    nome: "Bolsa de Couro",
    categoria: "Acessórios",
    preco: 189.9,
    precoAntigo: 229.9,
    emoji: "👜",
    cor: ["#e7e5e4", "#a8a29e"],
    descricao: "Bolsa média em couro sintético de alta qualidade, alça ajustável e zíper interno. Cor marrom."
  },
  {
    id: 10,
    nome: "Óculos de Sol UV400",
    categoria: "Acessórios",
    preco: 89.9,
    precoAntigo: null,
    emoji: "🕶️",
    cor: ["#cffafe", "#22d3ee"],
    descricao: "Óculos de sol com proteção UV400 e armação leve. Inclui estojo de proteção."
  },
  {
    id: 11,
    nome: "Boné Preto Ajustável",
    categoria: "Acessórios",
    preco: 49.9,
    precoAntigo: null,
    emoji: "🧢",
    cor: ["#1f2937", "#4b5563"],
    descricao: "Boné com ajuste traseiro, aba curva e tecido respirável. Tamanho único."
  },
  {
    id: 12,
    nome: "Relógio Clássico",
    categoria: "Acessórios",
    preco: 249.9,
    precoAntigo: 299.9,
    emoji: "⌚",
    cor: ["#e0e7ff", "#6366f1"],
    descricao: "Relógio analógico com pulseira de couro, mostrador de 40 mm e resistência à água."
  },
  {
    id: 13,
    nome: "T-shirt Infantil Algodão",
    categoria: "Crianças",
    preco: 19.9,
    precoAntigo: 24.9,
    emoji: "👕",
    cor: ["#fef9c3", "#fde047"],
    descricao: "T-shirt 100% algodão para crianças, com estampas divertidas. Idades 2 a 10 anos."
  },
  {
    id: 14,
    nome: "Calça Jeans Kids",
    categoria: "Crianças",
    preco: 39.9,
    precoAntigo: null,
    emoji: "👖",
    cor: ["#bfdbfe", "#60a5fa"],
    descricao: "Jeans infantil com elástico ajustável na cintura. Idades 4 a 12 anos."
  },
  {
    id: 15,
    nome: "Vestido de Menina",
    categoria: "Crianças",
    preco: 34.9,
    precoAntigo: null,
    emoji: "👗",
    cor: ["#fbcfe8", "#f472b6"],
    descricao: "Vestido leve para meninas, com laço nas costas. Idades 3 a 10 anos."
  },
  {
    id: 16,
    nome: "Ténis Infantil",
    categoria: "Crianças",
    preco: 49.9,
    precoAntigo: null,
    emoji: "👟",
    cor: ["#d1fae5", "#34d399"],
    descricao: "Ténis infantil leve com fecho de velcro. Tamanhos 26 a 34."
  },
  {
    id: 17,
    nome: "Mochila Escolar",
    categoria: "Crianças",
    preco: 29.9,
    precoAntigo: 39.9,
    emoji: "🎒",
    cor: ["#ede9fe", "#a78bfa"],
    descricao: "Mochila escolar resistente com 2 compartimentos e alças acolchoadas. Várias cores."
  }
];

const produtos = [
  {
    id: 1,
    nome: "Camiseta Básica Algodão",
    categoria: "Homem",
    preco: 49.9,
    precoAntigo: 69.9,
    cor: ["#dbeafe", "#93c5fd"],
    descricao: "Camiseta 100% algodão, toque macio e caimento reto. Disponível em várias cores. Tamanhos P ao GG."
  },
  {
    id: 2,
    nome: "Camiseta Estampada",
    categoria: "Mulher",
    preco: 59.9,
    precoAntigo: null,
    cor: ["#fef3c7", "#fcd34d"],
    descricao: "Estampa exclusiva da loja, tecido premium com gola reforçada. Tamanhos P ao XG."
  },
  {
    id: 3,
    nome: "Vestido Floral",
    categoria: "Mulher",
    preco: 129.9,
    precoAntigo: null,
    cor: ["#fce7f3", "#f9a8d4"],
    descricao: "Vestido midi com estampa floral, tecido leve e fluido. Ideal para o dia a dia e ocasiões especiais."
  },
  {
    id: 4,
    nome: "Vestido Social Preto",
    categoria: "Mulher",
    preco: 149.9,
    precoAntigo: 189.9,
    cor: ["#e5e7eb", "#6b7280"],
    descricao: "Vestido social preto com corte elegante e leve elasticidade no tecido. Tamanhos P ao GG."
  },
  {
    id: 5,
    nome: "Calça Jeans Slim",
    categoria: "Homem",
    preco: 119.9,
    precoAntigo: null,
    cor: ["#c7d2fe", "#818cf8"],
    descricao: "Jeans slim com elastano, cintura média e lavagem azul tradicional. Numeração 36 a 46."
  },
  {
    id: 6,
    nome: "Calça Chino",
    categoria: "Mulher",
    preco: 99.9,
    precoAntigo: 129.9,
    cor: ["#fde68a", "#d97706"],
    descricao: "Chino de brim leve com corte reto, versátil para trabalho e lazer. Cores: bege, marinho e preto."
  },
  {
    id: 7,
    nome: "Tênis Casual Branco",
    categoria: "Homem",
    preco: 179.9,
    precoAntigo: null,
    cor: ["#f3f4f6", "#d1d5db"],
    descricao: "Tênis casual branco com solado de borracha antiderrapante e palmilha confortável. Numeração 35 a 44."
  },
  {
    id: 8,
    nome: "Sandália de Couro",
    categoria: "Mulher",
    preco: 139.9,
    precoAntigo: null,
    cor: ["#fbcfe8", "#ec4899"],
    descricao: "Sandália de couro legítimo com salto bloco confortável. Numeração 35 a 40."
  },
  {
    id: 9,
    nome: "Bolsa de Couro",
    categoria: "Acessórios",
    preco: 189.9,
    precoAntigo: 229.9,
    cor: ["#e7e5e4", "#a8a29e"],
    descricao: "Bolsa média em couro sintético de alta qualidade, alça ajustável e zíper interno. Cor castanha."
  },
  {
    id: 10,
    nome: "Óculos de Sol UV400",
    categoria: "Acessórios",
    preco: 89.9,
    precoAntigo: null,
    cor: ["#cffafe", "#22d3ee"],
    descricao: "Óculos de sol com proteção UV400 e armação leve. Inclui estojo de proteção."
  },
  {
    id: 11,
    nome: "Boné Preto Ajustável",
    categoria: "Homem",
    preco: 49.9,
    precoAntigo: null,
    cor: ["#1f2937", "#4b5563"],
    descricao: "Boné com ajuste traseiro, aba curva e tecido respirável. Tamanho único."
  },
  {
    id: 12,
    nome: "Relógio Clássico",
    categoria: "Acessórios",
    preco: 249.9,
    precoAntigo: 299.9,
    cor: ["#e0e7ff", "#6366f1"],
    descricao: "Relógio analógico com pulseira de couro, mostrador de 40 mm e resistência à água."
  },
  {
    id: 13,
    nome: "T-shirt Infantil Algodão",
    categoria: "Crianças",
    preco: 19.9,
    precoAntigo: 24.9,
    cor: ["#fef9c3", "#fde047"],
    descricao: "T-shirt 100% algodão para crianças, com estampas divertidas. Idades 2 a 10 anos."
  },
  {
    id: 14,
    nome: "Calça Jeans Kids",
    categoria: "Crianças",
    preco: 39.9,
    precoAntigo: null,
    cor: ["#bfdbfe", "#60a5fa"],
    descricao: "Jeans infantil com elástico ajustável na cintura. Idades 4 a 12 anos."
  },
  {
    id: 15,
    nome: "Vestido de Menina",
    categoria: "Crianças",
    preco: 34.9,
    precoAntigo: null,
    cor: ["#fbcfe8", "#f472b6"],
    descricao: "Vestido leve para meninas, com laço nas costas. Idades 3 a 10 anos."
  },
  {
    id: 16,
    nome: "Ténis Infantil",
    categoria: "Crianças",
    preco: 49.9,
    precoAntigo: null,
    cor: ["#d1fae5", "#34d399"],
    descricao: "Ténis infantil leve com fecho de velcro. Tamanhos 26 a 34."
  },
  {
    id: 17,
    nome: "Mochila Escolar",
    categoria: "Crianças",
    preco: 29.9,
    precoAntigo: 39.9,
    cor: ["#ede9fe", "#a78bfa"],
    descricao: "Mochila escolar resistente com 2 compartimentos e alças acolchoadas. Várias cores."
  },
  {
    id: 18,
    nome: "Biquíni",
    categoria: "Praia",
    preco: 29.9,
    precoAntigo: null,
    cor: ["#fce7f3", "#f9a8d4"],
    descricao: "Biquíni em licra de secagem rápida, com forro. Tamanhos P a GG."
  },
  {
    id: 19,
    nome: "Sunga",
    categoria: "Praia",
    preco: 24.9,
    precoAntigo: null,
    cor: ["#cffafe", "#67e8f9"],
    descricao: "Sunga masculina de secagem rápida, com cordão ajustável. Tamanhos P a GG."
  },
  {
    id: 20,
    nome: "Chapéu de Palha",
    categoria: "Praia",
    preco: 19.9,
    precoAntigo: 24.9,
    cor: ["#fef3c7", "#fbbf24"],
    descricao: "Chapéu de palha com aba larga e proteção UV, ideal para a praia."
  },
  {
    id: 21,
    nome: "Chinelos de Borracha",
    categoria: "Praia",
    preco: 14.9,
    precoAntigo: null,
    cor: ["#e0f2fe", "#7dd3fc"],
    descricao: "Chinelos de borracha antiderrapantes, resistentes à água e à areia. Tamanhos 36 a 44."
  }
];

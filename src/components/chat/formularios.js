const API = "https://rottracker-java.onrender.com";
const tiposDespensa = { DESPENSA: "Despensa", GELADEIRA: "Geladeira", CONGELADOR: "Congelador" };
const unidadesProduto = { KG: "Quilograma (kg)", G: "Grama (g)", ML: "Mililitro (ml)", L: "Litro (L)" };
const tiposProduto = { UN: "Unidade", CAIXA: "Caixa" };
const rotas = {
  categoria: "/api/v1/categorias",
  despensa: "/api/v1/despensas",
  despensasDoUsuario: (id) => "/api/v1/despensas/usuario/" + id,
  produto: (despensaId) => "/api/v1/produtos/despensa/" + despensaId,
};

function inteiroPositivo(valor) {
  return /^\d+$/.test(String(valor)) && Number.isSafeInteger(Number(valor)) && Number(valor) > 0;
}

function criarClienteReal({
  obterContexto,
  requisitar = (rota, opcoes) => fetch(API + rota, { ...opcoes, redirect: "error" }),
}) {
  async function enviar(rota, opcoes) {
    let resposta;
    try {
      resposta = await requisitar(rota, opcoes);
    } catch {
      throw new Error("Sem resposta da API. Confira a lista antes de tentar novamente.");
    }
    if (resposta.redirected) {
      throw new Error("A API redirecionou o pedido. Confira a sessão do RotTracker.");
    }
    if (!resposta.ok) {
      throw new Error("A API recusou a operação (HTTP " + resposta.status + ").");
    }
    return resposta;
  }

  async function post(rota, dados) {
    const resposta = await enviar(rota, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    if (resposta.status !== 201) {
      throw new Error("A API não confirmou a criação. Confira a lista antes de repetir.");
    }
  }

  function contextoAtual() {
    const dados = obterContexto();
    if (!inteiroPositivo(dados?.usuarioId)) {
      throw new Error("Abra o chat com uma conta do RotTracker conectada.");
    }
    return dados;
  }

  function conferirConta(contexto) {
    const atual = contextoAtual();
    if (atual.sessao !== contexto.sessao) {
      throw new Error("A conta mudou. Abra um formulário novo.");
    }
    return atual;
  }

  async function listar(rota) {
    const resposta = await enviar(rota, { method: "GET" });
    const itens = await resposta.json();
    if (!Array.isArray(itens)) {
      throw new Error("A API devolveu uma lista em formato inesperado.");
    }
    return itens;
  }

  return {
    obterContexto: contextoAtual,
    listarCategorias: () => listar(rotas.categoria),
    listarDespensas: (contexto) => listar(rotas.despensasDoUsuario(conferirConta(contexto).usuarioId)),
    async registrar_produto(dados, contexto) {
      conferirConta(contexto);
      const { despensaId, ...produto } = dados;
      if (!contexto.despensas.has(despensaId)) {
        throw new Error("Selecione uma despensa da lista.");
      }
      await post(rotas.produto(despensaId), produto);
    },
    async criar_categoria(dados, contexto) {
      conferirConta(contexto);
      await post(rotas.categoria, dados);
    },
    async criar_despensa(dados, contexto) {
      const { usuarioId } = conferirConta(contexto);
      await post(rotas.despensa, { ...dados, usuarioId });
    },
  };
}

function montarElemento(tag, texto) {
  const elemento = document.createElement(tag);
  if (texto) elemento.textContent = texto;
  return elemento;
}

function campo(formulario, rotulo, nome, tipo = "text") {
  const label = montarElemento("label");
  label.style.display = "block";
  label.style.margin = "0 0 .5rem";
  const input = montarElemento(tipo === "select" ? "select" : "input");
  if (tipo !== "select") input.type = tipo;
  input.name = nome;
  input.required = tipo !== "checkbox";
  input.style.cssText = tipo === "checkbox" ? "margin-inline-end:.4rem" : "display:block;max-width:100%;width:100%";
  if (tipo === "checkbox") label.append(input, rotulo);
  else label.append(rotulo, input);
  formulario.append(label);
  return input;
}

function preencherPeloTexto(texto, descricao, quantidade, unidade) {
  const compra = /^comprei\s+(.+?)(?:\s+(?:hoje|ontem))?[.!?]*$/i.exec(texto || "");
  if (!compra) return;
  const comQuantidade = /^(\d+(?:[.,]\d+)?)\s*(litros?|l|quilos?|kg|gramas?|g|mililitros?|ml|unidades?|un|caixas?)?\s+(?:de\s+)?(.+)$/i.exec(compra[1]);
  if (!comQuantidade) {
    descricao.value = compra[1];
    return;
  }
  const [, valor, medida, nome] = comQuantidade;
  descricao.value = nome;
  quantidade.value = valor.replace(",", ".");
  if (!medida) return;
  if (/^(l|litros?)$/i.test(medida)) unidade.value = "L";
  if (/^(kg|quilos?)$/i.test(medida)) unidade.value = "KG";
  if (/^(g|gramas?)$/i.test(medida)) unidade.value = "G";
  if (/^(ml|mililitros?)$/i.test(medida)) unidade.value = "ML";
}

function seletor(formulario, rotulo, nome, texto) {
  const select = campo(formulario, rotulo, nome, "select");
  const escolha = montarElemento("option", texto);
  escolha.value = "";
  select.append(escolha);
  return select;
}

function preencherValores(select, valores) {
  for (const [valor, rotulo] of Object.entries(valores)) {
    const opcao = montarElemento("option", rotulo);
    opcao.value = valor;
    select.append(opcao);
  }
}

function preencherOpcoes(select, itens) {
  for (const item of itens) {
    if (!inteiroPositivo(item?.id) || typeof item.nome !== "string") continue;
    const opcao = montarElemento("option", item.tipo ? item.nome + " (" + item.tipo + ")" : item.nome);
    opcao.value = String(item.id);
    select.append(opcao);
  }
  return new Set(Array.from(select.options).slice(1).map(opcao => Number(opcao.value)));
}

function formularioProduto(formulario, texto) {
  const descricao = campo(formulario, "Alimento", "descricao");
  descricao.maxLength = 100;
  const quantidade = campo(formulario, "Quantidade", "quantidade", "number");
  quantidade.min = "1";
  quantidade.max = "99999999.99";
  quantidade.step = "0.01";
  const unidade = seletor(formulario, "Unidade", "unidade", "Selecione a unidade");
  preencherValores(unidade, unidadesProduto);
  const tipoProduto = seletor(formulario, "Tipo do produto", "tipoProduto", "Selecione o tipo");
  preencherValores(tipoProduto, tiposProduto);
  preencherPeloTexto(texto, descricao, quantidade, unidade);
  campo(formulario, "Data da compra", "dataCompra", "date");
  campo(formulario, "Validade", "validade", "date");
  campo(formulario, "Congelado", "congelado", "checkbox");

  return {
    categorias: seletor(formulario, "Categoria", "categoriaId", "Selecione a categoria"),
    despensas: seletor(formulario, "Despensa", "despensaId", "Selecione a despensa"),
  };
}

function lerDados(formulario, acao) {
  const valores = new FormData(formulario);
  if (acao !== "registrar_produto") {
    const nome = valores.get("nome").trim();
    if (!nome) throw new Error("Preencha o nome.");
    if (acao === "criar_categoria") {
      return { nome, perecivel: valores.has("perecivel") };
    }
    const tipo = valores.get("tipo")?.trim();
    if (!Object.hasOwn(tiposDespensa, tipo)) throw new Error("Selecione o tipo da despensa.");
    return { nome, tipo };
  }

  const descricao = valores.get("descricao").trim();
  const unidade = valores.get("unidade");
  const tipoProduto = valores.get("tipoProduto");
  const quantidade = Number(valores.get("quantidade"));
  const dataCompra = valores.get("dataCompra");
  const validade = valores.get("validade");
  const categoriaId = valores.get("categoriaId");
  const despensaId = valores.get("despensaId");
  if (!descricao || !Object.hasOwn(unidadesProduto, unidade) || !Object.hasOwn(tiposProduto, tipoProduto) ||
      !Number.isFinite(quantidade) || quantidade < 1 || quantidade > 99999999.99 ||
      !dataCompra || !validade || !inteiroPositivo(categoriaId) || !inteiroPositivo(despensaId)) {
    throw new Error("Confira os campos do alimento e a despensa selecionada.");
  }
  if (validade < dataCompra) throw new Error("A validade deve ser igual ou posterior à compra.");
  return {
    descricao, quantidade, unidade, tipoProduto, dataCompra, validade,
    congelado: valores.has("congelado"), categoriaId: Number(categoriaId), despensaId: Number(despensaId),
  };
}

const etiquetas = {
  registrar_produto: ["Cadastrar alimento", "Alimento cadastrado."],
  criar_despensa: ["Criar despensa", "Despensa criada."],
  criar_categoria: ["Criar categoria", "Categoria criada."],
};

async function renderizar(destino, acao, cliente, texto = "") {
  if (!Object.hasOwn(etiquetas, acao) || !destino || destino.childElementCount) return;
  const [titulo, sucesso] = etiquetas[acao];
  const formulario = montarElemento("form");
  formulario.style.cssText = "display:grid;gap:.35rem;padding:.65rem;max-width:100%;font:inherit";
  formulario.append(montarElemento("strong", titulo));
  const status = montarElemento("p");
  status.setAttribute("role", "status");
  const botao = montarElemento("button", "Confirmar e salvar");
  botao.type = "submit";
  botao.disabled = true;
  let contexto;
  const criandoCategoria = acao === "criar_categoria";
  const produto = acao === "registrar_produto";
  const seletores = produto ? formularioProduto(formulario, texto) : null;
  if (!produto) {
    const nome = campo(formulario, criandoCategoria ? "Nome da categoria" : "Nome da despensa", "nome");
    nome.maxLength = criandoCategoria ? 50 : 100;
    if (criandoCategoria) {
      campo(formulario, "Categoria perecível", "perecivel", "checkbox");
    } else {
      const tipo = seletor(formulario, "Tipo da despensa", "tipo", "Selecione o tipo");
      preencherValores(tipo, tiposDespensa);
    }
  }

  formulario.append(botao, status);
  destino.append(formulario);
  try {
    contexto = { ...cliente.obterContexto() };
    if (seletores) {
      status.textContent = "Carregando categorias e despensas…";
      const [categorias, despensas] = await Promise.all([
        cliente.listarCategorias(), cliente.listarDespensas(contexto),
      ]);
      if (!preencherOpcoes(seletores.categorias, categorias).size) {
        throw new Error("Crie uma categoria e abra um formulário novo.");
      }
      contexto.despensas = preencherOpcoes(seletores.despensas, despensas);
      if (!contexto.despensas.size) {
        throw new Error("Crie uma despensa e abra um formulário novo.");
      }
      status.textContent = "";
    }
  } catch (erro) {
    status.textContent = erro.message;
    return;
  }

  botao.disabled = false;
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (botao.disabled) return;

    let dados;
    try {
      dados = lerDados(formulario, acao);
    } catch (erro) {
      status.textContent = erro.message;
      return;
    }
    botao.disabled = true;
    status.textContent = "Salvando…";
    try {
      await cliente[acao](dados, contexto);
    } catch (erro) {
      status.textContent = erro.message;
      botao.disabled = false;
      return;
    }
    for (const input of formulario.querySelectorAll("input, select")) input.disabled = true;
    status.textContent = sucesso + " Quer fazer mais alguma coisa? Posso cadastrar outro alimento, criar uma despensa ou criar uma categoria.";
  });
}

function conectarWatson(instancia, cliente) {
  instancia.on({
    type: "userDefinedResponse",
    handler(evento) {
      const { element, message, fullMessage } = evento.data;
      const acao = message?.user_defined?.rottrackerAcao;
      if (!element || !Object.hasOwn(etiquetas, acao)) return;
      evento.data.fullWidth = true;
      void renderizar(element, acao, cliente, fullMessage?.input?.text);
    },
  });
}

export { API, criarClienteReal, conectarWatson };

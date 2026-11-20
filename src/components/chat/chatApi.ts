import { API, criarClienteReal } from './formularios.js'

type Conta = { id: number; nome: string }
let conta: Conta | undefined

export const clienteChat = criarClienteReal({
  obterContexto() {
    if (!conta) throw new Error('Entre com a conta do RotTracker para usar os cadastros.')
    return { usuarioId: conta.id, sessao: conta }
  },
})

async function solicitarConta(rota: string, corpo: object, statusEsperado: number) {
  let resposta
  try {
    resposta = await fetch(API + rota, {
      method: 'POST',
      redirect: 'error',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    })
  } catch {
    throw new Error('A API do RotTracker não respondeu.')
  }

  if (resposta.status === 401) throw new Error('E-mail ou senha inválidos.')
  if (resposta.status === 403) throw new Error('Essa conta está inativa.')
  if (resposta.status === 409) throw new Error('Esse e-mail já tem uma conta. Use a opção Entrar.')
  if (resposta.status !== statusEsperado) {
    throw new Error(`A API recusou a solicitação (HTTP ${resposta.status}).`)
  }

  const dados: unknown = await resposta.json()
  if (typeof dados !== 'object' || dados === null || !('id' in dados) ||
    typeof dados.id !== 'number' || !Number.isSafeInteger(dados.id) || dados.id < 1 ||
    !('nome' in dados) || typeof dados.nome !== 'string') {
    throw new Error('O Java não devolveu uma conta válida.')
  }

  conta = { id: dados.id, nome: dados.nome }
  return conta
}

export function entrarNoRotTracker(email: string, senha: string) {
  return solicitarConta('/api/v1/auth/login', { email, senha }, 200)
}

export function criarContaRotTracker(nome: string, email: string, senha: string) {
  return solicitarConta('/api/v1/usuarios', { nome, email, senha, status: 'ATIVO' }, 201)
}

export function sairDoRotTracker() {
  conta = undefined
  window.location.reload()
}

export const API: string
export type AcaoChat = 'registrar_produto' | 'criar_despensa' | 'criar_categoria'

interface ContextoChat {
  usuarioId: number
  sessao: object
}

interface OpcoesCliente {
  obterContexto: () => ContextoChat
  requisitar?: (rota: string, opcoes: RequestInit) => Promise<Response>
}

export interface EventoWatson {
  data: {
    element: HTMLElement | null
    message: { user_defined?: { rottrackerAcao?: AcaoChat } }
    fullMessage?: { input?: { text?: string } }
    fullWidth?: boolean
  }
}

export interface InstanciaWatson {
  on: (evento: { type: 'userDefinedResponse'; handler: (evento: EventoWatson) => void }) => void
  render: () => Promise<unknown>
}

export function criarClienteReal(opcoes: OpcoesCliente): object
export function conectarWatson(instancia: Pick<InstanciaWatson, 'on'>, cliente: object): void

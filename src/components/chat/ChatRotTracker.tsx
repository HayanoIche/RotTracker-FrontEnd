import { useState } from 'react'
import type { FormEvent } from 'react'
import { clienteChat, criarContaRotTracker, entrarNoRotTracker, sairDoRotTracker } from './chatApi'
import { iniciarWatson, watsonConfigurado } from './watson'

const estiloCampo = 'rounded-lg border border-zinc-300 px-2 py-1.5'
const estiloBotao = 'rounded-lg bg-[var(--g3)] px-3 py-2 text-white disabled:opacity-60'

export default function ChatRotTracker() {
  const [aberto, setAberto] = useState(false)
  const [modo, setModo] = useState<'entrar' | 'criar'>('entrar')
  const [conectado, setConectado] = useState(false)
  const [aguardando, setAguardando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const criandoConta = modo === 'criar'

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (aguardando) return
    const formulario = evento.currentTarget
    const dados = new FormData(formulario)
    const nome = String(dados.get('nome') ?? '').trim()
    const email = String(dados.get('email') ?? '').trim().toLowerCase()
    const senha = String(dados.get('senha') ?? '')

    if (criandoConta && !nome) {
      setMensagem('Preencha o nome da conta.')
      return
    }

    setAguardando(true)
    setMensagem('')
    try {
      if (criandoConta) {
        await criarContaRotTracker(nome, email, senha)
      } else {
        await entrarNoRotTracker(email, senha)
      }
      formulario.reset()
      setConectado(true)
      await iniciarWatson(clienteChat)
      setAberto(false)
    } catch (erro) {
      setMensagem(erro instanceof Error ? erro.message : 'Não foi possível abrir o chat.')
    } finally {
      setAguardando(false)
    }
  }

  function alternarModo() {
    setModo(criandoConta ? 'entrar' : 'criar')
    setMensagem('')
  }

  return (
    <aside aria-label="Acesso ao chat" className={conectado && !aberto ? 'fixed bottom-4 left-4 z-[60]' : 'fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2'}>
      {aberto && (
        <section id="chat-rottracker-login" className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-xl">
          <h2 className="font-title text-xl">Chat do RotTracker</h2>
          {!watsonConfigurado && (
            <p className="text-sm">Configure os valores do Watson no .env.local para abrir o chat.</p>
          )}
          {watsonConfigurado && !conectado && (
            <form key={modo} onSubmit={enviar} className="mt-3 grid gap-2">
              <p className="text-sm">
                {criandoConta ? 'Crie uma conta de teste para começar.' : 'Entre com sua conta do RotTracker.'}
              </p>
              {criandoConta && (
                <label className="grid gap-1 text-sm">
                  Nome
                  <input required name="nome" autoComplete="name" maxLength={200} className={estiloCampo} />
                </label>
              )}
              <label className="grid gap-1 text-sm">
                E-mail
                <input required name="email" autoComplete="username" type="email" className={estiloCampo} />
              </label>
              <label className="grid gap-1 text-sm">
                Senha
                <input required name="senha" autoComplete={criandoConta ? 'new-password' : 'current-password'} type="password" maxLength={255} className={estiloCampo} />
              </label>
              <button type="submit" disabled={aguardando} className={estiloBotao}>
                {aguardando ? 'Aguarde…' : criandoConta ? 'Criar conta e abrir o chat' : 'Entrar e abrir o chat'}
              </button>
              <button type="button" disabled={aguardando} onClick={alternarModo} className="text-sm text-[var(--g3)] underline">
                {criandoConta ? 'Já tenho conta. Entrar' : 'Criar conta'}
              </button>
            </form>
          )}
          <p role="status" className="text-sm">
            {mensagem || (conectado && aguardando ? 'Abrindo o Watson…' : '')}
          </p>
          {conectado && !aguardando && mensagem && (
            <button type="button" onClick={sairDoRotTracker} className={estiloBotao}>Recarregar para entrar</button>
          )}
        </section>
      )}
      {conectado && !aberto ? (
        <button type="button" onClick={sairDoRotTracker} className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow">
          Sair do chat
        </button>
      ) : (
        <button type="button" disabled={aguardando} aria-expanded={aberto} aria-controls={aberto ? 'chat-rottracker-login' : undefined} onClick={() => setAberto(!aberto)} className="rounded-full bg-[var(--g3)] px-4 py-2 font-semibold text-white shadow-lg">
          {aberto ? 'Fechar' : 'Entrar no chat'}
        </button>
      )}
    </aside>
  )
}

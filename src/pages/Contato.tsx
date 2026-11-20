import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { Link } from 'react-router-dom';

const emailContato = import.meta.env.VITE_CONTATO_EMAIL?.trim() ?? '';

const estiloCampo =
    'w-full rounded-xl border border-[var(--g2)] bg-white px-4 py-3 font-text text-base text-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-[var(--g3)]';

const estiloBotao =
    'inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--g3)] px-6 py-3 font-title font-bold text-white transition-colors hover:bg-[#294027] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--g3)]';

export default function Contato() {
    const [rascunho, setRascunho] = useState('');

    function prepararMensagem(evento: SubmitEvent<HTMLFormElement>) {
        evento.preventDefault();

        const dados = new FormData(evento.currentTarget);
        const nome = String(dados.get('nome')).trim();
        const email = String(dados.get('email')).trim();
        const assunto = String(dados.get('assunto'));
        const mensagem = String(dados.get('mensagem')).trim();
        const corpo = `Nome: ${nome}\r\nE-mail: ${email}\r\n\r\n${mensagem}`;

        setRascunho(
            `mailto:${emailContato}?subject=${encodeURIComponent(`RotTracker - ${assunto}`)}&body=${encodeURIComponent(corpo)}`,
        );
    }

    return (
        <section aria-labelledby="titulo-contato" className="mx-auto max-w-2xl px-5 pb-12 pt-9 sm:px-8 md:pt-12">
            <header className="mb-7 space-y-2 text-center">
                <h1 id="titulo-contato" className="font-title text-4xl font-bold text-zinc-900 sm:text-5xl">
                    Fale <span className="text-[var(--g3)]">conosco</span>
                </h1>
                <p className="font-text text-base text-zinc-700">
                    Envie suas dúvidas, sugestões ou relatos de problemas sobre o RotTracker.
                </p>
            </header>

            <form
                onSubmit={prepararMensagem}
                onChange={() => setRascunho('')}
                onReset={() => setRascunho('')}
                className="mx-auto max-w-xs space-y-4"
            >
                <div className="space-y-1.5">
                    <label htmlFor="contato-nome" className="block font-text text-sm font-bold text-zinc-900">
                        Nome completo
                    </label>
                    <input
                        id="contato-nome"
                        name="nome"
                        className={estiloCampo}
                        autoComplete="name"
                        placeholder="Seu nome"
                        required
                        pattern=".*\S.*"
                        maxLength={100}
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="contato-email" className="block font-text text-sm font-bold text-zinc-900">
                        E-mail
                    </label>
                    <input
                        id="contato-email"
                        name="email"
                        type="email"
                        className={estiloCampo}
                        autoComplete="email"
                        placeholder="seu@email.com"
                        required
                        maxLength={254}
                    />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="contato-assunto" className="block font-text text-sm font-bold text-zinc-900">
                        Assunto
                    </label>
                    <select id="contato-assunto" name="assunto" className={estiloCampo} defaultValue="" required>
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="Dúvida">Dúvida</option>
                        <option value="Sugestão">Sugestão</option>
                        <option value="Problema">Problema</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="contato-mensagem" className="block font-text text-sm font-bold text-zinc-900">
                        Mensagem
                    </label>
                    <textarea
                        id="contato-mensagem"
                        name="mensagem"
                        className={`${estiloCampo} resize-y`}
                        rows={4}
                        placeholder="Escreva sua mensagem"
                        required
                        maxLength={1500}
                        onChange={(evento) => {
                            const campo = evento.currentTarget;
                            campo.setCustomValidity(campo.value && !campo.value.trim() ? 'Escreva sua mensagem.' : '');
                        }}
                    />
                </div>

                <button type="submit" className={`${estiloBotao} w-full cursor-pointer`}>
                    Preparar mensagem
                </button>

                <div aria-live="polite">
                    {rascunho && (
                        <div className="space-y-3 rounded-xl bg-[var(--g1)] p-4 font-text text-zinc-900">
                            <p>
                                {emailContato
                                    ? 'Seu rascunho está pronto. Abra seu app de e-mail para enviar.'
                                    : 'Seu rascunho está pronto. Abra seu app de e-mail e preencha o destinatário antes de enviar.'}
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <a href={rascunho} className={estiloBotao}>Abrir no e-mail</a>
                                <button type="reset" className="cursor-pointer font-bold text-[var(--g3)] underline underline-offset-4">
                                    Escrever outra mensagem
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </form>

            <aside className="mx-auto mt-4 max-w-xs rounded-2xl bg-[var(--g1)] p-4 text-center">
                <h2 className="font-title text-xl font-bold text-[var(--g3)]">Informações de contato</h2>
                {emailContato && (
                    <a href={`mailto:${emailContato}`} className="mt-2 block break-all font-text font-bold text-[var(--g3)] underline underline-offset-4">
                        {emailContato}
                    </a>
                )}
                <Link to="/integrantes" className="mt-2 inline-block font-text font-bold text-[var(--g3)] underline underline-offset-4">
                    Veja os perfis da equipe
                </Link>
            </aside>
        </section>
    );
}
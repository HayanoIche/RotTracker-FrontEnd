import PageTitle from '../components/common/PageTitle';

const previsoes = [
    {
        titulo: 'Quanto alimento pode ser desperdiçado?',
        descricao: 'O modelo de regressão estima quantos gramas de alimento podem ser descartados por pessoa em uma semana.',
    },
    {
        titulo: 'Pode haver descarte de frutas e verduras?',
        descricao: 'O modelo de classificação indica se tende a haver descarte de frutas e verduras na semana.',
    },
];

export default function Ia() {
    return (
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-4 sm:px-8 md:pt-8">
            <PageTitle
                title="IA no RotTracker"
                subtitle="Entenda como o chat ajuda no dia a dia e como os modelos fazem previsões sobre desperdício."
            />

            <div className="mt-4 grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
                <section
                    aria-labelledby="assistente-ia"
                    className="rounded-2xl border border-[var(--g1)] bg-white/80 p-6 sm:p-8"
                >
                    <h2 id="assistente-ia" className="font-title text-3xl font-bold text-[var(--g3)]">
                        Assistente do RotTracker
                    </h2>

                    <p className="mt-3 font-text leading-relaxed text-zinc-700">
                        O chatbot usa o IBM Watson para identificar o que você quer fazer. Ele pode tirar dúvidas
                        sobre o aplicativo ou abrir formulários para cadastrar alimentos e criar despensas.
                    </p>

                    <p className="mt-4 rounded-xl bg-[var(--g1)]/40 p-4 font-text leading-relaxed text-zinc-800">
                        Se você escrever <strong>“Comprei 2 kg de maçã”</strong>, o chat ajuda a preencher o
                        cadastro. Você revisa os dados, completa o que falta e confirma.
                    </p>

                    <p className="mt-4 font-text text-sm leading-relaxed text-zinc-700">
                        Para experimentar, clique em <strong>Entrar no chat</strong> no canto da página.
                    </p>
                </section>

                <section
                    aria-labelledby="modelos-ia"
                    className="rounded-2xl border border-[var(--g1)] bg-white/80 p-6 sm:p-8"
                >
                    <h2 id="modelos-ia" className="font-title text-3xl font-bold text-[var(--g3)]">
                        Previsões de desperdício
                    </h2>

                    <p className="mt-3 font-text leading-relaxed text-zinc-700">
                        Treinamos dois modelos com dados de um estudo sobre desperdício doméstico na Suíça.
                        Eles usam três informações: número de moradores, número de crianças e quantos dias
                        por semana a família prepara o jantar em casa.
                    </p>

                    <ul className="mt-4 space-y-3">
                        {previsoes.map(({ titulo, descricao }) => (
                            <li key={titulo} className="rounded-xl border border-[var(--g1)] p-4">
                                <h3 className="font-title text-xl font-bold text-[var(--g3)]">{titulo}</h3>
                                <p className="mt-1 font-text leading-relaxed text-zinc-700">{descricao}</p>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-4 font-text text-sm leading-relaxed text-zinc-700">
                        São estimativas sobre hábitos da casa. Para conferir quando um alimento vence, consulte
                        a data de validade registrada no produto.
                    </p>
                </section>
            </div>
        </div>
    );
}
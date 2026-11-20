import { Link } from 'react-router-dom';

const perguntas = [
    {
        pergunta: 'O que é o RotTracker?',
        resposta: 'É um aplicativo para organizar os alimentos que você tem em casa. Você pode registrar o que comprou, onde guardou cada item e quando ele vence.',
    },
    {
        pergunta: 'Como crio uma despensa?',
        resposta: 'No aplicativo, abra a aba Despensas. Pelo chat, você também pode pedir “Criar uma despensa” e informar o nome e o tipo no formulário.',
    },
    {
        pergunta: 'Posso separar a geladeira do congelador?',
        resposta: 'Sim. Crie um armazenamento para cada local e escolha entre despensa, geladeira e congelador. Assim, fica mais fácil encontrar os alimentos depois.',
    },
    {
        pergunta: 'Como cadastro um alimento pelo chat?',
        resposta: 'Abra o chat, entre na sua conta e diga, por exemplo, “Comprei 1 kg de maçã”. Complete os dados pedidos no formulário, escolha a despensa e confirme o cadastro.',
    },
    {
        pergunta: 'Para que servem as categorias?',
        resposta: 'Elas ajudam a agrupar produtos parecidos, como frutas, grãos e laticínios. Para criar uma nova, peça ao chat “Criar categoria”.',
    },
    {
        pergunta: 'Como acompanho as datas de validade?',
        resposta: 'Informe a data no cadastro de cada produto. Quando consultar sua despensa, use as datas registradas para planejar o que consumir primeiro.',
    },
    {
        pergunta: 'Por que preciso entrar na minha conta pelo chat?',
        resposta: 'O chat usa sua conta para encontrar as suas despensas e associar os cadastros a elas.',
    },
];

export default function Faq() {
    return (
        <div>
            <section aria-labelledby="titulo-faq" className="mx-auto max-w-4xl px-5 pb-14 pt-10 sm:px-8 md:pb-16 md:pt-14">
                <header className="mb-8 space-y-3 text-center md:mb-10">
                    <h1 id="titulo-faq" className="font-title text-4xl font-bold text-zinc-900 sm:text-5xl md:text-7xl">
                        Perguntas e <span className="text-[var(--g3)]">respostas</span>
                    </h1>
                    <p className="font-text text-lg text-zinc-700">
                        Tire suas dúvidas sobre o RotTracker.
                    </p>
                </header>

                <div className="space-y-3">
                    {perguntas.map(({ pergunta, resposta }) => (
                        <details
                            key={pergunta}
                            name="faq-rottracker"
                            className="group rounded-2xl border border-[var(--g2)] bg-white/75 open:bg-white"
                        >
                            <summary className="flex min-h-15 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-3 font-text text-base font-bold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--g3)] sm:px-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                                {pergunta}
                                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--g1)] leading-none text-[var(--g3)]">
                                    <span className="group-open:hidden">+</span>
                                    <span className="hidden group-open:inline">−</span>
                                </span>
                            </summary>
                            <p className="px-4 pb-5 font-text text-base leading-relaxed text-zinc-700 sm:px-5">
                                {resposta}
                            </p>
                        </details>
                    ))}
                </div>
            </section>

            <section aria-labelledby="contato-faq" className="bg-[var(--g1)] px-5 pb-16 pt-10 text-center md:py-12">
                <h2 id="contato-faq" className="font-title text-3xl font-bold text-[var(--g3)]">
                    Ainda tem dúvidas?
                </h2>
                <p className="mx-auto mt-2 max-w-md font-text text-base text-zinc-800">
                    Entre em contato com a nossa equipe.
                </p>
                <Link
                    to="/contato"
                    className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--g3)] px-6 py-3 font-title font-bold text-white transition-colors hover:bg-[var(--g2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--g3)]"
                >
                    Ir para contato
                </Link>
            </section>
        </div>
    );
}
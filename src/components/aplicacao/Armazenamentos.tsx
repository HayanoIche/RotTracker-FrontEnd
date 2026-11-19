import despensaIcon from '../../assets/aplicacao/despensa.jpeg';

interface Armazenamento {
    nome: string;
    tipo: string;
    produtos: number;
}

// DADOS DE EXEMPLO: depois trocamos pelos dados da API
const armazenamentos: Armazenamento[] = [
    { nome: 'Geladeira', tipo: 'Geladeira', produtos: 14 },
    { nome: 'Congelador', tipo: 'Congelador', produtos: 9 },
    { nome: 'Despensa', tipo: 'Despensa', produtos: 12 },
    { nome: 'Bebidas', tipo: 'Despensa', produtos: 6 },
];

export default function Armazenamentos() {
    return (
        <div className="px-5 pt-8 pb-6 space-y-5">
            {/* TÍTULO */}
            <h1 className="font-title text-4xl font-bold text-[var(--text-bold)]">
                Minhas despensas
            </h1>

            {/* BOTÃO + BUSCA */}
            <div className="flex gap-3">
                <button
                    type="button"
                    className="
                        shrink-0 rounded-full
                        border border-[var(--g2)] bg-white/70
                        px-4 py-2.5
                        font-title text-sm font-bold text-[var(--g3)]
                    "
                >
                    + Adicionar
                </button>

                <input
                    type="search"
                    aria-label="Pesquisar despensa"
                    placeholder="Pesquisar..."
                    className="
                        min-w-0 flex-1 rounded-full
                        border border-zinc-300 bg-white/70
                        px-4 py-2.5
                        font-text text-sm
                        focus:outline-none focus:ring-2 focus:ring-[var(--g2)]
                    "
                />
            </div>

            {/* FAIXA DE TOTAL */}
            <section className="
                flex items-center gap-3
                rounded-2xl p-4 text-white shadow-md
                bg-gradient-to-r from-[var(--g3)] to-[var(--g2)]
            ">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/90">
                    <img src={despensaIcon} alt="" className="h-6 w-6 object-contain" />
                </span>

                <div className="min-w-0">
                    <p className="font-title text-lg font-bold leading-tight">
                        Total: {armazenamentos.length} despensas
                    </p>
                    <p className="font-text text-xs font-bold opacity-90">
                        Organize e acompanhe seus alimentos
                    </p>
                </div>
            </section>

            {/* GRADE DE CARTÕES */}
            <ul className="grid grid-cols-2 gap-3">
                {armazenamentos.map((item) => (
                    <li
                        key={item.nome}
                        className="
                            flex flex-col gap-3
                            rounded-3xl p-4
                            bg-white/80 border border-zinc-300/60
                            shadow-md backdrop-blur-sm
                        "
                    >
                        <span className="
                            self-start inline-flex items-center gap-1.5
                            rounded-full bg-[var(--g1)]/40
                            px-2.5 py-0.5
                            font-text text-[10px] font-bold text-[var(--g3)]
                        ">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--g2)]" />
                            {item.tipo}
                        </span>

                        <div className="flex h-20 items-center justify-center rounded-2xl bg-[var(--g1)]/25">
                            <img src={despensaIcon} alt="" className="h-10 w-10 object-contain" />
                        </div>

                        <div>
                            <h2 className="font-title text-lg font-bold leading-tight text-[var(--g3)] break-words">
                                {item.nome}
                            </h2>
                            <p className="font-text text-xs font-bold text-[var(--text-main)]">
                                {item.produtos} produtos
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import { useEffect, useState } from 'react';
import despensaIcon from '../assets/aplicacao/despensa.jpeg';
import API_URL from '../services/api';

interface Armazenamento {
    id: number;
    nome: string;
    tipo: string;
    dataCriacao: string;
    produtos: number;
}

export default function Armazenamentos() {
    const [armazenamentos, setArmazenamentos] = useState<Armazenamento[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);

    // ID temporário até termos o login
    const usuarioId = 21;

    useEffect(() => {
        async function carregarArmazenamentos() {
            try {
                setLoading(true);
                setErro(null);

                const resposta = await fetch(
                    `${API_URL}/api/v1/despensas/usuario/${usuarioId}`
                );

                if (!resposta.ok) {
                    throw new Error('Não foi possível carregar as despensas.');
                }

                const despensas = await resposta.json();

                const lista = await Promise.all(
                    despensas.map(async (despensa: any) => {
                        const respostaProdutos = await fetch(
                            `${API_URL}/api/v1/produtos/despensa/${despensa.id}`
                        );

                        if (!respostaProdutos.ok) {
                            throw new Error('Não foi possível carregar os produtos.');
                        }

                        const produtos = await respostaProdutos.json();

                        return {
                            ...despensa,
                            produtos: produtos.length
                        };
                    })
                );

                setArmazenamentos(lista);
            } catch (error) {
                setErro('Erro ao carregar as despensas. Tente novamente.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        carregarArmazenamentos();
    }, []);

    return (
        <div className="px-5 pt-8 pb-6 space-y-5">
            <h1 className="font-title text-4xl font-bold text-[var(--text-bold)]">
                Minhas despensas
            </h1>

            <div className="flex gap-3">
                <button
                    type="button"
                    className="shrink-0 rounded-full border border-[var(--g2)] bg-white/70 px-4 py-2.5 font-title text-sm font-bold text-[var(--g3)]"
                >
                    + Adicionar
                </button>

                <input
                    type="search"
                    aria-label="Pesquisar despensa"
                    placeholder="Pesquisar..."
                    className="min-w-0 flex-1 rounded-full border border-zinc-300 bg-white/70 px-4 py-2.5 font-text text-sm focus:outline-none focus:ring-2 focus:ring-[var(--g2)]"
                />
            </div>

            <section className="flex items-center gap-3 rounded-2xl p-4 text-white shadow-md bg-gradient-to-r from-[var(--g3)] to-[var(--g2)]">
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

            {loading && (
                <p className="text-center font-text text-sm">Carregando despensas...</p>
            )}

            {erro && (
                <p className="text-center font-text text-sm text-red-600">{erro}</p>
            )}

            {!loading && !erro && armazenamentos.length === 0 && (
                <p className="text-center font-text text-sm">
                    Você ainda não possui despensas.
                </p>
            )}

            <ul className="grid grid-cols-2 gap-3">
                {armazenamentos.map((item) => (
                    <li
                        key={item.id}
                        className="flex flex-col gap-3 rounded-3xl p-4 bg-white/80 border border-zinc-300/60 shadow-md backdrop-blur-sm"
                    >
                        <span className="self-start inline-flex items-center gap-1.5 rounded-full bg-[var(--g1)]/40 px-2.5 py-0.5 font-text text-[10px] font-bold text-[var(--g3)]">
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

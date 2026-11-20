
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../services/api';

import despensaIcon from '../assets/aplicacao/despensa.svg';
import freezerIcon from '../assets/aplicacao/freezer.svg';
import geladeiraIcon from '../assets/aplicacao/geladeira.svg';

interface Despensa {
    id: number;
    nome: string;
    tipo: string;
    dataCriacao?: string;
}

interface Produto {
    id: number;
    descricao: string;
    quantidade: number;
    unidade: string;
    dataCompra: string;
    validade: string;
    congelado: boolean;
    categoriaId: number;
    categoriaNome: string;
}

function formatarData(data?: string) {
    if (!data) return 'Não informada';

    const partes = data.split('-');

    if (partes.length === 3) {
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    return data;
}

function obterIcone(tipo: string) {
    const tipoNormalizado = tipo?.toUpperCase();

    if (tipoNormalizado === 'DESPENSA') return despensaIcon;
    if (tipoNormalizado === 'CONGELADOR') return freezerIcon;
    if (tipoNormalizado === 'GELADEIRA') return geladeiraIcon;

    return despensaIcon;
}

export default function DetalhesDespensa() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [despensa, setDespensa] = useState<Despensa | null>(null);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState<string | null>(null);
    const [excluindo, setExcluindo] = useState(false);

    useEffect(() => {
        async function carregarDetalhes() {
            try {
                setLoading(true);
                setErro(null);

                const respostaDespensa = await fetch(
                    `${API_URL}/api/v1/despensas/${id}`
                );

                if (!respostaDespensa.ok) {
                    throw new Error('Não foi possível carregar a despensa.');
                }

                const dadosDespensa = await respostaDespensa.json();
                setDespensa(dadosDespensa);

                const respostaProdutos = await fetch(
                    `${API_URL}/api/v1/produtos/despensa/${id}`
                );

                if (!respostaProdutos.ok) {
                    throw new Error('Não foi possível carregar os produtos.');
                }

                const dadosProdutos = await respostaProdutos.json();
                setProdutos(dadosProdutos);

            } catch (error) {
                console.error(error);
                setErro('Erro ao carregar os detalhes da despensa.');
            } finally {
                setLoading(false);
            }
        }

        carregarDetalhes();
    }, [id]);

    async function excluirDespensa() {
        const confirmar = window.confirm(
            `Tem certeza que deseja excluir "${despensa?.nome}"?`
        );

        if (!confirmar) return;

        try {
            setExcluindo(true);
            setErro(null);

            const resposta = await fetch(
                `${API_URL}/api/v1/despensas/${id}`,
                { method: 'DELETE' }
            );

            if (!resposta.ok) {
                throw new Error(
                    'Não foi possível excluir. Verifique se existem produtos vinculados.'
                );
            }

            navigate('/aplicacao/armazenamentos');

        } catch (error) {
            console.error(error);
            setErro(
                error instanceof Error
                    ? error.message
                    : 'Erro ao excluir a despensa.'
            );
        } finally {
            setExcluindo(false);
        }
    }

    if (loading) {
        return (
            <div className="px-5 pt-8 text-center font-text text-[var(--text-main)]">
                Carregando despensa...
            </div>
        );
    }

    if (!despensa) {
        return (
            <div className="px-5 pt-8 space-y-4">
                <p className="font-text text-sm text-red-600">
                    {erro || 'Despensa não encontrada.'}
                </p>
                <button
                    onClick={() => navigate('/aplicacao/armazenamentos')}
                    className="font-title font-bold text-[var(--g3)]"
                >
                    ← Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="px-5 pt-8 pb-8 space-y-6">

            <button
                onClick={() => navigate('/aplicacao/armazenamentos')}
                className="inline-flex items-center gap-2 font-text text-sm font-bold text-[var(--g3)] hover:opacity-70"
            >
                <span className="text-lg">←</span>
                Minhas despensas
            </button>

            {/* Cabeçalho */}
            <section className="flex items-center gap-4 rounded-3xl border border-zinc-200/70 bg-white/80 p-5 shadow-sm">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--g1)]/30 p-3">
                    <img
                        src={obterIcone(despensa.tipo)}
                        alt={despensa.tipo}
                        className="h-full w-full max-h-14 max-w-14 object-contain"
                    />
                </div>

                <div className="min-w-0">
                    <span className="inline-flex rounded-full bg-[var(--g1)]/40 px-3 py-1 text-[10px] font-bold text-[var(--g3)]">
                        {despensa.tipo}
                    </span>

                    <h1 className="mt-2 break-words font-title text-2xl font-bold leading-tight text-[var(--text-bold)]">
                        {despensa.nome}
                    </h1>

                    <p className="mt-1 font-text text-xs text-[var(--text-main)]">
                        Detalhes do armazenamento
                    </p>
                </div>
            </section>

            {/* Resumo */}
            <section className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-[var(--g3)] to-[var(--g2)] p-4 text-white shadow-sm">
                    <p className="font-text text-xs opacity-90">
                        Produtos armazenados
                    </p>
                    <p className="mt-1 font-title text-3xl font-bold">
                        {produtos.length}
                    </p>
                    <p className="mt-1 font-text text-xs opacity-80">
                        itens cadastrados
                    </p>
                </div>

                <div className="rounded-2xl border border-zinc-200/70 bg-white/80 p-4 shadow-sm">
                    <p className="font-text text-xs text-[var(--text-main)]">
                        Criada em
                    </p>
                    <p className="mt-2 font-title text-xl font-bold text-[var(--g3)]">
                        {formatarData(despensa.dataCriacao)}
                    </p>
                    <p className="mt-1 font-text text-xs text-[var(--text-main)]">
                        Data de criação
                    </p>
                </div>
            </section>

            {erro && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {erro}
                </p>
            )}

            {/* Produtos */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-title text-2xl font-bold text-[var(--g3)]">
                            Produtos
                        </h2>
                        <p className="mt-1 font-text text-xs text-[var(--text-main)]">
                            Alimentos guardados neste local
                        </p>
                    </div>

                    <span className="rounded-full bg-[var(--g1)]/40 px-3 py-1.5 font-text text-xs font-bold text-[var(--g3)]">
                        {produtos.length} itens
                    </span>
                </div>

                {produtos.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-zinc-300 bg-white/60 px-5 py-10 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--g1)]/25 p-3">
                            <img
                                src={obterIcone(despensa.tipo)}
                                alt={despensa.tipo}
                                className="h-full w-full max-h-10 max-w-10 object-contain opacity-70"
                            />
                        </div>

                        <div>
                            <p className="font-title font-bold text-[var(--g3)]">
                                Nenhum produto por aqui
                            </p>
                            <p className="mt-1 font-text text-xs text-[var(--text-main)]">
                                Os produtos cadastrados neste armazenamento aparecerão aqui.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {produtos.map((produto) => (
                            <li
                                key={produto.id}
                                className="rounded-2xl border border-zinc-200/70 bg-white/80 p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h3 className="break-words font-title text-lg font-bold text-[var(--g3)]">
                                            {produto.descricao}
                                        </h3>
                                        <p className="mt-1 font-text text-xs text-[var(--text-main)]">
                                            {produto.categoriaNome || 'Sem categoria'}
                                        </p>
                                    </div>

                                    <span className="shrink-0 rounded-xl bg-[var(--g1)]/40 px-3 py-2 font-title text-sm font-bold text-[var(--g3)]">
                                        {produto.quantidade} {produto.unidade}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-zinc-200 pt-3">
                                    <div>
                                        <p className="font-text text-[10px] text-[var(--text-main)]">
                                            Data da compra
                                        </p>
                                        <p className="mt-1 font-text text-xs font-bold text-[var(--g3)]">
                                            {formatarData(produto.dataCompra)}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-text text-[10px] text-[var(--text-main)]">
                                            Validade
                                        </p>
                                        <p className="mt-1 font-text text-xs font-bold text-[var(--g3)]">
                                            {formatarData(produto.validade)}
                                        </p>
                                    </div>
                                </div>

                                {produto.congelado && (
                                    <div className="mt-3 inline-flex rounded-full bg-sky-50 px-3 py-1.5">
                                        <span className="font-text text-xs font-bold text-sky-700">
                                            Armazenado congelado
                                        </span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Excluir */}
            <div className="border-t border-zinc-200 pt-5">
                <button
                    type="button"
                    onClick={excluirDespensa}
                    disabled={excluindo}
                    className="w-full rounded-full border border-red-200 bg-white px-4 py-3 font-title text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                    {excluindo ? 'Excluindo despensa...' : 'Excluir despensa'}
                </button>
            </div>

        </div>
    );
}

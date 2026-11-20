
import { useEffect, useState } from 'react';
import despensaIcon from '../assets/aplicacao/despensa.jpeg';
import API_URL from '../services/api';
import { useNavigate } from 'react-router-dom';

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

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('DESPENSA');
    const [salvando, setSalvando] = useState(false);

    const usuarioId = 1;

    const navigate = useNavigate();
    
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

    useEffect(() => {
        carregarArmazenamentos();
    }, []);

    async function criarDespensa(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!nome.trim()) {
            setErro('Digite um nome para a despensa.');
            return;
        }

        try {
            setSalvando(true);
            setErro(null);

            const resposta = await fetch(`${API_URL}/api/v1/despensas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome.trim(),
                    tipo: tipo,
                    usuarioId: usuarioId
                })
            });

            if (!resposta.ok) {
                const mensagem = await resposta.text();
                throw new Error(mensagem || 'Não foi possível criar a despensa.');
            }

            setNome('');
            setTipo('DESPENSA');
            setMostrarFormulario(false);

            await carregarArmazenamentos();

        } catch (error) {
            console.error(error);
            setErro(
                error instanceof Error
                    ? error.message
                    : 'Erro ao criar despensa.'
            );
        } finally {
            setSalvando(false);
        }
    }

    return (
        <div className="px-5 pt-8 pb-6 space-y-5">
            <h1 className="font-title text-4xl font-bold text-[var(--text-bold)]">
                Minhas despensas
            </h1>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => {
                        setMostrarFormulario(!mostrarFormulario);
                        setErro(null);
                    }}
                    className="shrink-0 rounded-full border border-[var(--g2)] bg-white/70 px-4 py-2.5 font-title text-sm font-bold text-[var(--g3)]"
                >
                    {mostrarFormulario ? 'Cancelar' : '+ Adicionar'}
                </button>

                <input
                    type="search"
                    aria-label="Pesquisar despensa"
                    placeholder="Pesquisar..."
                    className="min-w-0 flex-1 rounded-full border border-zinc-300 bg-white/70 px-4 py-2.5 font-text text-sm focus:outline-none focus:ring-2 focus:ring-[var(--g2)]"
                />
            </div>

            {mostrarFormulario && (
                <form
                    onSubmit={criarDespensa}
                    className="space-y-4 rounded-3xl border border-zinc-300/60 bg-white/80 p-5 shadow-md"
                >
                    <h2 className="font-title text-xl font-bold text-[var(--g3)]">
                        Nova despensa
                    </h2>

                    <div className="space-y-1">
                        <label className="font-text text-sm font-bold">
                            Nome
                        </label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                            placeholder="Ex: Minha geladeira"
                            required
                            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-text text-sm outline-none focus:ring-2 focus:ring-[var(--g2)]"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="font-text text-sm font-bold">
                            Tipo de armazenamento
                        </label>
                        <select
                            value={tipo}
                            onChange={(event) => setTipo(event.target.value)}
                            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-text text-sm outline-none focus:ring-2 focus:ring-[var(--g2)]"
                        >
                            <option value="DESPENSA">Despensa</option>
                            <option value="GELADEIRA">Geladeira</option>
                            <option value="CONGELADOR">Congelador</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={salvando}
                        className="w-full rounded-full bg-[var(--g3)] px-4 py-3 font-title text-sm font-bold text-white disabled:opacity-50"
                    >
                        {salvando ? 'Salvando...' : 'Criar despensa'}
                    </button>
                </form>
            )}

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
                <p className="text-center font-text text-sm">
                    Carregando despensas...
                </p>
            )}

            {erro && (
                <p className="text-center font-text text-sm text-red-600">
                    {erro}
                </p>
            )}

            {!loading && !erro && armazenamentos.length === 0 && (
                <p className="text-center font-text text-sm">
                    Você ainda não possui despensas.
                </p>
            )}

                <ul className="grid grid-cols-2 gap-3">
            {armazenamentos.map((item) => (
                <li key={item.id}>
                    <button
                        type="button"
                        onClick={() => navigate(`/aplicacao/armazenamentos/${item.id}`)}
                        className="flex w-full flex-col gap-3 rounded-3xl p-4 bg-white/80 border border-zinc-300/60 shadow-md backdrop-blur-sm text-left"
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
                    </button>
                </li>
            ))}
        </ul>
        </div>
    );
}

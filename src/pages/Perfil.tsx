
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../services/api';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    status: string;
}

export default function Perfil() {
    const usuarioId = 21;

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [editando, setEditando] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function buscarUsuario() {
            try {
                const resposta = await fetch(
                    `${API_URL}/api/v1/usuarios/${usuarioId}`
                );

                if (!resposta.ok) {
                    throw new Error();
                }

                const dados = await resposta.json();

                setUsuario(dados);
                setNome(dados.nome);
                setEmail(dados.email);
            } catch {
                setErro('Não foi possível carregar os dados do perfil.');
            }
        }

        buscarUsuario();
    }, []);

    async function salvarAlteracoes() {
        try {
            setErro('');

            const resposta = await fetch(
                `${API_URL}/api/v1/usuarios/${usuarioId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        email: email
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error();
            }

            setUsuario({
                ...usuario!,
                nome: nome,
                email: email
            });

            setEditando(false);
        } catch {
            setErro('Não foi possível atualizar o perfil.');
        }
    }

    return (
        <div className="px-5 pt-8 pb-6 space-y-6">

            <h1 className="font-title text-4xl font-bold text-[var(--text-bold)]">
                Meu perfil
            </h1>

            {erro && (
                <p className="font-text text-sm text-red-600">
                    {erro}
                </p>
            )}

            {/* informacao */}
            <section className="flex flex-col items-center gap-3 rounded-3xl bg-white/80 border border-zinc-300/60 shadow-md p-6">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--g1)]/50 border-2 border-[var(--g2)]">
                    <span className="font-title text-4xl font-bold text-[var(--g3)]">
                        {usuario ? usuario.nome.charAt(0).toUpperCase() : 'M'}
                    </span>
                </div>

                <div className="text-center">
                    <h2 className="font-title text-2xl font-bold text-[var(--g3)]">
                        {usuario ? usuario.nome : 'Carregando...'}
                    </h2>
                    <p className="font-text text-sm text-zinc-500">
                        {usuario ? usuario.email : ''}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setEditando(!editando)}
                    className="rounded-full bg-[var(--g3)] px-6 py-2 font-title text-sm font-bold text-white"
                >
                    {editando ? 'Cancelar edição' : 'Editar perfil'}
                </button>
            </section>

            {/* dados pessoais */}
            <section className="space-y-3">
                <h2 className="font-title text-xl font-bold text-[var(--g3)]">
                    Dados pessoais
                </h2>

                <div className="rounded-3xl border border-zinc-300/60 bg-white/80 p-5 shadow-sm space-y-4">

                    <div>
                        <p className="font-text text-xs text-zinc-500">
                            Nome completo
                        </p>

                        {editando ? (
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-text text-sm text-[var(--text-main)] outline-none focus:border-[var(--g3)]"
                            />
                        ) : (
                            <p className="font-text text-sm font-bold text-[var(--text-main)]">
                                {usuario?.nome || 'Carregando...'}
                            </p>
                        )}
                    </div>

                    <div className="border-t border-zinc-200 pt-3">
                        <p className="font-text text-xs text-zinc-500">
                            E-mail
                        </p>

                        {editando ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 font-text text-sm text-[var(--text-main)] outline-none focus:border-[var(--g3)]"
                            />
                        ) : (
                            <p className="font-text text-sm font-bold text-[var(--text-main)]">
                                {usuario?.email || 'Carregando...'}
                            </p>
                        )}
                    </div>

                    {editando && (
                        <button
                            type="button"
                            onClick={salvarAlteracoes}
                            className="w-full rounded-full bg-[var(--g3)] px-6 py-2 font-title text-sm font-bold text-white"
                        >
                            Salvar alterações
                        </button>
                    )}

                </div>
            </section>

            {/* gerenciar */}
            <section className="space-y-3">
                <h2 className="font-title text-xl font-bold text-[var(--g3)]">
                    Gerenciar
                </h2>

                <div className="rounded-3xl border border-zinc-300/60 bg-white/80 shadow-sm overflow-hidden">

                    <Link
                        to="/aplicacao/armazenamentos"
                        className="flex w-full items-center justify-between p-4 text-left"
                    >
                        <div>
                            <p className="font-title font-bold text-[var(--g3)]">
                                Minhas despensas
                            </p>
                            <p className="font-text text-xs text-zinc-500">
                                Visualize e gerencie suas despensas
                            </p>
                        </div>
                        <span className="text-xl text-[var(--g3)]">›</span>
                    </Link>

                    <div className="border-t border-zinc-200" />

                    <button
                        type="button"
                        className="flex w-full items-center justify-between p-4 text-left"
                    >
                        <div>
                            <p className="font-title font-bold text-[var(--g3)]">
                                Membros das despensas
                            </p>
                            <p className="font-text text-xs text-zinc-500">
                                Gerencie pessoas e suas permissões
                            </p>
                        </div>
                        <span className="text-xl text-[var(--g3)]">›</span>
                    </button>

                </div>
            </section>

        </div>
    );
}

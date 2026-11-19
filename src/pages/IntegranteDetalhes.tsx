import { Link, useParams } from 'react-router-dom';
import { integrantes } from '../data/Integrantes';

export default function IntegranteDetalhes() {
    const { slug } = useParams();

    const integrante = integrantes.find(
        (item) => item.slug === slug
    );

    if (!integrante) {
        return (
            <main className="flex flex-col items-center px-6 py-16 gap-4">
                <h1 className="font-title text-4xl font-bold text-[var(--g3)]">
                    Integrante não encontrado
                </h1>

                <Link
                    to="/integrantes"
                    className="font-title font-bold text-[var(--g3)] hover:underline"
                >
                    Voltar para integrantes
                </Link>
            </main>
        );
    }

    return (
        <main className="px-6 py-12">
            <section className="
                flex flex-col items-center
                max-w-3xl mx-auto
                p-8 gap-6
                rounded-2xl
                bg-white/40
                border border-zinc-400/30
                shadow-md backdrop-blur-sm
            ">
                <img
                    src={integrante.imagem}
                    alt={integrante.nome}
                    className="
                        w-40 h-40
                        rounded-full
                        object-cover
                        border-4 border-[var(--g2)]
                    "
                />

                <div className="text-center space-y-2">
                    <h1 className="font-title text-4xl font-bold text-[var(--g3)]">
                        {integrante.nome}
                    </h1>

                    <h2 className="font-text font-semibold text-[var(--text-bold)]">
                        {integrante.rm}
                    </h2>

                    <p className="font-text font-bold text-[var(--text-main)] leading-relaxed">
                        {integrante.descricao}
                    </p>
                </div>

                <div className="flex gap-6">
                    {integrante.github && (
                        <a
                            href={integrante.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-title font-bold text-[var(--g3)] hover:underline"
                        >
                            GitHub
                        </a>
                    )}

                    {integrante.linkedin && (
                        <a
                            href={integrante.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-title font-bold text-[var(--g3)] hover:underline"
                        >
                            LinkedIn
                        </a>
                    )}
                </div>

                <Link
                    to="/integrantes"
                    className="
                        mt-4
                        font-title font-bold
                        text-[var(--g3)]
                        hover:underline
                    "
                >
                    Voltar para integrantes
                </Link>
            </section>
        </main>
    );
}
import { Link } from 'react-router-dom';
import type { Integrante } from '../../data/Integrantes';

interface IntegranteCardProps {
    integrante: Integrante;
}

export default function IntegranteCard({ integrante }: IntegranteCardProps) {
    return (
        <article className="
            flex flex-col items-center
            w-full max-w-sm
            p-6 gap-4
            rounded-2xl
            bg-white/40
            border border-zinc-400/30
            shadow-md backdrop-blur-sm
        ">
            <img
                src={integrante.imagem}
                alt={integrante.nome}
                className="
                    w-32 h-32
                    rounded-full
                    object-cover
                    border-4 border-[var(--g2)]
                "
            />

            <div className="text-center space-y-2">
                <h2 className="font-title text-2xl font-bold text-[var(--g3)]">
                    {integrante.nome}
                </h2>

                <h3 className="font-text font-semibold text-[var(--text-bold)]">
                    {integrante.rm}
                </h3>
            </div>

            <Link
                to={`/integrantes/${integrante.slug}`}
                className="
                    mt-2
                    font-title font-bold
                    text-[var(--g3)]
                    hover:underline
                "
            >
                Ver perfil
            </Link>
        </article>
    );
}
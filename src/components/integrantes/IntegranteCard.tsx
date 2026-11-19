
import type { Integrante } from '../../data/Integrantes';

interface IntegranteCardProps
{
    integrante: Integrante;
}

export default function IntegranteCard({ integrante }: IntegranteCardProps){
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

                <p className="font-text text-[var(--text-main)] font-bold leading-relaxed">
                    {integrante.descricao}
                </p>
            </div>

            <div className="flex gap-4">
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
        </article>
    );
}

import { Link } from 'react-router-dom';

import heroImage from '../../assets/home/hero.jpeg';
import despensaIcon from '../../assets/aplicacao/despensa.svg';
import perfilIcon from '../../assets/aplicacao/perfil.svg';

const telas = [
    {
        to: '/aplicacao/armazenamentos',
        titulo: 'Despensas',
        texto: 'Geladeira, congelador e despensa. Cadastre os produtos e acompanhe as validades.',
        icone: despensaIcon,
    },
   
    {
        to: '/aplicacao/perfil',
        titulo: 'Perfil',
        texto: 'Sua conta e as despensas que você compartilha com outras pessoas.',
        icone: perfilIcon,
    },
];

export default function AppHome() {
    return (
        <div className="px-5 pt-8 pb-6 space-y-6">
            {/* INTRODUÇÃO: foto + texto do lado */}
            <section className="flex items-center gap-4 rounded-2xl bg-white/60 border border-zinc-400/30 p-4 shadow-md backdrop-blur-sm">
                <img
                    src={heroImage}
                    alt="Plantas"
                    className="h-28 w-28 shrink-0 rounded-2xl object-cover"
                />

                <div className="min-w-0 space-y-1">
                    <h1 className="font-title text-3xl font-bold text-[var(--text-bold)]">
                        <span className="text-[var(--g3)]">Rot</span>Tracker
                    </h1>
                    <p className="font-text text-sm font-bold leading-snug text-[var(--text-main)]">
                        Controle a validade dos seus alimentos e evite desperdício.
                    </p>
                </div>
            </section>

            {/* RESUMO DAS OUTRAS TELAS */}
            <section className="space-y-3">
                <h2 className="font-title text-xl font-bold text-[var(--text-bold)]">Explore o app</h2>

                <ul className="space-y-3">
                    {telas.map((tela) => (
                        <li key={tela.to}>
                            <Link
                                to={tela.to}
                                className="
                                    flex items-center gap-4
                                    rounded-2xl bg-white/60 border border-zinc-400/30
                                    p-4 shadow-md backdrop-blur-sm
                                    transition-transform active:scale-95
                                "
                            >
                                <img src={tela.icone} alt="" className="h-10 w-10 shrink-0 object-contain" />

                                <div className="min-w-0 flex-1">
                                    <h3 className="font-title text-lg font-bold text-[var(--g3)]">{tela.titulo}</h3>
                                    <p className="font-text text-xs font-bold leading-snug text-[var(--text-main)]">
                                        {tela.texto}
                                    </p>
                                </div>

                                <span aria-hidden="true" className="font-title text-2xl font-bold text-[var(--g2)]">›</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
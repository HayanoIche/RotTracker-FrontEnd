import { Link } from 'react-router-dom';

import geladeira from '../assets/home/hero.jpeg';
import PageTitle from '../components/common/PageTitle';

const funcionalidades = [
    {
        titulo: 'Cadastre seus alimentos',
        descricao: 'Registre o que comprou, a quantidade e a data de validade de cada produto.',
    },
    {
        titulo: 'Organize por local',
        descricao: 'Separe os produtos entre despensa, geladeira e congelador. Assim você sabe o que tem e onde encontrar.',
    },
    {
        titulo: 'Acompanhe as validades',
        descricao: 'Consulte as datas que você registrou para planejar as refeições e usar primeiro o que está perto de vencer.',
    },
];

export default function Sobre() {
    return (
        <div className="pb-12 md:pb-16">
            <div className="px-5 py-4 md:py-8">
                <PageTitle
                    title="Sobre o RotTracker"
                    subtitle="Organize os alimentos da casa e aproveite melhor o que você compra."
                />
            </div>

            <section aria-labelledby="motivo-rottracker" className="bg-zinc-500/15 px-5 py-8 sm:px-8 md:py-12">
                <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 lg:gap-14">
                    <img
                        src={geladeira}
                        alt="Geladeira com alimentos organizados em potes transparentes e embalagens."
                        className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />

                    <div className="space-y-4">
                        <h2 id="motivo-rottracker" className="font-title text-3xl font-bold text-[var(--g3)] md:text-5xl">
                            Por que criamos o RotTracker?
                        </h2>
                        <p className="font-text text-lg leading-relaxed text-zinc-700">
                            É fácil esquecer um alimento no fundo da geladeira ou comprar algo que já está no armário.
                            Quando as compras ficam espalhadas pela cozinha, acompanhar o estoque e lembrar das
                            validades fica mais difícil.
                        </p>
                        <p className="font-text text-lg leading-relaxed text-zinc-700">
                            Criamos o RotTracker na Global Solution da FIAP para ajudar quem faz as compras de casa
                            a consultar o que tem antes de ir ao mercado e reduzir o desperdício no dia a dia.
                        </p>
                    </div>
                </div>
            </section>

            <section aria-labelledby="como-funciona" className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 md:pt-14">
                <h2 id="como-funciona" className="mb-6 text-center font-title text-3xl font-bold text-[var(--g3)] md:text-4xl">
                    Como funciona
                </h2>

                <ul className="grid gap-4 md:grid-cols-3">
                    {funcionalidades.map(({ titulo, descricao }) => (
                        <li key={titulo} className="rounded-2xl border border-[var(--g1)] bg-white/80 p-5">
                            <h3 className="mb-2 font-title text-2xl font-bold text-[var(--g3)]">{titulo}</h3>
                            <p className="font-text text-base leading-relaxed text-zinc-700">{descricao}</p>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 text-center">
                    <Link
                        to="/aplicacao"
                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--g3)] px-6 py-3 font-title font-bold text-white transition-colors hover:bg-[var(--g2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--g3)]"
                    >
                        Conheça o aplicativo
                    </Link>
                </div>
            </section>
        </div>
    );
}
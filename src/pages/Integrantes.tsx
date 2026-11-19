import { integrantes } from '../data/Integrantes';
import IntegranteCard from '../components/integrantes/IntegranteCard';
import Title from '../components/home/Title';

export default function Integrantes() {
    return (
        <main className="px-6 py-12">
            <h1 className="
                text-center
                py-5
                font-title text-7xl md:text-8xl
                font-bold text-[var(--text-bold)]
                pb-15
            ">
                Integrantes
            </h1>
            
            <div className="
                grid grid-cols-1 sm:grid-cols-2
                max-w-4xl mx-auto
                gap-x-4 gap-y-8
                justify-items-center
            ">
                {integrantes.map((integrante) => (
                    <IntegranteCard
                        key={integrante.slug}
                        integrante={integrante}
                    />
                ))}
            </div>
        </main>
    );
}
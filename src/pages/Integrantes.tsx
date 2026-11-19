import { integrantes } from '../data/integrantes';
import IntegranteCard from '../components/integrantes/IntegranteCard';

export default function Integrantes() {
    return (
        <main className="px-6 py-12">
            <div className="
                grid grid-cols-1 sm:grid-cols-2
                max-w-4xl mx-auto
                gap-x-4 gap-y-8
                justify-items-center
            ">
                {integrantes.map((integrante) => (
                    <IntegranteCard
                        key={integrante.nome}
                        integrante={integrante}
                    />
                ))}
            </div>
        </main>
    );
}
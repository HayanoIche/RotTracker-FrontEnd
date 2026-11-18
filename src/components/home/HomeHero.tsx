import heroImage from '../../assets/home/hero.jpeg';

export default function Hero() {
    return (
        <section className="
            flex flex-col md:flex-row
            items-center justify-between
            gap-10
            px-8 py-20
        ">
            {/* IMAGEM */}
            <div className="flex-1">
                <img
                    src={heroImage}
                    alt="Plantas"
                    className="w-full object-cover rounded-2xl h-100"
                />
            </div>
            
            {/* TEXTO */}
            <div className="flex-1 space-y-6">
                <h1 className="font-title text-5xl font-bold text-[var(--g3)]">
                    Já esqueceu algum alimento na Geladeira?
                </h1>

                <p className="font-text text-2xl font-bold text-[var(--text-main)]">
                    Não deixe isso acontecer nunca mais! conheça o RotTracker e mantenha seus produtos catalogados. Seja avisado com notificações sobre as datas de validade dos seus produtos.
                </p>

                <button className="
                    bg-[var(--g2)]
                    px-6 py-3 rounded-full
                    font-bold text-white
                    hover:bg-[var(--g3)]
                    transition-colors
                ">
                    Conheça o projeto
                </button>
            </div>
        </section>
    );
}
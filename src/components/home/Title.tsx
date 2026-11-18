
export default function Title() {
    return (
        <section className="
            flex flex-col items-center justify-center
            text-center
            px-6 py-12 md:py-16
            gap-3
        ">
            <h1 className="
                font-title text-7xl md:text-8xl
                font-bold text-[var(--text-bold)]
                pb-6
            ">
                <span className="text-[var(--g3)]">Rot</span>Tracker
            </h1>

            <p className="
                max-w-2xl text-balance
                font-text font-bold
                text-2xl md:text-3xl lg:text-3xl
                text-[var(--text-main)] leading-relaxed
            ">
                Gerencie dinâmicamente sua despensa, geladeira e congelador!
            </p>
        </section>
    );
}

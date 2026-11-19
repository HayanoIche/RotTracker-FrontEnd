
export default function Perfil() {
    return (
        <div className="px-5 pt-8 pb-6 space-y-6">

            <h1 className="font-title text-4xl font-bold text-[var(--text-bold)]">
                Meu perfil
            </h1>

            {/* informacao */}
            <section className="flex flex-col items-center gap-3 rounded-3xl bg-white/80 border border-zinc-300/60 shadow-md p-6">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--g1)]/50 border-2 border-[var(--g2)]">
                    <span className="font-title text-4xl font-bold text-[var(--g3)]">
                        M
                    </span>
                </div>

                <div className="text-center">
                    <h2 className="font-title text-2xl font-bold text-[var(--g3)]">
                        Meu nome
                    </h2>
                    <p className="font-text text-sm text-zinc-500">
                        meuemail@email.com
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-full bg-[var(--g3)] px-6 py-2 font-title text-sm font-bold text-white"
                >
                    Editar perfil
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
                        <p className="font-text text-sm font-bold text-[var(--text-main)]">
                            Meu nome completo
                        </p>
                    </div>

                    <div className="border-t border-zinc-200 pt-3">
                        <p className="font-text text-xs text-zinc-500">
                            E-mail
                        </p>
                        <p className="font-text text-sm font-bold text-[var(--text-main)]">
                            meuemail@email.com
                        </p>
                    </div>

                </div>
            </section>

            {/* gerenciar */}
            <section className="space-y-3">
                <h2 className="font-title text-xl font-bold text-[var(--g3)]">
                    Gerenciar
                </h2>

                <div className="rounded-3xl border border-zinc-300/60 bg-white/80 shadow-sm overflow-hidden">

                    <button
                        type="button"
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
                    </button>

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

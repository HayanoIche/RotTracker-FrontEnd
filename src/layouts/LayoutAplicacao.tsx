import { Link, Outlet } from 'react-router-dom';
import AppNavbar from '../components/aplicacao/AppNavbar';

export default function LayoutAplicacao() {
    return (
        <div className="
            min-h-screen
            bg-zinc-200
            flex justify-center
        ">
            <div className="
                w-full max-w-[430px]
                min-h-screen
                bg-white
                shadow-xl
                flex flex-col
            ">
                <header className="border-b border-zinc-200 px-5 py-2">
                    <Link
                        to="/"
                        className="inline-flex min-h-11 items-center rounded font-text font-bold text-[var(--g3)] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--g3)]"
                    >
                        Voltar ao site
                    </Link>
                </header>

                <main className="flex-1 pb-24">
                    <Outlet />
                </main>

                <AppNavbar />
            </div>
        </div>
    );
}
import { Outlet } from 'react-router-dom';
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
                <main className="flex-1 pb-24">
                    <Outlet />
                </main>

                <AppNavbar />
            </div>
        </div>
    );
}
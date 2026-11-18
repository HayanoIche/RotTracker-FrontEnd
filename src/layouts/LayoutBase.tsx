import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import bg from '../assets/bg.png';
import bg2 from '../assets/bg2.png';

export default function LayoutBase() {
    return (
        <div className="min-h-screen bg-repeat" style={{ backgroundImage: `url(${bg2})` }} >
            <div className="
                min-h-screen mx-auto w-full max-w-7xl
                border-x border-zinc-500/30
                shadow-[0_0_30px_rgba(0,0,0,0.15)]">
                
                <div className="min-h-screen bg-repeat" style={{ backgroundImage: `url(${bg})` }} >
                    <Header />

                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
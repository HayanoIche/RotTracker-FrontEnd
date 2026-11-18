import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import bg from '../assets/bg.png';

export default function LayoutBase() {
    return (
        <div
            className="min-h-screen bg-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="
                min-h-screen mx-auto w-full max-w-7xl
                border-x border-zinc-500/20
            ">
                <Header />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
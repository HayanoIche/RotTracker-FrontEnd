import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import bg from '../assets/bg.png';

export default function LayoutBase()
{
    return (
        <div className="min-h-screen bg-repeat" style={{ backgroundImage: `url(${bg})`}} >
            <div className="min-h-screen top-0 z-50 mx-auto w-full max-w-5xl">
                <Header/>

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

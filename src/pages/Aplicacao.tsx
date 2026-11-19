import bg from '../assets/bg.png';
import bg2 from '../assets/bg2.png';

export default function Aplicacao() {
    return (
        <div className="min-h-screen bg-repeat" style={{ backgroundImage: `url(${bg2})` }} >
            <div className="
                min-h-screen mx-auto w-full max-w-2xl
                border-x border-zinc-500/30
                shadow-[0_0_30px_rgba(0,0,0,0.15)]">
                
                <div className="min-h-screen bg-repeat" style={{ backgroundImage: `url(${bg})` }} >
                    <main>
                        
                    </main>
                </div>
            </div>
        </div>
    );
}
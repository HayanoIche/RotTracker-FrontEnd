
import { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/integrantes', label: 'Integrantes' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contato', label: 'Contato' },
    { to: '/aplicacao', label: 'Aplicativo' },
];

function MenuButton(props: {
    isOpen: boolean;
    onClick: () => void;
}) {
    const lineStyle = "block w-6 h-[3px] bg-zinc-800 rounded-full transition-all duration-300 origin-center";
    
    return (
        <button
            onClick={props.onClick}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
            aria-label={props.isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={props.isOpen}
        >
            <span className={`${lineStyle} ${props.isOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
            <span className={`${lineStyle} ${props.isOpen ? 'opacity-0' : ''}`} />
            <span className={`${lineStyle} ${props.isOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
        </button>
    );
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="
            sticky top-0 z-50
            mx-auto w-full max-w-7xl
            bg-gradient-to-b bg-zinc-500/20
        ">
            <nav className="flex flex-wrap md:flex-nowrap items-center justify-between px-8 py-5">
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="text-zinc-800 font-title text-4xl font-bold"
                >
                    <span className="text-[var(--g3)]">Rot</span>
                    <span>Tracker</span>
                </Link>

                {/* MENU HAMBÚRGUi */}
                <MenuButton
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                />

                {/* LINKS */}
                <div className={`
                    w-full md:w-auto
                    overflow-hidden md:overflow-visible
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-60 opacity-100 pt-4' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100 md:pt-0'}
                    font-text text-2xl font-bold
                `}>
                    <ul className="
                        flex flex-col md:flex-row
                        items-center gap-0 md:gap-8
                        font-bold text-zinc-500
                    ">
                        {navLinks.map((link) => (
                            <li key={link.to} className="w-full md:w-auto">
                                <Link
                                    to={link.to}
                                    onClick={closeMenu}
                                    className="
                                        flex justify-center md:justify-start
                                        py-3 md:py-0
                                        hover:text-[var(--g3)]
                                        transition-colors
                                    "
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </nav>
        </header>
    );
}

import { NavLink } from 'react-router-dom';

import homeIcon from '../../assets/aplicacao/home.jpeg';
import iaIcon from '../../assets/aplicacao/ia.jpeg';
import despensaIcon from '../../assets/aplicacao/despensa.jpeg';
import perfilIcon from '../../assets/aplicacao/perfil.jpeg';

const navItems = [
    {
        to: '/aplicacao',
        label: 'Home',
        icon: homeIcon,
        end: true
    },
    {
        to: '/aplicacao/ia',
        label: 'IA',
        icon: iaIcon
    },
    {
        to: '/aplicacao/armazenamentos',
        label: 'Despensas',
        icon: despensaIcon
    },
    {
        to: '/aplicacao/perfil',
        label: 'Perfil',
        icon: perfilIcon
    }
];

export default function AppNavbar() {
    return (
        <nav className="
            fixed bottom-0 left-1/2 -translate-x-1/2
            z-50
            w-full max-w-[430px]
            bg-white/95
            border-t border-zinc-200
            px-3 py-3
            pb-[env(safe-area-inset-bottom)]
        ">
            <ul className="flex items-center justify-around">
                {navItems.map(({ to, label, icon, end }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            end={end}
                            className={({ isActive }) => `
                                flex flex-col items-center gap-1
                                min-w-16
                                transition-opacity duration-200
                                ${isActive ? 'opacity-100' : 'opacity-40'}
                            `}
                        >
                            <img
                                src={icon}
                                alt=""
                                className="w-7 h-7 object-contain"
                            />

                            <span className="
                                text-xs font-bold
                                text-[var(--text-bold)]
                            ">
                                {label}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
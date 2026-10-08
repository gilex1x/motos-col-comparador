'use client'

import Link from 'next/link';
import { useCompare } from "../compare-provider"

const NavigationBar = () => {
    const { addItem, removeItem, compareList } = useCompare();
    return (
        <nav className='flex w-full justify-center p-4 bg-secondary'>
            <ul className='flex w-full max-w-7xl justify-between gap-4'>
                <li>
                    <Link href="/"
                        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                    >
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href="/marcas"
                        className="rounded-md px-4 py-2 text-sm font-semibold text-foreground opacity-80 transition-colors hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                    >
                        Marcas
                    </Link>
                </li>
                {
                    compareList.length > 0 && (
                        <li>
                            <Link href="/comparador"
                                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover shadow-sm"
                            >
                                {compareList.length > 1 ? `Comparar ${compareList.length} motos` : 'Ver 1 moto'}
                            </Link>
                        </li>)
                }
            </ul>
        </nav >
    )
};

export default NavigationBar
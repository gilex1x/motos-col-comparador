'use client'

import Link from 'next/link';
import { useCompare } from "../compare-provider"

const NavigationBar = () => {
    const { addItem, removeItem, compareList } = useCompare();
    return (
        <nav className='flex full-w justify-center p-4'>
            <ul className='flex full-w justify-between gap-4'>
                <li>
                    <Link href="/"
                        className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-white dark:bg-zinc-100
                             dark:text-zinc-900"
                    >
                        Inicio
                    </Link>
                </li>
                <li>Info</li>
                {
                    compareList.length > 0 && (
                        <li>
                            <Link href="/comparador"
                                className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-white dark:bg-zinc-100
                             dark:text-zinc-900"
                            >
                                {compareList.length > 1 ? `Ver ${compareList.length} motos` : 'Ver 1 moto'}
                            </Link>
                        </li>)
                }
            </ul>
        </nav >
    )
};

export default NavigationBar
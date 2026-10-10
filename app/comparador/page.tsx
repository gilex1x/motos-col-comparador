'use client';

import Link from 'next/link';
import { useCompare } from '../compare-provider';
import CompareTable from '../components/compareTable';

const Comparador = () => {
    const { compareList, removeItem, clearCompare } = useCompare();

    // Estado vacío si no hay motos seleccionadas
    if (compareList.length === 0) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                    <svg
                        className="h-10 w-10 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                    </svg>
                </div>
                <h2 className="mt-4 text-xl font-bold text-foreground">
                    No hay motos para comparar
                </h2>
                <p className="mt-1 text-sm opacity-70">
                    Selecciona al menos una moto desde el catálogo para ver sus especificaciones lado a lado.
                </p>
                <Link
                    href="/"
                    className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                    Ir al catálogo
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Cabecera del comparador */}
            <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                        Comparador de Motos
                    </h1>
                    <p className="text-sm opacity-70">
                        Comparando {compareList.length} {compareList.length === 1 ? 'moto' : 'motos'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-primary/10"
                    >
                        + Agregar más
                    </Link>
                    <button
                        onClick={clearCompare}
                        className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-500/20"
                    >
                        Limpiar todo
                    </button>
                </div>
            </header>

            {/* Contenedor horizontal de la tabla comparativa */}
            <CompareTable compareList={compareList} removeItem={removeItem} />
        </main>
    );
};

export default Comparador;
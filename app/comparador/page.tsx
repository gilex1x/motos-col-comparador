'use client';

import Link from 'next/link';
import { useCompare } from '../compare-provider';

const Comparador = () => {
    const { compareList, removeItem, clearCompare } = useCompare();

    // Estado vacío si no hay motos seleccionadas
    if (compareList.length  === 0) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
                    <svg
                        className="h-10 w-10 text-zinc-500"
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
                <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    No hay motos para comparar
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Selecciona al menos una moto desde el catálogo para ver sus especificaciones lado a lado.
                </p>
                <Link
                    href="/"
                    className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                    Ir al catálogo
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Cabecera del comparador */}
            <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
                        Comparador de Motos
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Comparando {compareList.length} {compareList.length === 1 ? 'moto' : 'motos'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                        + Agregar más
                    </Link>
                    <button
                        onClick={clearCompare}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40"
                    >
                        Limpiar todo
                    </button>
                </div>
            </header>

            {/* Contenedor horizontal de la tabla comparativa */}
            <div className="w-full overflow-x-auto pb-6">
                <table className="w-full text-left border-collapse min-w-max bg-white dark:bg-zinc-900 rounded-xl shadow-sm overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 min-w-[150px] w-48"></th>
                            {compareList.map((moto) => (
                                <th key={moto.id} className="p-4 border-b border-zinc-200 dark:border-zinc-800 align-top min-w-[250px] max-w-[300px]">
                                    <div className="flex justify-end mb-2">
                                        <button
                                            onClick={() => removeItem(moto.id)}
                                            className="text-xs text-zinc-400 hover:text-red-500 transition"
                                            title="Quitar del comparador"
                                        >
                                            ✕ Quitar
                                        </button>
                                    </div>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-3">
                                        <img
                                            src={moto.featuredImage}
                                            alt={moto.name}
                                            className="h-full w-full object-cover"
                                        />
                                        <span className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                                            {moto.category}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                                        {moto.name}
                                    </h2>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
                        {/* Información General */}
                        <tr className="bg-zinc-50 dark:bg-zinc-800/30">
                            <td colSpan={compareList.length + 1} className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-zinc-500">
                                General
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Marca</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.brandName}</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Año</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.modelYear}</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Precio</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">${moto.price.totalEstimatedPrice.toLocaleString('es-CO')}</td>)}
                        </tr>

                        {/* Motor */}
                        <tr className="bg-zinc-50 dark:bg-zinc-800/30">
                            <td colSpan={compareList.length + 1} className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-zinc-500">
                                Motor
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Cilindraje</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.engine.displacement} cc</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Potencia</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.engine.maxPowerHp} HP</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Torque</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.engine.maxTorqueNm} Nm</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Refrigeración</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.engine.cooling}</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Alimentación</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.engine.fuelSystem}</td>)}
                        </tr>
                        
                        {/* Seguridad */}
                        <tr className="bg-zinc-50 dark:bg-zinc-800/30">
                            <td colSpan={compareList.length + 1} className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-zinc-500">
                                Seguridad y Frenos
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">ABS</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.chassis.abs}</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal align-top">Freno Delantero</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100 max-w-[200px] truncate" title={moto.chassis.frontBrake}>{moto.chassis.frontBrake}</td>)}
                        </tr>

                        {/* Dimensiones */}
                        <tr className="bg-zinc-50 dark:bg-zinc-800/30">
                            <td colSpan={compareList.length + 1} className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-zinc-500">
                                Dimensiones
                            </td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Peso en seco</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.dimensions.kerbWeightKg} kg</td>)}
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/10 transition-colors">
                            <th className="px-4 py-3 text-zinc-500 font-normal">Tanque</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">{moto.dimensions.tankCapacityGal} gal</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Comparador;
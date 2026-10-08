'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '../compare-provider';

const Comparador = () => {
    const { compareList, removeItem, clearCompare } = useCompare();

    // Estado vacío si no hay motos seleccionadas
    if (compareList.length  === 0) {
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
            <div className="w-full overflow-x-auto pb-6">
                <table className="w-full text-left border-collapse min-w-max bg-card rounded-xl shadow-sm overflow-hidden border border-border">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-r border-border bg-secondary min-w-[150px] w-48 sticky left-0 z-20"></th>
                            {compareList.map((moto) => (
                                <th key={moto.id} className="p-4 border-b border-border align-top min-w-[250px] max-w-[300px]">
                                    <div className="flex justify-end mb-2">
                                        <button
                                            onClick={() => removeItem(moto.id)}
                                            className="text-xs text-zinc-400 hover:text-red-500 transition"
                                            title="Quitar del comparador"
                                        >
                                            ✕ Quitar
                                        </button>
                                    </div>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary mb-3">
                                        <Image
                                            src={moto.featuredImage}
                                            alt={moto.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                        />
                                        <span className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                                            {moto.category}
                                        </span>
                                    </div>
                                    <h2 className="text-lg font-bold text-foreground leading-tight">
                                        {moto.name}
                                    </h2>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                        {/* Información General */}
                        <tr className="bg-secondary">
                            <td colSpan={compareList.length + 1} className="p-0 border-y border-border">
                                <div className="sticky left-0 px-4 py-3 font-bold text-xs uppercase tracking-wider opacity-70 bg-secondary inline-block">
                                General
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Marca</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.brandName}</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Año</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.modelYear}</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Precio</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-bold text-primary">${moto.price.totalEstimatedPrice.toLocaleString('es-CO')}</td>)}
                        </tr>

                        {/* Motor */}
                        <tr className="bg-secondary">
                            <td colSpan={compareList.length + 1} className="p-0 border-y border-border">
                                <div className="sticky left-0 px-4 py-3 font-bold text-xs uppercase tracking-wider opacity-70 bg-secondary inline-block">
                                Motor
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Cilindraje</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.engine.displacement} cc</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Potencia</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.engine.maxPowerHp} HP</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Torque</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.engine.maxTorqueNm} Nm</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Refrigeración</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.engine.cooling}</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Alimentación</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.engine.fuelSystem}</td>)}
                        </tr>
                        
                        {/* Seguridad */}
                        <tr className="bg-secondary">
                            <td colSpan={compareList.length + 1} className="p-0 border-y border-border">
                                <div className="sticky left-0 px-4 py-3 font-bold text-xs uppercase tracking-wider opacity-70 bg-secondary inline-block">
                                Seguridad y Frenos
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">ABS</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.chassis.abs}</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal align-top">Freno Delantero</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground max-w-[200px] truncate" title={moto.chassis.frontBrake}>{moto.chassis.frontBrake}</td>)}
                        </tr>

                        {/* Dimensiones */}
                        <tr className="bg-secondary">
                            <td colSpan={compareList.length + 1} className="p-0 border-y border-border">
                                <div className="sticky left-0 px-4 py-3 font-bold text-xs uppercase tracking-wider opacity-70 bg-secondary inline-block">
                                Dimensiones
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Peso en seco</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.dimensions.kerbWeightKg} kg</td>)}
                        </tr>
                        <tr className="hover:bg-primary/10 transition-colors">
                            <th className="px-4 py-3 opacity-70 font-normal sticky left-0 z-10 bg-card border-r border-border">Tanque</th>
                            {compareList.map(moto => <td key={moto.id} className="px-4 py-3 font-semibold text-foreground">{moto.dimensions.tankCapacityGal} gal</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Comparador;
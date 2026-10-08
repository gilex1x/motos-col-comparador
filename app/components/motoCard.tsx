'use client'
import Image from "next/image";
import type { Moto } from "@/types/moto";
import { useCompare } from "../compare-provider";

function MotoCard({ moto }: { moto: Moto }) {
    const formattedPrice = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(moto.price.totalEstimatedPrice);

    const { addItem, removeItem, isInCompare } = useCompare();
    const selected = isInCompare(moto.id);

    return (
        <div className="flex flex-col overflow-hidden align-center rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md">
            {/* Imagen destacada */}
            <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                <Image
                    src={moto.featuredImage}
                    alt={moto.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-xs">
                    {moto.category}
                </span>
            </div>

            {/* Información básica */}
            <div className="flex flex-1 flex-col p-4 text-foreground">
                <span className="text-xs font-semibold uppercase tracking-wide opacity-70">
                    {moto.brandName} • {moto.modelYear}
                </span>

                <h3 className="mt-1 text-base font-bold">
                    {moto.name}
                </h3>

                <p className="mt-1 text-xs opacity-80 line-clamp-2">
                    {moto.tagline}
                </p>

                {/* Especificación y precio */}
                <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                    <div>
                        <span className="text-[11px] opacity-70">Cilindraje</span>
                        <p className="text-xs font-semibold">
                            {moto.engine.displacement} cc
                        </p>
                    </div>

                    <div className="text-right">
                        <span className="text-[11px] opacity-70">Total estimado</span>
                        <p className="text-sm font-bold text-primary">
                            {formattedPrice}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 p-2">
                <button
                    onClick={() => selected ? removeItem(moto.id) : addItem(moto)}
                    className={`w-full px-3 py-2 text-xs rounded-md font-semibold transition-colors ${selected ? 'bg-red-500 hover:bg-red-600 text-white' :
                        'bg-primary hover:bg-primary-hover text-white'}`}>
                    {selected ? "Quitar del comparador" : "Comparar"}
                </button>
            </div>
        </div>
    );
};

export default MotoCard;
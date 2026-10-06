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
        <div className="flex flex-col overflow-hidden align-center rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            {/* Imagen destacada */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                    src={moto.featuredImage}
                    alt={moto.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
                <span className="absolute top-2.5 right-2.5 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-xs">
                    {moto.category}
                </span>
            </div>

            {/* Información básica */}
            <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    {moto.brandName} • {moto.modelYear}
                </span>

                <h3 className="mt-1 text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {moto.name}
                </h3>

                <p className="mt-1 text-xs text-zinc-600 line-clamp-2 dark:text-zinc-400">
                    {moto.tagline}
                </p>

                {/* Especificación y precio */}
                <div className="mt-4 flex items-end justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                    <div>
                        <span className="text-[11px] text-zinc-400">Cilindraje</span>
                        <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            {moto.engine.displacement} cc
                        </p>
                    </div>

                    <div className="text-right">
                        <span className="text-[11px] text-zinc-400">Total estimado</span>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            {formattedPrice}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-1">
                <button
                    onClick={() => selected ? removeItem(moto.id) : addItem(moto)}
                    className={`m-2 px-3 py-1 text-xs rounded-md ${selected ? 'bg-red-500 text-white' :
                        'bg-zinc-800 text-white'}`}>
                    {selected ? "Quitar del comparador" : "Comparar"}
                </button>
            </div>
        </div>
    );
};

export default MotoCard;
import Link from "next/link";
import Image from "next/image";
import { getAllBrands } from "@/data/brands";
import { Metadata } from "next";

export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
    title: "Marcas de Motos en Colombia",
    description: "Explora todas las marcas de motocicletas disponibles en Colombia. Yamaha, Honda, Suzuki, Bajaj, AKT y más.",
};

export default async function MarcasPage() {
    const brands = await getAllBrands();

    return (
        <main className="mx-auto flex flex-col w-full max-w-7xl py-12 px-6 sm:px-8 gap-10">
            <header className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-foreground mb-4">Marcas de Motos</h1>
                <p className="text-foreground opacity-70">
                    Explora nuestra colección de motocicletas clasificadas por sus fabricantes. 
                    Desde las más populares y económicas, hasta las motos premium de alto rendimiento.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {brands.map((brand) => (
                    <Link href={`/marcas/${brand.slug}`} key={brand.slug}>
                        <div className="flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary group">
                            <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                                <Image
                                    src={brand.logoUrl}
                                    alt={`Logo ${brand.name}`}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <h2 className="text-white text-2xl font-bold tracking-wider">{brand.name}</h2>
                                </div>
                            </div>
                            <div className="p-4 flex flex-1 flex-col">
                                <p className="text-sm opacity-80 text-foreground line-clamp-3">
                                    {brand.description}
                                </p>
                                <div className="mt-auto pt-4 flex items-center text-primary text-sm font-semibold">
                                    Ver modelos <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
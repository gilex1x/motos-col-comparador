import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/data/brands";
import { getMotosByMarca } from "@/data/motos";
import ListItems from "@/app/components/listItems";
import MotoCard from "@/app/components/motoCard";
import { Metadata } from "next";

export const revalidate = 86400; // 24 hours

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const { getAllBrands } = await import('@/data/brands');
    const brands = await getAllBrands();
    return brands.map((brand) => ({
        slug: brand.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const brand = await getBrandBySlug(slug);

    if (!brand) return { title: "Marca no encontrada" };

    return {
        title: `Motos ${brand.name} en Colombia`,
        description: brand.description,
        authors: brand.website ? [{ name: brand.name, url: brand.website }] : [{ name: brand.name }],
        publisher: brand.officialImporter || brand.name,
        openGraph: {
            title: `Motos ${brand.name} en Colombia`,
            description: brand.description,
            url: brand.website || undefined,
            siteName: brand.name,
            images: brand.logoUrl ? [
                {
                    url: brand.logoUrl,
                    alt: `Logo de ${brand.name}`,
                }
            ] : [],
        },
    };
}

export default async function BrandPage({ params }: PageProps) {
    const { slug } = await params;
    const brand = await getBrandBySlug(slug);

    if (!brand) {
        notFound();
    }

    const motos = await getMotosByMarca(slug);

    return (
        <main className="mx-auto flex flex-col w-full max-w-7xl py-8 px-6 sm:px-8 gap-10">
            {/* Breadcrumb */}
            <nav className="text-sm opacity-70 mb-2">
                <Link href="/" className="hover:underline">Inicio</Link>
                <span className="mx-2">/</span>
                <Link href="/marcas" className="hover:underline">Marcas</Link>
                <span className="mx-2">/</span>
                <span className="font-semibold text-foreground">{brand.name}</span>
            </nav>

            {/* Brand Header */}
            <section className="flex flex-col md:flex-row gap-8 items-start bg-secondary rounded-2xl overflow-hidden border border-border shadow-sm">
                <div className="relative w-full md:w-1/3  md:aspect-square flex-shrink-0">
                    <Image
                        src={brand.logoUrl}
                        alt={`Logo ${brand.name}`}
                        fill
                        className="object-contain"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:hidden">
                        <h1 className="text-white text-4xl font-bold tracking-wider">{brand.name}</h1>
                    </div>
                </div>

                <div className="flex flex-col flex-1 p-6 md:p-8 justify-center h-full">
                    <h1 className="hidden md:block text-4xl font-bold text-foreground mb-4">
                        {brand.name}
                    </h1>
                    <p className="text-foreground opacity-80 leading-relaxed text-lg">
                        {brand.description}
                    </p>

                    <div className="mt-6 flex gap-4">
                        <div className="bg-card border border-border px-4 py-2 rounded-lg text-center">
                            <span className="block text-2xl font-bold text-primary">{motos.length}</span>
                            <span className="text-xs uppercase tracking-wide opacity-70">Modelos</span>
                        </div>
                        {brand.website &&
                            <Link href={brand.website} className="bg-card border border-border px-4 py-2 rounded-lg text-center place-content-center hover:underline">
                                Ir al sitio web
                            </Link>
                        }
                    </div>
                </div>
            </section>

            {/* Motorcycles Grid */}
            <section className="mt-4">
                <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-foreground">Catálogo {brand.name}</h2>
                </div>

                {motos.length > 0 ? (
                    <ListItems>
                        {motos.map((moto) => (
                            <li key={moto.id}>
                                <MotoCard moto={moto} />
                            </li>
                        ))}
                    </ListItems>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-xl border border-border">
                        <span className="text-4xl mb-4">🏗️</span>
                        <h3 className="text-xl font-bold text-foreground">Aún no hay motos registradas</h3>
                        <p className="mt-2 text-sm opacity-70">
                            Pronto añadiremos el catálogo completo de {brand.name}.
                        </p>
                        <Link href="/" className="mt-6 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition">
                            Volver al inicio
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}

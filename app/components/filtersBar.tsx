'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const BRANDS = [
    { name: "AKT", slug: "akt" },
    { name: "Bajaj", slug: "bajaj" },
    { name: "Suzuki", slug: "suzuki" },
    { name: "Yamaha", slug: "yamaha" },
    { name: "KTM", slug: "ktm" },
    { name: "Honda", slug: "honda" },
    { name: "TVS", slug: "tvs" },
    { name: "Royal Enfield", slug: "royal-enfield" },
    { name: "Husqvarna", slug: "husqvarna" },
    { name: "Triumph", slug: "triumph" },
    { name: "BMW", slug: "bmw" },
    { name: "Ducati", slug: "ducati" }
];

const CATEGORIES = [
    "Street / Naked",
    "Sport / Pista",
    "Scooter / Moped",
    "Adventure / Doble Propósito",
    "Cruiser / Custom",
    "Touring",
    "Enduro / Cross"
];

const FilterBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentBrand = searchParams.get('brand') || '';
    const currentCategory = searchParams.get('category') || '';
    
    // Estados locales para los inputs numéricos (para aplicar debounce)
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
    const [minCc, setMinCc] = useState(searchParams.get('minCc') || '');
    const [maxCc, setMaxCc] = useState(searchParams.get('maxCc') || '');

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        
        params.set('page', '1'); // Reiniciar a página 1 al cambiar filtros
        router.replace(`/?${params.toString()}`);
    };

    // Debounce para los precios
    useEffect(() => {
        const timer = setTimeout(() => {
            if (minPrice !== (searchParams.get('minPrice') || '')) {
                updateFilter('minPrice', minPrice);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [minPrice]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (maxPrice !== (searchParams.get('maxPrice') || '')) {
                updateFilter('maxPrice', maxPrice);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [maxPrice]);

    // Debounce para cilindraje
    useEffect(() => {
        const timer = setTimeout(() => {
            if (minCc !== (searchParams.get('minCc') || '')) {
                updateFilter('minCc', minCc);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [minCc]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (maxCc !== (searchParams.get('maxCc') || '')) {
                updateFilter('maxCc', maxCc);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [maxCc]);


    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col">
                <label htmlFor="category-select" className="text-xs font-semibold mb-1.5 opacity-80 uppercase tracking-wide">Categoría</label>
                <select 
                    id="category-select"
                    value={currentCategory}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                >
                    <option value="">Todas</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="brand-select" className="text-xs font-semibold mb-1.5 opacity-80 uppercase tracking-wide">Marca</label>
                <select 
                    id="brand-select"
                    value={currentBrand}
                    onChange={(e) => updateFilter('brand', e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                >
                    <option value="">Todas</option>
                    {BRANDS.map(brand => (
                        <option key={brand.slug} value={brand.slug}>{brand.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 opacity-80 uppercase tracking-wide">Precio (COP)</label>
                <div className="flex gap-2">
                    <input 
                        type="number"
                        placeholder="Mínimo"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input 
                        type="number"
                        placeholder="Máximo"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 opacity-80 uppercase tracking-wide">Cilindraje (CC)</label>
                <div className="flex gap-2">
                    <input 
                        type="number"
                        placeholder="Mínimo"
                        value={minCc}
                        onChange={(e) => setMinCc(e.target.value)}
                        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input 
                        type="number"
                        placeholder="Máximo"
                        value={maxCc}
                        onChange={(e) => setMaxCc(e.target.value)}
                        className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="flex flex-col mt-2 pt-5 border-t border-border">
                <label htmlFor="limit-select" className="text-xs font-semibold mb-1.5 opacity-80 uppercase tracking-wide">Resultados por página</label>
                <select 
                    id="limit-select"
                    value={searchParams.get('limit') || '12'}
                    onChange={(e) => updateFilter('limit', e.target.value)}
                    className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
                >
                    <option value="12">12 motos</option>
                    <option value="24">24 motos</option>
                    <option value="48">48 motos</option>
                    <option value="96">96 motos</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
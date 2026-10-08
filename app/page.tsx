import { Suspense } from 'react'
import MotoCard from "./components/motoCard";
import ListItems from "./components/listItems";
import { getMotos } from "@/data/motos";
import { Moto } from "@/types/moto";
import SearchBar from './components/searchBar';
import FilterBar from './components/filtersBar';
import SkeletonCard from './components/skeletonCard';
import Pagination from './components/pagination';

async function MotosList({ params }: { params?: { query?: string, page?: number, limit?: number, brand?: string, category?: string, minPrice?: number, maxPrice?: number, minCc?: number, maxCc?: number } } = {}) {
    const { motos, totalPages } = await getMotos(params);

    if (motos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-4xl mb-4">🏍️💨</span>
                <h3 className="text-xl font-bold text-foreground">No encontramos motos</h3>
                <p className="mt-2 text-sm opacity-70">
                    Intenta buscar con otros términos o ajusta los filtros de marca y precio.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <ListItems>
                {motos.map((item: Moto) => <li key={item.id}> <MotoCard moto={item} /> </li>)}
            </ListItems>
            
            <Pagination totalPages={totalPages} currentPage={params?.page || 1} />
        </div>
    );
}

function MotosSkeleton({ limit }: { limit: number }) {
    return (
        <ListItems>
            {Array.from({ length: limit }).map((_, i) => (
                <li key={i}><SkeletonCard /></li>
            ))}
        </ListItems>
    );
}

export default async function Home(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 12;
    const brand = typeof searchParams.brand === 'string' ? searchParams.brand : undefined;
    const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
    const minPrice = typeof searchParams.minPrice === 'string' && !isNaN(Number(searchParams.minPrice)) ? Number(searchParams.minPrice) : undefined;
    const maxPrice = typeof searchParams.maxPrice === 'string' && !isNaN(Number(searchParams.maxPrice)) ? Number(searchParams.maxPrice) : undefined;
    const minCc = typeof searchParams.minCc === 'string' && !isNaN(Number(searchParams.minCc)) ? Number(searchParams.minCc) : undefined;
    const maxCc = typeof searchParams.maxCc === 'string' && !isNaN(Number(searchParams.maxCc)) ? Number(searchParams.maxCc) : undefined;

    return (
        <main className="mx-auto flex flex-1 w-full flex-col md:flex-row py-8 px-6 sm:px-8 gap-8">
            <aside className="w-full md:w-48 lg:w-72 flex-shrink-0 flex flex-col gap-6">
                <div className="sticky top-6 flex flex-col gap-6">
                    <SearchBar defaultQuery={query} />
                    <FilterBar />
                </div>
            </aside>

            <div className="w-full flex-1">
                <Suspense key={query + page + limit + brand + category + minPrice + maxPrice + (minCc||0) + (maxCc||0)} fallback={<MotosSkeleton limit={limit} />}>
                    <MotosList params={{ query, page, limit, brand, category, minPrice, maxPrice, minCc, maxCc }} />
                </Suspense>
            </div>
        </main>
    );
}

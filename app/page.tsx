import { Suspense } from 'react'
import MotoCard from "./components/motoCard";
import ListItems from "./components/listItems";
import { getMotos } from "@/data/motos";
import { Moto } from "@/types/moto";
import SearchBar from './components/searchBar';

async function MotosList({ params }: { params?: { query?: string, page?: number, brand?: string } } = {}) {
    const { motos } = await getMotos(params);

    return (
        <ListItems>
            {motos.map((item: Moto) => <li key={item.id}> <MotoCard moto={item} /> </li>)}
        </ListItems>
    );
}

export default async function Home(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;
    const query = typeof searchParams.query === 'string' ? searchParams.query : '';
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    const brand = typeof searchParams.brand === 'string' ? searchParams.brand : undefined;
    return (
        <main className="mx-auto flex flex-1 w-full max-w-7xl flex-col items-center py-12 px-6 sm:px-8 dark:bg-black">
            <SearchBar defaultQuery={query} />
            <div className="w-full">
                <Suspense key={query + page + brand} fallback={<p className="text-center w-full py-10 dark:text-white">Cargando motos...</p>}>
                    <MotosList params={{ query, page, brand }} />
                </Suspense>
            </div>
        </main>
    );
}

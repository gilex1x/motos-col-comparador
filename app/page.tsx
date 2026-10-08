import { Suspense } from 'react'
import MotoCard from "./components/motoCard";
import ListItems from "./components/listItems";
import { getMotos } from "@/data/motos";
import { Moto } from "@/types/moto";

async function MotosList() {
    const data: Moto[] = await getMotos();
    
    return (
        <ListItems>
            {data.map(item => <li key={item.id}> <MotoCard moto={item} /> </li>)}
        </ListItems>
    );
}

export default function Home() {
    return (
        <main className="mx-auto flex flex-1 w-full max-w-7xl flex-col items-center py-12 px-6 sm:px-8 dark:bg-black">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-6">
                Comparador de motos
            </h1>
            <div className="w-full">
                <Suspense fallback={<p className="text-center w-full py-10 dark:text-white">Cargando motos...</p>}>
                    <MotosList />
                </Suspense>
            </div>
        </main>
    );
}

'use client'
import { getMotos } from "@/data/motos";
import MotoCard from "./components/motoCard";
import { Moto } from "@/types/moto";
import ListItems from "./components/listItems";

export default function Home() {
    const data: Moto[] = getMotos();

    return (
        <main className="mx-auto flex flex-1 w-full max-w-7xl flex-col items-center py-12 px-6 sm:px-8 dark:bg-black">
            <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-6">
                Comparador de motos
            </h1>
            <div className="w-full">
                <ListItems>
                    {data.map(item => <li key={item.id}> <MotoCard moto={item} /> </li>)}
                </ListItems>
            </div>
        </main>
    );
}

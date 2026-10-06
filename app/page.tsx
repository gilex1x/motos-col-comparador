import { getMotos } from "@/data/motos";
import MotoCard from "./components/motoCard";
import { Moto } from "@/types/moto";
import ListItems from "./components/listItems";

export default async function Home() {
    const data: Moto[] = getMotos();

    return (
        <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 dark:bg-black">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
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

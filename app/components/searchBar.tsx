'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar({ defaultQuery }: { defaultQuery: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        params.set('page', '1'); // Siempre regresar a la pág 1 al buscar
        router.replace(`/?${params.toString()}`);
    };

    return (
        <input
            type="text"
            defaultValue={defaultQuery}
            onChange={(e) => {
                // Tip: En producción, deberías envolver esto en un "debounce"
                // para no hacer una petición por cada letra que el usuario teclee.
                handleSearch(e.target.value);
            }}
            placeholder="Buscar por nombre..."
        />
    );
}

'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ defaultQuery }: { defaultQuery: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState(defaultQuery);
    const initialRender = useRef(true);

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

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            if (inputValue !== (searchParams.get('query') || '')) {
                handleSearch(inputValue);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue]);

    return (
        <div className="w-full">
            <input
                type="text"
                className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Buscar por nombre..."
            />
        </div>
    );
}

'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `/?${params.toString()}`;
    };

    const goToPage = (pageNumber: number) => {
        router.push(createPageUrl(pageNumber));
    };

    return (
        <div className="mt-12 flex justify-center items-center gap-2">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 rounded-md bg-secondary text-foreground text-sm font-semibold hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Anterior
            </button>

            <span className="text-sm px-4 opacity-80">
                Página <span className="font-bold">{currentPage}</span> de <span className="font-bold">{totalPages}</span>
            </span>

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 rounded-md bg-secondary text-foreground text-sm font-semibold hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                Siguiente
            </button>
        </div>
    );
}

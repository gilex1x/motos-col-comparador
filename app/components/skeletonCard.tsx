export default function SkeletonCard() {
    return (
        <div className="flex flex-col overflow-hidden align-center rounded-xl border border-border bg-card shadow-sm animate-pulse">
            {/* Imagen destacada skeleton */}
            <div className="relative aspect-video w-full bg-secondary"></div>

            {/* Información básica skeleton */}
            <div className="flex flex-1 flex-col p-4">
                <div className="h-3 w-1/3 rounded bg-secondary mb-2"></div>
                <div className="h-5 w-3/4 rounded bg-secondary mb-3"></div>
                
                <div className="h-3 w-full rounded bg-secondary mb-1"></div>
                <div className="h-3 w-5/6 rounded bg-secondary mb-1"></div>

                {/* Especificación y precio skeleton */}
                <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                    <div className="flex flex-col gap-1 w-1/3">
                        <div className="h-2 w-1/2 rounded bg-secondary"></div>
                        <div className="h-4 w-3/4 rounded bg-secondary"></div>
                    </div>

                    <div className="flex flex-col gap-1 items-end w-1/3">
                        <div className="h-2 w-1/2 rounded bg-secondary"></div>
                        <div className="h-4 w-3/4 rounded bg-secondary"></div>
                    </div>
                </div>
            </div>

            {/* Botón skeleton */}
            <div className="flex flex-1 p-2">
                <div className="w-full h-8 rounded-md bg-secondary"></div>
            </div>
        </div>
    );
}

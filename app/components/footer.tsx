import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full border-t border-border bg-card mt-auto">
            <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center md:items-start text-sm opacity-70">
                    <p>© {new Date().getFullYear()} Motos Colombia Comparador.</p>
                    <p className="mt-1">Desarrollado por Gilberto Santamaria.</p>
                </div>
                
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href="/terminos" className="opacity-70 hover:opacity-100 hover:text-primary transition-colors">
                        Términos y Condiciones
                    </Link>
                    <a href="https://github.com/gilex1x/motos-col-comparador" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-colors">
                        Repositorio
                    </a>
                </nav>
            </div>
        </footer>
    );
}

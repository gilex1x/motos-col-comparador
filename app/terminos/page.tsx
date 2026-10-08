import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Términos y Condiciones",
    description: "Términos, condiciones y avisos legales sobre el uso de la plataforma Motos Colombia Comparador.",
};

export default function TerminosPage() {
    return (
        <main className="mx-auto flex flex-col w-full max-w-4xl py-12 px-6 sm:px-8 gap-8">
            <header className="border-b border-border pb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Términos y Condiciones de Uso</h1>
                <p className="text-sm opacity-70">Última actualización: Octubre de 2026</p>
            </header>

            <section className="prose prose-invert max-w-none text-foreground opacity-90 leading-relaxed space-y-6">
                <div>
                    <h2 className="text-xl font-bold mb-2">1. Naturaleza de la Plataforma</h2>
                    <p>
                        <strong>Motos Colombia Comparador</strong> es una herramienta informativa diseñada para ayudar a los usuarios a comparar especificaciones técnicas y precios estimados de motocicletas en Colombia. 
                    </p>
                    <p className="mt-2 text-primary font-medium">
                        Aviso importante: Esta plataforma NO está afiliada de ninguna manera, ni de forma comercial ni oficial, a ninguna plataforma de compra y venta, concesionario, ensambladora o marca de motocicletas mencionada en este sitio.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">2. Autoría y Propiedad del Código</h2>
                    <p>
                        Esta plataforma ha sido desarrollada, diseñada y es mantenida exclusivamente por <strong>Gilberto Santamaria</strong>. 
                    </p>
                    <p className="mt-2">
                        El código fuente de esta página es público y se encuentra disponible para su consulta con fines educativos en su repositorio de GitHub. Sin embargo, que el código sea público <strong>NO autoriza a terceros</strong> a copiar, clonar, distribuir o utilizar este software, ni ninguna de sus partes, para fines comerciales sin haber solicitado y obtenido una autorización explícita por escrito del autor y dueño del código.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">3. Privacidad y Datos Personales</h2>
                    <p>
                        Respetamos profundamente la privacidad de nuestros usuarios. Esta página web <strong>NO almacena, recopila ni procesa datos personales</strong> de los visitantes para ningún fin publicitario, comercial o de seguimiento. No requerimos registro ni creación de cuentas para acceder a nuestras herramientas de comparación.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">4. Exactitud de la Información</h2>
                    <p>
                        Aunque hacemos nuestro mejor esfuerzo para mantener la información, fichas técnicas y precios actualizados mediante recopilación pública, todos los datos mostrados tienen un carácter meramente referencial. Los precios finales, disponibilidad, años y características pueden variar en cualquier momento y dependerán estrictamente de los concesionarios y canales oficiales de cada marca.
                    </p>
                </div>
            </section>
        </main>
    );
}

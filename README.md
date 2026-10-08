# Motos Colombia Comparador 🏍️

Plataforma web desarrollada para ayudar a los usuarios en Colombia a comparar de manera rápida y sencilla especificaciones técnicas, dimensiones y precios estimados de diversas motocicletas disponibles en el mercado.

## ⚠️ Aviso Legal e Independencia
**Motos Colombia Comparador** es una herramienta informativa e independiente. **No está afiliada de manera comercial ni oficial** a ninguna ensambladora, marca de motocicletas, concesionario o plataforma de compra y venta mencionada en este sitio. Los datos, especificaciones y precios son puramente referenciales.

## 🔒 Privacidad
Este proyecto fue diseñado respetando la privacidad del usuario. **No se almacenan, recopilan ni procesan datos personales**. No requerimos registro para utilizar nuestras herramientas de comparación.

## 🛠️ Tecnologías Utilizadas
- [Next.js 15](https://nextjs.org/) (App Router & Server Components)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (PostgreSQL & Backend as a Service)
- Generación de sitios estáticos (SSG) para alto rendimiento y SEO.

## 📜 Licencia y Uso del Código

El código fuente de este proyecto es público y está disponible en este repositorio. Su propósito es servir como referencia, portafolio y recurso educativo.

**Autor:** Gilberto Santamaria

### Condiciones de Uso:
- ✅ Puedes leer, analizar y aprender del código.
- ✅ Puedes hacer un "fork" del proyecto para uso estrictamente personal y educativo.
- ❌ **No puedes utilizar este código para fines comerciales** sin haber solicitado y obtenido una autorización explícita y por escrito del autor.
- ❌ No puedes empaquetar, vender o redistribuir esta plataforma como propia.

Para más detalles, consulta el archivo [LICENSE](LICENSE) incluido en este repositorio.

## 🚀 Instalación Local (Desarrollo)

Si deseas correr el proyecto en tu entorno local para estudiarlo:

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd motos-col-comparador
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tus variables de entorno conectadas a tu propia instancia de Supabase en un archivo `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
   ```
4. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

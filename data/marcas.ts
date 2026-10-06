import { Marca } from "@/types/marca";

export const MARCAS: Marca[] = [
  {
    id: "yamaha",
    name: "Yamaha",
    slug: "yamaha",
    country: "Japón",
    description:
      "Una de las marcas líderes en Colombia, reconocida por fiabilidad, tecnología Blue Core y alta reventa. Ensamblada y distribuida por Incolmotos Yamaha.",
    logo: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300&auto=format&fit=crop&q=60",
    officialImporter: "Incolmotos Yamaha",
    website: "https://www.incolmotos-yamaha.com.co",
    motoCount: 14,
  },
  {
    id: "bajaj",
    name: "Bajaj",
    slug: "bajaj",
    country: "India",
    description:
      "Líder histórico en ventas en Colombia con la mítica familia Pulsar, Boxer y Dominar. Ensamblada en Colombia por Grupo UMA.",
    logo: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300&auto=format&fit=crop&q=60",
    officialImporter: "Grupo UMA",
    website: "https://grupouma.com/colombia",
    motoCount: 12,
  },
  {
    id: "akt",
    name: "AKT Motos",
    slug: "akt",
    country: "Colombia",
    description:
      "Marca colombiana ensamblada en Envigado por Corbeta. Es la creadora de la NKD 125, la moto más vendida en la historia del país.",
    logo: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=300&auto=format&fit=crop&q=60",
    officialImporter: "Corbeta S.A.",
    website: "https://www.aktmotos.com",
    motoCount: 16,
  },
  {
    id: "suzuki",
    name: "Suzuki",
    slug: "suzuki",
    country: "Japón",
    description:
      "Famosa por su durabilidad y desempeño, con ensambladora propia en Pereira, Risaralda. Líder en el segmento Gixxer, GN 125 y V-Strom.",
    logo: "https://images.unsplash.com/photo-1571127236794-81c1c3c99026?w=300&auto=format&fit=crop&q=60",
    officialImporter: "Suzuki Motor de Colombia S.A.",
    website: "https://www.suzuki.com.co",
    motoCount: 11,
  },
  {
    id: "honda",
    name: "Honda",
    slug: "honda",
    country: "Japón",
    description:
      "El mayor fabricante mundial de motocicletas. En Colombia cuenta con ensambladora en Yumbo, Valle del Cauca, distribuida por Fanalca.",
    logo: "https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?w=300&auto=format&fit=crop&q=60",
    officialImporter: "Fanalca S.A.",
    website: "https://motos.honda.com.co",
    motoCount: 15,
  },
  {
    id: "ktm",
    name: "KTM",
    slug: "ktm",
    country: "Austria",
    description:
      "Referente mundial en alto rendimiento 'Ready to Race'. En Colombia es ensamblada y distribuida por Auteco en Cartagena.",
    logo: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=300&auto=format&fit=crop&q=60",
    officialImporter: "Auteco SAS",
    website: "https://www.ktm.com/es-co.html",
    motoCount: 9,
  },
];

export function getMarcas(): Marca[] {
  return MARCAS;
}

export function getMarcaBySlug(slug: string): Marca | undefined {
  return MARCAS.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
}

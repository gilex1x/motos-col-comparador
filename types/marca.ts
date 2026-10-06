export interface Marca {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  logo: string;
  officialImporter: string; // ej. Incolmotos, Auteco, Corbeta
  website?: string;
  motoCount?: number;
}

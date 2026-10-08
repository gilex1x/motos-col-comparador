import { supabase } from "@/lib/supabase";

export interface BrandDetails {
    name: string;
    slug: string;
    description: string;
    logoUrl: string;
}

export async function getAllBrands(): Promise<BrandDetails[]> {
    const { data, error } = await supabase
        .from('brands')
        .select('name, slug, description, logo_url');

    if (error || !data) {
        console.error("Error fetching brands:", error);
        return [];
    }

    return data.map(item => ({
        name: item.name,
        slug: item.slug,
        description: item.description || '',
        logoUrl: item.logo_url || ''
    }));
}

export async function getBrandBySlug(slug: string): Promise<BrandDetails | undefined> {
    const { data, error } = await supabase
        .from('brands')
        .select('name, slug, description, logo_url')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        return undefined;
    }

    return {
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        logoUrl: data.logo_url || ''
    };
}

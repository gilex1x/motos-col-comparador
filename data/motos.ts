import { Moto } from "@/types/moto";
import { supabase } from "@/lib/supabase";

export async function getMotos(params: {
  query?: string;
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minCc?: number;
  maxCc?: number;
  page?: number;
  limit?: number;
} = {}): Promise<{ motos: Moto[], totalPages: number }> {
  const { query, brand, category, minPrice, maxPrice, minCc, maxCc, page = 1, limit = 12 } = params || {};
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  let queryBuilder = supabase
    .from('motos')
    .select('*, brands!inner(name, slug)', { count: 'exact' });
  if (query) {
    queryBuilder = queryBuilder.ilike('name', `%${query}%`);
  }
  if (brand) {
    queryBuilder = queryBuilder.eq('brands.slug', brand);
  }
  if (category) {
    queryBuilder = queryBuilder.eq('category', category);
  }
  if (minPrice) {
    queryBuilder = queryBuilder.gte('price_total_estimated', minPrice);
  }
  if (maxPrice) {
    queryBuilder = queryBuilder.lte('price_total_estimated', maxPrice);
  }
  if (minCc) {
    queryBuilder = queryBuilder.gte('engine_displacement', minCc);
  }
  if (maxCc) {
    queryBuilder = queryBuilder.lte('engine_displacement', maxCc);
  }
  const { data, count, error } = await queryBuilder.range(from, to);

  if (error) {
    console.error("Error fetching motos:", error);
    return { motos: [], totalPages: 0 };
  }
  return {
    motos: data ? data.map(mapSupabaseMotoToAppMoto) : [],
    totalPages: count ? Math.ceil(count / limit) : 0,
  };
}

export async function getMotoBySlug(slug: string): Promise<Moto | undefined> {
  const { data, error } = await supabase
    .from('motos')
    .select('*, brands (name, slug)')
    .eq('slug', slug)
    .single();

  if (error || !data) return undefined;
  return mapSupabaseMotoToAppMoto(data);
}

export async function getMotosByMarca(brandSlug: string): Promise<Moto[]> {
  const { data, error } = await supabase
    .from('motos')
    .select('*, brands!inner (name, slug)')
    .eq('brands.slug', brandSlug);

  if (error || !data) return [];
  return data.map((item: any) => mapSupabaseMotoToAppMoto(item));
}

export async function getMotosByIds(slugs: string[]): Promise<Moto[]> {
  const { data, error } = await supabase
    .from('motos')
    .select('*, brands (name, slug)')
    .in('slug', slugs);

  if (error || !data) return [];
  return data.map((item: any) => mapSupabaseMotoToAppMoto(item));
}

function mapSupabaseMotoToAppMoto(row: any): Moto {
  return {
    id: row.slug, // using slug as id for frontend compatibility
    slug: row.slug,
    name: row.name,
    brandId: row.brand_id,
    brandName: row.brands?.name || 'Desconocida',
    brandSlug: row.brands?.slug || 'desconocida',
    modelYear: row.model_year,
    category: row.category,
    tagline: row.tagline,
    description: row.description,
    featuredImage: row.featured_image,
    galleryImages: row.gallery_images || [],
    price: {
      basePrice: row.price_base,
      estimatedPaperwork: row.price_estimated_paperwork,
      totalEstimatedPrice: row.price_total_estimated,
      updatedAt: row.price_updated_at,
    },
    engine: {
      displacement: row.engine_displacement,
      engineType: row.engine_type,
      maxPowerHp: row.engine_max_power_hp,
      maxPowerRpm: row.engine_max_power_rpm,
      maxTorqueNm: row.engine_max_torque_nm,
      maxTorqueRpm: row.engine_max_torque_rpm,
      cooling: row.engine_cooling,
      fuelSystem: row.engine_fuel_system,
      transmission: row.engine_transmission,
      clutch: row.engine_clutch,
    },
    chassis: {
      frameType: row.chassis_frame_type,
      frontBrake: row.chassis_front_brake,
      rearBrake: row.chassis_rear_brake,
      abs: row.chassis_abs,
      frontSuspension: row.chassis_front_suspension,
      rearSuspension: row.chassis_rear_suspension,
      frontTire: row.chassis_front_tire,
      rearTire: row.chassis_rear_tire,
    },
    dimensions: {
      kerbWeightKg: row.dim_kerb_weight_kg,
      seatHeightMm: row.dim_seat_height_mm,
      tankCapacityLiters: row.dim_tank_capacity_liters,
      tankCapacityGal: row.dim_tank_capacity_gal,
      groundClearanceMm: row.dim_ground_clearance_mm,
      estimatedConsumptionKmGal: row.dim_estimated_consumption_km_gal,
    },
    features: row.features || [],
    warrantyInfo: row.warranty_info,
    soatCategory: row.soat_category,
    paysVehicleTax: row.pays_vehicle_tax,
  };
}

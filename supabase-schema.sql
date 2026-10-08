-- Habilitar extensión para UUIDs (por defecto en Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. TIPOS DE DATOS (ENUMS)
-- Mantienen la consistencia estricta con tus tipos de TypeScript
-- ==========================================
CREATE TYPE moto_category AS ENUM (
  'Street / Naked',
  'Sport / Pista',
  'Scooter / Moped',
  'Adventure / Doble Propósito',
  'Cruiser / Custom',
  'Touring',
  'Enduro / Cross'
);

CREATE TYPE abs_type AS ENUM (
  'Doble canal',
  'Monocanal',
  'CBS (Combinado)',
  'Sin ABS (Disco/Tambor)',
  'Sin ABS (Doble Disco)'
);

CREATE TYPE fuel_system AS ENUM (
  'Inyección Electrónica (FI)',
  'Carburador'
);

CREATE TYPE cooling_type AS ENUM (
  'Líquida',
  'Aire',
  'Aceite',
  'Aire y Aceite'
);

CREATE TYPE soat_category AS ENUM (
  'Hasta 100 cc',
  '100 a 200 cc',
  'Más de 200 cc'
);


-- ==========================================
-- 2. TABLAS
-- ==========================================

-- Tabla de Marcas (Normalizada para poder escalar y añadir logos/descripciones luego)
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla Principal de Motos
-- Usamos "Flattening" para el performance: Los objetos Engine, Chassis y Dimensions 
-- se convierten en columnas con prefijos. Esto evita JOINs costosos y hace los filtros rapidísimos.
CREATE TABLE motos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
    
    -- General
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    model_year INTEGER NOT NULL CHECK (model_year >= 1900),
    category moto_category NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}', -- Arrays nativos de Postgres
    features TEXT[] DEFAULT '{}',
    warranty_info TEXT NOT NULL,
    soat_category soat_category NOT NULL,
    pays_vehicle_tax BOOLEAN NOT NULL DEFAULT false,
    
    -- Precio
    price_base NUMERIC NOT NULL CHECK (price_base >= 0),
    price_estimated_paperwork NUMERIC NOT NULL CHECK (price_estimated_paperwork >= 0),
    price_total_estimated NUMERIC NOT NULL CHECK (price_total_estimated >= 0),
    price_updated_at TEXT NOT NULL, 
    
    -- Motor (Engine Specs)
    engine_displacement NUMERIC NOT NULL CHECK (engine_displacement > 0),
    engine_type TEXT NOT NULL,
    engine_max_power_hp NUMERIC NOT NULL,
    engine_max_power_rpm INTEGER NOT NULL,
    engine_max_torque_nm NUMERIC NOT NULL,
    engine_max_torque_rpm INTEGER NOT NULL,
    engine_cooling cooling_type NOT NULL,
    engine_fuel_system fuel_system NOT NULL,
    engine_transmission TEXT NOT NULL,
    engine_clutch TEXT, -- Nullable
    
    -- Chasis (Chassis Specs)
    chassis_frame_type TEXT, -- Nullable
    chassis_front_brake TEXT NOT NULL,
    chassis_rear_brake TEXT NOT NULL,
    chassis_abs abs_type NOT NULL,
    chassis_front_suspension TEXT NOT NULL,
    chassis_rear_suspension TEXT NOT NULL,
    chassis_front_tire TEXT NOT NULL,
    chassis_rear_tire TEXT NOT NULL,
    
    -- Dimensiones (Dimension Specs)
    dim_kerb_weight_kg NUMERIC NOT NULL,
    dim_seat_height_mm INTEGER NOT NULL,
    dim_tank_capacity_liters NUMERIC NOT NULL,
    dim_tank_capacity_gal NUMERIC NOT NULL,
    dim_ground_clearance_mm INTEGER, -- Nullable
    dim_estimated_consumption_km_gal NUMERIC, -- Nullable
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==========================================
-- 3. ÍNDICES DE RENDIMIENTO (Performance)
-- ==========================================
-- Claves foráneas y campos por los que se filtra o busca a menudo
CREATE INDEX idx_motos_brand_id ON motos(brand_id);
CREATE INDEX idx_motos_category ON motos(category);
CREATE INDEX idx_motos_slug ON motos(slug);
CREATE INDEX idx_brands_slug ON brands(slug);


-- ==========================================
-- 4. TRIGGERS PARA UPDATED_AT AUTOMÁTICO
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_brands_updated_at
    BEFORE UPDATE ON brands
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_motos_updated_at
    BEFORE UPDATE ON motos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


-- ==========================================
-- 5. SEGURIDAD (RLS - Row Level Security)
-- ==========================================
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE motos ENABLE ROW LEVEL SECURITY;

-- 5.1 Políticas de Lectura (Cualquier persona puede ver el catálogo)
CREATE POLICY "Permitir lectura pública de marcas" 
ON brands FOR SELECT USING (true);

CREATE POLICY "Permitir lectura pública de motos" 
ON motos FOR SELECT USING (true);

-- 5.2 Políticas de Escritura (Solo admins / usuarios logueados pueden crear o editar)
-- Reemplaza 'authenticated' por el chequeo de roles que vayas a usar, o déjalo así para un panel básico.
CREATE POLICY "Solo usuarios auth pueden modificar marcas" 
ON brands FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Solo usuarios auth pueden modificar motos" 
ON motos FOR ALL USING (auth.role() = 'authenticated');

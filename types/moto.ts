export type MotoCategory =
  | "Street / Naked"
  | "Sport / Pista"
  | "Scooter / Moped"
  | "Adventure / Doble Propósito"
  | "Cruiser / Custom"
  | "Touring"
  | "Enduro / Cross";

export type ABSType =
  | "Doble canal"
  | "Monocanal"
  | "CBS (Combinado)"
  | "Sin ABS (Disco/Tambor)"
  | "Sin ABS (Doble Disco)";

export type FuelSystem = "Inyección Electrónica (FI)" | "Carburador";
export type CoolingType = "Líquida" | "Aire" | "Aceite" | "Aire y Aceite";

export interface MotoPrice {
  basePrice: number; // Precio de lista COP sin papeles
  estimatedPaperwork: number; // Estimado SOAT + Matrícula + Placa COP
  totalEstimatedPrice: number; // Precio total aproximado puesto en calle
  updatedAt: string; // Fecha de actualización del precio
}

export interface EngineSpecs {
  displacement: number; // Cilindraje en cc (ej: 249)
  engineType: string; // ej. Monocilíndrico, 4 tiempos, SOHC, 4 válvulas
  maxPowerHp: number; // Caballos de fuerza (HP)
  maxPowerRpm: number; // RPM de potencia máxima
  maxTorqueNm: number; // Torque en Nm
  maxTorqueRpm: number; // RPM de torque máximo
  cooling: CoolingType;
  fuelSystem: FuelSystem;
  transmission: string; // ej. 6 velocidades, Automática CVT
  clutch?: string; // ej. Húmedo multidisco con embrague antirebote
}

export interface ChassisSpecs {
  frameType?: string; // ej. Diamante, Tubular en acero, Deltabox
  frontBrake: string; // ej. Disco 300 mm con cáliper de 2 pistones
  rearBrake: string; // ej. Disco 240 mm con cáliper de 1 pistón
  abs: ABSType;
  frontSuspension: string; // ej. Horquilla telescópica invertida
  rearSuspension: string; // ej. Monoamortiguador ajustable
  frontTire: string; // ej. 110/70 R17
  rearTire: string; // ej. 150/60 R17
}

export interface DimensionSpecs {
  kerbWeightKg: number; // Peso en orden de marcha (kg)
  seatHeightMm: number; // Altura del asiento al suelo (mm)
  tankCapacityLiters: number; // Capacidad de combustible en litros
  tankCapacityGal: number; // Capacidad en galones (habitual en Colombia)
  groundClearanceMm?: number; // Despeje al suelo
  estimatedConsumptionKmGal?: number; // Consumo promedio estimado (km/galón)
}

export interface Moto {
  id: string;
  slug: string;
  name: string;
  brandId: string;
  brandName: string;
  brandSlug: string;
  modelYear: number;
  category: MotoCategory;
  tagline: string;
  description: string;
  featuredImage: string;
  galleryImages: string[];
  price: MotoPrice;
  engine: EngineSpecs;
  chassis: ChassisSpecs;
  dimensions: DimensionSpecs;
  features: string[]; // ej. ["Iluminación Full LED", "Embrague antirrebote", "Tablero TFT digital"]
  warrantyInfo: string; // ej. "2 años o 24.000 km"
  soatCategory: "Hasta 100 cc" | "100 a 200 cc" | "Más de 200 cc";
  paysVehicleTax: boolean; // En Colombia aplica a motos con más de 125 cc
}

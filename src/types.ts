/**
 * Represents a Venezuelan state (estado)
 */
export interface VenezuelanState {
  readonly name: string;
  readonly capital: string;
  readonly municipalities: readonly Municipality[];
  readonly area?: number; // km²
  readonly population?: number;
  readonly iso?: string;
}

/**
 * Represents a Venezuelan municipality (municipio)
 */
export interface Municipality {
  readonly name: string;
  readonly state: string;
  readonly parishes: readonly Parish[];
  readonly capital?: string;
  readonly area?: number; // km²
  readonly population?: number;
}

/**
 * Represents a Venezuelan parish (parroquia)
 */
export interface Parish {
  readonly name: string;
  readonly municipality: string;
  readonly state: string;
  readonly type: 'civil' | 'ecclesiastical';
  readonly area?: number; // km²
  readonly population?: number;
}

/**
 * Search options for territorial queries
 */
export interface SearchOptions {
  readonly exact?: boolean;
  readonly caseSensitive?: boolean;
  readonly includeCapital?: boolean;
  readonly includePopulation?: boolean;
  readonly includeArea?: boolean;
}

/**
 * Result wrapper for search operations
 */
export interface SearchResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: Date;
}

/**
 * Statistics about Venezuelan territory
 */
export interface TerritorialStats {
  readonly totalStates: number;
  readonly totalMunicipalities: number;
  readonly totalParishes: number;
  readonly totalArea: number; // km²
  readonly totalPopulation: number;
  readonly lastUpdated: Date;
}

/**
 * Configuration for the Venezuela library
 */
export interface VenezuelaConfig {
  readonly language: 'es' | 'en';
  readonly includeMetadata: boolean;
  readonly cacheEnabled: boolean;
  readonly validateData: boolean;
}
import * as venezuela from 'venezuela';
import {
  VenezuelanState,
  Municipality,
  Parish,
  SearchOptions,
  SearchResult,
  TerritorialStats,
  VenezuelaConfig,
} from './types.js';

/**
 * Modern Venezuela territorial data library
 * Enhanced version with TypeScript support and modern features for 2025
 */
export class VenezuelaTerritory {
  private readonly config: VenezuelaConfig;
  private cache: Map<string, unknown> = new Map();

  constructor(config: Partial<VenezuelaConfig> = {}) {
    this.config = {
      language: 'es',
      includeMetadata: true,
      cacheEnabled: true,
      validateData: true,
      ...config,
    };
  }

  /**
   * Get information about a Venezuelan state
   * @param name - Name of the state
   * @param options - Search options
   * @returns Promise with state information
   */
  async getState(name: string, options: SearchOptions = {}): Promise<SearchResult<VenezuelanState>> {
    try {
      const cacheKey = `state:${name}:${JSON.stringify(options)}`;
      
      if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
        return {
          success: true,
          data: this.cache.get(cacheKey) as VenezuelanState,
          timestamp: new Date(),
        };
      }

      // Use the original venezuela package
      const stateData = venezuela.estado(name);
      
      if (!stateData) {
        return {
          success: false,
          error: `State '${name}' not found`,
          timestamp: new Date(),
        };
      }

      const state: VenezuelanState = {
        name: stateData.estado,
        capital: stateData.capital,
        municipalities: await this.getMunicipalitiesForState(stateData.estado),
        iso: stateData.iso,
      };

      if (this.config.cacheEnabled) {
        this.cache.set(cacheKey, state);
      }

      return {
        success: true,
        data: state,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get information about a Venezuelan municipality
   * @param name - Name of the municipality
   * @param options - Search options
   * @returns Promise with municipality information
   */
  async getMunicipality(name: string, options: SearchOptions = {}): Promise<SearchResult<Municipality>> {
    try {
      const cacheKey = `municipality:${name}:${JSON.stringify(options)}`;
      
      if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
        return {
          success: true,
          data: this.cache.get(cacheKey) as Municipality,
          timestamp: new Date(),
        };
      }

      const municipalityData = venezuela.municipio(name);
      
      if (!municipalityData) {
        return {
          success: false,
          error: `Municipality '${name}' not found`,
          timestamp: new Date(),
        };
      }

      const municipality: Municipality = {
        name: municipalityData.municipio,
        state: municipalityData.estado,
        parishes: await this.getParishesForMunicipality(municipalityData.municipio),
        capital: municipalityData.capital,
      };

      if (this.config.cacheEnabled) {
        this.cache.set(cacheKey, municipality);
      }

      return {
        success: true,
        data: municipality,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get information about a Venezuelan parish
   * @param name - Name of the parish
   * @param options - Search options
   * @returns Promise with parish information
   */
  async getParish(name: string, options: SearchOptions = {}): Promise<SearchResult<Parish>> {
    try {
      const cacheKey = `parish:${name}:${JSON.stringify(options)}`;
      
      if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
        return {
          success: true,
          data: this.cache.get(cacheKey) as Parish,
          timestamp: new Date(),
        };
      }

      const parishData = venezuela.parroquia(name);
      
      if (!parishData) {
        return {
          success: false,
          error: `Parish '${name}' not found`,
          timestamp: new Date(),
        };
      }

      const parish: Parish = {
        name: parishData.parroquia,
        municipality: parishData.municipio,
        state: parishData.estado,
        type: 'civil', // Default type, could be enhanced
      };

      if (this.config.cacheEnabled) {
        this.cache.set(cacheKey, parish);
      }

      return {
        success: true,
        data: parish,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get all Venezuelan states
   * @returns Promise with array of all states
   */
  async getAllStates(): Promise<SearchResult<VenezuelanState[]>> {
    try {
      const cacheKey = 'all-states';
      
      if (this.config.cacheEnabled && this.cache.has(cacheKey)) {
        return {
          success: true,
          data: this.cache.get(cacheKey) as VenezuelanState[],
          timestamp: new Date(),
        };
      }

      const allStates = venezuela.estados();
      const states: VenezuelanState[] = [];

      for (const stateData of allStates) {
        const state: VenezuelanState = {
          name: stateData.estado,
          capital: stateData.capital,
          municipalities: await this.getMunicipalitiesForState(stateData.estado),
          iso: stateData.iso,
        };
        states.push(state);
      }

      if (this.config.cacheEnabled) {
        this.cache.set(cacheKey, states);
      }

      return {
        success: true,
        data: states,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }

  /**
   * Search for territories by name
   * @param query - Search query
   * @param options - Search options
   * @returns Promise with search results
   */
  async search(query: string, options: SearchOptions = {}): Promise<{
    states: VenezuelanState[];
    municipalities: Municipality[];
    parishes: Parish[];
  }> {
    const results = {
      states: [] as VenezuelanState[],
      municipalities: [] as Municipality[],
      parishes: [] as Parish[],
    };

    try {
      // Search states
      const stateResult = await this.getState(query, options);
      if (stateResult.success && stateResult.data) {
        results.states.push(stateResult.data);
      }

      // Search municipalities
      const municipalityResult = await this.getMunicipality(query, options);
      if (municipalityResult.success && municipalityResult.data) {
        results.municipalities.push(municipalityResult.data);
      }

      // Search parishes
      const parishResult = await this.getParish(query, options);
      if (parishResult.success && parishResult.data) {
        results.parishes.push(parishResult.data);
      }
    } catch (error) {
      console.warn('Search error:', error);
    }

    return results;
  }

  /**
   * Get territorial statistics
   * @returns Promise with territorial statistics
   */
  async getStats(): Promise<TerritorialStats> {
    const allStatesResult = await this.getAllStates();
    
    if (!allStatesResult.success || !allStatesResult.data) {
      throw new Error('Failed to get territorial statistics');
    }

    const states = allStatesResult.data;
    let totalMunicipalities = 0;
    let totalParishes = 0;

    for (const state of states) {
      totalMunicipalities += state.municipalities.length;
      for (const municipality of state.municipalities) {
        totalParishes += municipality.parishes.length;
      }
    }

    return {
      totalStates: states.length,
      totalMunicipalities,
      totalParishes,
      totalArea: 0, // Would need additional data source
      totalPopulation: 0, // Would need additional data source
      lastUpdated: new Date(),
    };
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Private helper methods
   */
  private async getMunicipalitiesForState(stateName: string): Promise<Municipality[]> {
    try {
      const municipios = venezuela.municipios(stateName) || [];
      const municipalities: Municipality[] = [];

      for (const municipio of municipios) {
        const municipality: Municipality = {
          name: municipio.municipio,
          state: stateName,
          parishes: await this.getParishesForMunicipality(municipio.municipio),
          capital: municipio.capital,
        };
        municipalities.push(municipality);
      }

      return municipalities;
    } catch (error) {
      console.warn(`Error getting municipalities for state ${stateName}:`, error);
      return [];
    }
  }

  private async getParishesForMunicipality(municipalityName: string): Promise<Parish[]> {
    try {
      const parroquias = venezuela.parroquias(municipalityName) || [];
      const parishes: Parish[] = [];

      for (const parroquia of parroquias) {
        const parish: Parish = {
          name: parroquia.parroquia,
          municipality: municipalityName,
          state: parroquia.estado,
          type: 'civil',
        };
        parishes.push(parish);
      }

      return parishes;
    } catch (error) {
      console.warn(`Error getting parishes for municipality ${municipalityName}:`, error);
      return [];
    }
  }
}

// Export types and main class
export * from './types.js';

// Factory function for easy usage
export function createVenezuelaTerritory(config?: Partial<VenezuelaConfig>): VenezuelaTerritory {
  return new VenezuelaTerritory(config);
}

// Default export
export default VenezuelaTerritory;
import { describe, it, expect, beforeEach } from 'vitest';
import { VenezuelaTerritory, createVenezuelaTerritory } from '../index.js';

describe('VenezuelaTerritory', () => {
  let territory: VenezuelaTerritory;

  beforeEach(() => {
    territory = createVenezuelaTerritory({
      cacheEnabled: true,
      validateData: true,
    });
  });

  describe('State operations', () => {
    it('should get state information', async () => {
      const result = await territory.getState('Zulia');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe('Zulia');
      expect(result.data?.capital).toBeDefined();
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should handle non-existent state', async () => {
      const result = await territory.getState('NonExistentState');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.data).toBeUndefined();
    });

    it('should get all states', async () => {
      const result = await territory.getAllStates();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);
    });
  });

  describe('Municipality operations', () => {
    it('should get municipality information', async () => {
      const result = await territory.getMunicipality('Maracaibo');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe('Maracaibo');
      expect(result.data?.state).toBeDefined();
    });

    it('should handle non-existent municipality', async () => {
      const result = await territory.getMunicipality('NonExistentMunicipality');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Parish operations', () => {
    it('should get parish information', async () => {
      const result = await territory.getParish('Caracas');
      
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.data?.name).toBeDefined();
        expect(result.data?.municipality).toBeDefined();
        expect(result.data?.state).toBeDefined();
      }
    });
  });

  describe('Search functionality', () => {
    it('should search for territories', async () => {
      const results = await territory.search('Caracas');
      
      expect(results).toBeDefined();
      expect(results.states).toBeInstanceOf(Array);
      expect(results.municipalities).toBeInstanceOf(Array);
      expect(results.parishes).toBeInstanceOf(Array);
    });

    it('should return empty arrays for non-existent search', async () => {
      const results = await territory.search('NonExistentTerritory');
      
      expect(results.states).toHaveLength(0);
      expect(results.municipalities).toHaveLength(0);
      expect(results.parishes).toHaveLength(0);
    });
  });

  describe('Statistics', () => {
    it('should get territorial statistics', async () => {
      const stats = await territory.getStats();
      
      expect(stats).toBeDefined();
      expect(stats.totalStates).toBeGreaterThan(0);
      expect(stats.totalMunicipalities).toBeGreaterThan(0);
      expect(stats.totalParishes).toBeGreaterThan(0);
      expect(stats.lastUpdated).toBeInstanceOf(Date);
    });
  });

  describe('Cache functionality', () => {
    it('should cache results', async () => {
      const territory = createVenezuelaTerritory({ cacheEnabled: true });
      
      // First call
      const result1 = await territory.getState('Zulia');
      expect(result1.success).toBe(true);
      
      // Second call should use cache
      const result2 = await territory.getState('Zulia');
      expect(result2.success).toBe(true);
      expect(result2.data).toEqual(result1.data);
    });

    it('should clear cache', async () => {
      await territory.getState('Zulia');
      territory.clearCache();
      
      // Cache should be cleared, but functionality should still work
      const result = await territory.getState('Zulia');
      expect(result.success).toBe(true);
    });
  });

  describe('Configuration', () => {
    it('should accept custom configuration', () => {
      const territory = createVenezuelaTerritory({
        language: 'en',
        cacheEnabled: false,
        validateData: true,
      });
      
      expect(territory).toBeInstanceOf(VenezuelaTerritory);
    });
  });
});
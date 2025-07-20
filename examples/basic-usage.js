#!/usr/bin/env node

/**
 * Example usage of venezuela-territorial-2025
 * Run with: node examples/basic-usage.js
 */

import { createVenezuelaTerritory } from '../dist/index.esm.js';

async function main() {
  console.log('Venezuela Territorial 2025 - Example Usage\n');

  // Create territory instance
  const territory = createVenezuelaTerritory({
    cacheEnabled: true,
    validateData: true,
  });

  try {
    // Example 1: Get state information
    console.log('Getting state information for Zulia...');
    const stateResult = await territory.getState('Zulia');
    
    if (stateResult.success && stateResult.data) {
      console.log(`State: ${stateResult.data.name}`);
      console.log(`Capital: ${stateResult.data.capital}`);
      console.log(`Municipalities: ${stateResult.data.municipalities.length}`);
      console.log(`Total parishes: ${stateResult.data.municipalities.reduce((sum, m) => sum + m.parishes.length, 0)}`);
    } else {
      console.log(`Error: ${stateResult.error}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Example 2: Get municipality information
    console.log('Getting municipality information for Maracaibo...');
    const municipalityResult = await territory.getMunicipality('Maracaibo');
    
    if (municipalityResult.success && municipalityResult.data) {
      console.log(`Municipality: ${municipalityResult.data.name}`);
      console.log(`State: ${municipalityResult.data.state}`);
      console.log(`Parishes: ${municipalityResult.data.parishes.length}`);
      console.log(`Capital: ${municipalityResult.data.capital || 'N/A'}`);
    } else {
      console.log(`Error: ${municipalityResult.error}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Example 3: Search functionality
    console.log('Searching for "Caracas"...');
    const searchResults = await territory.search('Caracas');
    
    console.log(`States found: ${searchResults.states.length}`);
    console.log(`Municipalities found: ${searchResults.municipalities.length}`);
    console.log(`Parishes found: ${searchResults.parishes.length}`);

    if (searchResults.states.length > 0) {
      searchResults.states.forEach(state => {
        console.log(`   • State: ${state.name} (Capital: ${state.capital})`);
      });
    }

    if (searchResults.municipalities.length > 0) {
      searchResults.municipalities.forEach(municipality => {
        console.log(`   • Municipality: ${municipality.name} in ${municipality.state}`);
      });
    }

    if (searchResults.parishes.length > 0) {
      searchResults.parishes.slice(0, 3).forEach(parish => {
        console.log(`   • Parish: ${parish.name} in ${parish.municipality}, ${parish.state}`);
      });
      if (searchResults.parishes.length > 3) {
        console.log(`   • ... and ${searchResults.parishes.length - 3} more`);
      }
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Example 4: Get all states
    console.log('Getting all Venezuelan states...');
    const allStatesResult = await territory.getAllStates();
    
    if (allStatesResult.success && allStatesResult.data) {
      console.log(`Found ${allStatesResult.data.length} states:`);
      allStatesResult.data.forEach((state, index) => {
        console.log(`   ${index + 1}. ${state.name} (Capital: ${state.capital})`);
      });
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Example 5: Get territorial statistics
    console.log('Getting territorial statistics...');
    const stats = await territory.getStats();
    
    console.log('Venezuela Territorial Statistics:');
    console.log(`Total States: ${stats.totalStates}`);
    console.log(`Total Municipalities: ${stats.totalMunicipalities}`);
    console.log(`Total Parishes: ${stats.totalParishes}`);
    console.log(`Last Updated: ${stats.lastUpdated.toISOString()}`);

    console.log('\n' + '='.repeat(50) + '\n');

    // Example 6: Performance demonstration
    console.log('Performance test with caching...');
    
    console.time('First call (no cache)');
    await territory.getState('Miranda');
    console.timeEnd('First call (no cache)');
    
    console.time('Second call (with cache)');
    await territory.getState('Miranda');
    console.timeEnd('Second call (with cache)');

    console.log('\nExample completed successfully!');

  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

// Run the example
main().catch(console.error);
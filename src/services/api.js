export async function getAllCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getAllCountries:', error);
      throw error;
    }
  }
  
  export async function getCountriesByRegion(region) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      if (!response.ok) throw new Error(`Failed to fetch countries for region: ${region}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error in getCountriesByRegion (${region}):`, error);
      throw error;
    }
  }
  
  export async function getCountryByName(name) {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
      if (!response.ok) {
        console.warn(`No countries found for name: ${name}`);
        return [];
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error in getCountryByName (${name}):`, error);
      return [];
    }
  }
  
  export async function getCountriesByLanguage(language) {
    try {
      const allCountries = await getAllCountries();
      const filteredCountries = allCountries.filter(country =>
        country.languages && Object.values(country.languages).map(lang => lang.toLowerCase()).includes(language.toLowerCase())
      );
      return filteredCountries;
    } catch (error) {
      console.error(`Error in getCountriesByLanguage (${language}):`, error);
      throw error;
    }
  }
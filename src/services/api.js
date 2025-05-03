const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) throw new Error('Failed to fetch countries');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) throw new Error(`Failed to fetch countries for region: ${region}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching countries by region (${region}):`, error);
    throw error;
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?fullText=true`);
    if (!response.ok) throw new Error(`Failed to fetch country: ${name}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching country by name (${name}):`, error);
    throw error;
  }
};

export const getCountriesByLanguage = async (language) => {
  try {
    const response = await fetch(`${BASE_URL}/lang/${language}`);
    if (!response.ok) throw new Error(`Failed to fetch countries for language: ${language}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching countries by language (${language}):`, error);
    throw error;
  }
};
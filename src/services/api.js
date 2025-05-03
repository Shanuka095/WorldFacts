import axios from 'axios';

   const BASE_URL = 'https://restcountries.com/v3.1';

   export const getAllCountries = async () => {
     try {
       const response = await axios.get(`${BASE_URL}/all?fields=name,population,region,languages,flags,capital,area,subregion,latlng`);
       return response.data;
     } catch (error) {
       console.error('Error fetching all countries:', error);
       throw error;
     }
   };

   export const getCountryByName = async (name) => {
     try {
       const response = await axios.get(`${BASE_URL}/name/${name}?fields=name,population,region,languages,flags,capital,area,subregion,latlng`);
       return response.data;
     } catch (error) {
       console.error(`Error fetching country ${name}:`, error);
       throw error;
     }
   };

   export const getCountriesByRegion = async (region) => {
     try {
       const response = await axios.get(`${BASE_URL}/region/${region}?fields=name,population,region,languages,flags,capital,area,subregion,latlng`);
       return response.data;
     } catch (error) {
       console.error(`Error fetching countries by region ${region}:`, error);
       throw error;
     }
   };

   export const getCountriesByLanguage = async (language) => {
     try {
       const allCountries = await getAllCountries();
       return allCountries.filter(country =>
         Object.values(country.languages || {}).some(lang => lang.toLowerCase().includes(language.toLowerCase()))
       );
     } catch (error) {
       console.error(`Error fetching countries by language ${language}:`, error);
       throw error;
     }
   };
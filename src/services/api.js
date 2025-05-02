import axios from 'axios';
const BASE_URL = 'https://restcountries.com/v3.1';
export const getAllCountries = async () => (await axios.get(`${BASE_URL}/all?fields=name,population,region,languages,flags,capital`)).data;
export const getCountryByName = async (name) => (await axios.get(`${BASE_URL}/name/${name}?fields=name,population,region,languages,flags,capital`)).data;
export const getCountriesByRegion = async (region) => (await axios.get(`${BASE_URL}/region/${region}?fields=name,population,region,languages,flags,capital`)).data;
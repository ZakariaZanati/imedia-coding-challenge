import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemons = async (nextUrl : string | null) => {
  console.log(nextUrl)
  if(nextUrl) {
    const response = await axios.get(nextUrl, {
      params: {},
    });
    return response;
  }

};

export const getPokemon = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return response.data;
};

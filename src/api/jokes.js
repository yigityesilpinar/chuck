import axios from 'api';

export const getRandomJoke = async category =>
  axios.get(`jokes/random?category=${category}`);

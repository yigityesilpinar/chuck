import axios from 'api';

export const getRandomJoke = category =>
  axios.get(`jokes/random?category=${category}`);

export const getRandomJokes = category =>
  axios.all([
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`)
  ]);

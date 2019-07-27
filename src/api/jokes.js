import axios from 'api';

export const getRandomJoke = category =>
  axios.get(`jokes/random?category=${category}`);

export const getRandomJokes = async category =>
  axios.all([
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`)
  ]);

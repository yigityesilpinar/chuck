import axios from 'api';

// async needs await, this guy already returning a promise
export const getRandomJoke = async category =>
  axios.get(`jokes/random?category=${category}`);

export const getRandomJokes = async category =>
  axios.all([
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`),
    axios.get(`jokes/random?category=${category}`)
  ]);

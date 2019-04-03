import axios from 'api';

export const getCategories = async () => axios.get('jokes/categories');

import axios from 'axios';

axios.defaults.baseURL = 'https://api.chucknorris.io/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post.headers = { 'Access-Control-Allow-Origin': '*' };

axios.interceptors.response.use(
  response => response.data,
  async ({ response }) => {
    if (response) {
      if (response.status === 404) {
        return {
          error: {
            status: response.status,
            message: 'NotFound'
          }
        };
      }
      return {
        error: {
          status: response.status,
          message: response.data.error
        }
      };
    }
    return {
      error: {
        status: 500,
        message: 'Error500'
      }
    };
  }
);

export default axios;

import auth0 from 'auth0-js';

export const auth = new auth0.WebAuth({
    domain: 'basic-ecommerce.auth0.com',
    clientID: 'ExSJk6GOeqH6D1MbAR621dAfFUQDdfij',
    redirectUri: 'http://localhost:3000/signin',
    responseType: 'token id_token',
    scope: 'openid profile'
  });
import API from './ApiCallHandler';

export default {
  getUsers(key, userId, options = {}) {
    const path = `/cart/${userId}`;
    API.makeGetRequest(path, key, { foo: 'bar' }, options);
  },
};
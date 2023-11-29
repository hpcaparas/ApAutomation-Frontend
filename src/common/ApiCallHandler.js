import axios from "axios";
import * as qs from 'qs'

const user = JSON.parse(localStorage.getItem("user"));
const NO_CONTENT = 204;
const UNAUTHORIZED = 401;

const _pendingRequests = {};

const abortPendingRequests = (key) => {
  if (_pendingRequests[key]) {
    _pendingRequests[key]('REQUEST_CANCELLED');
    _pendingRequests[key] = null;
  }
};

const isInvalidToken = (response) => {
  if (response.status !== UNAUTHORIZED) {
    return false;
  }

  const authHeader = response.headers.get('WWW-Authenticate') || '';

  return authHeader.includes('invalid_token');
};

const processResponse = (res) => {
  if (isInvalidToken(res)) {
    return { data: {} };
  }

  if (res.status === NO_CONTENT) {
    const response = Object.assign({}, res, { data: {} });
    return response;
  }
  return res;
};

/* const handleResponse = (key, options, response, jsonResponse) => {
  const jsonRes = _.isEmpty(jsonResponse) ? {} : jsonResponse;
  const { status } = response;
  const { errors } = Object.assign({}, jsonRes);
  const resp = {
    status,
    body: jsonResponse,
    errors,
    headers: response.headers,
  };

  // use any dispatchers/method to communicate this data to the store/view
  // dispatch(key, resp)
}; */

const API = {
  getHeaders() {
    if (user && user.accessToken) {
        // For Spring Boot back-end
         return { Authorization: "Bearer " + user.accessToken };
      } else {
        return {};
      }
  },

  makeRequest(path, key, reqInit, options = {}) {
    abortPendingRequests(key);
    const headers = this.getHeaders();
    //const option = getDefaultOptions(options);
    const init = Object.assign({}, reqInit, { headers });
    axios({
      path,
      ...init,
      timeout: 30000,
    })
      .then(res => processResponse(res))
      // .then(res => {
      //   handleResponse(key, option, res, res.data);
      // })
      .catch((err) => {
        // error handling logic
      });
  },

  getParams(queryParams = {}) {
    return queryParams;
  },

  makeGetRequest(path, key, queryParams, options = {}) {
    const getData = {
      method: 'GET',
      params: this.getParams(queryParams),
      /* paramsSerializer: (params) => {
        return qs.stringify(sanitizeParams(params), { arrayFormat: 'brackets' });
      }, */
    };
    this.makeRequest(path, key, getData, options);
  },

  makePostRequest(path, key, body, options = {}) {
    const postData = {
      method: 'POST',
      data: body,
      params: this.getParams(),
     /*  paramsSerializer: (params) => {
        return qs.stringify(sanitizeParams(params), { arrayFormat: 'brackets' });
      }, */
    };
    this.makeRequest(path, key, postData, options);
  },

  makePutRequest(path, key, body, options = {}) {
    const putData = {
      method: 'PUT',
      data: body,
      params: this.getParams(),
      /* paramsSerializer: (params) => {
        return qs.stringify(sanitizeParams(params), { arrayFormat: 'brackets' });
      }, */
    };
    this.makeRequest(path, key, putData, options);
  }
};

export default API;
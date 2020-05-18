import axios from 'axios';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import { useState } from 'react';

const useGraphQL = (initialState = {}) => {
  const [state, setState] = useState({
    data: {},
    error: null,
    ...initialState,
  });

  const updateState = (updates = {}) => {
    setState(prevState => ({ ...prevState, ...updates }));
  };

  const request = (options, successCallback, failureCallback) => {
    updateState({ pending: true });
    const config = merge(
      {
        baseURL: process.env.BASE_URL,
        method: 'post',
        url: '/graphql',
      },
      options,
    );
    return axios(config)
      .then(response => {
        const errors = get(response, 'data.errors', []);
        if (errors.length > 0) {
          return onRequestFailure(errors.shift());
        }
        const data = get(response, 'data.data', {}) || {};
        return onRequestSuccess(data, successCallback);
      })
      .catch(error => {
        const { message } = error;
        let statusCode = 0;
        if (error.response) {
          const errors = get(error, 'response.data.errors', []);
          if (errors.length > 0) {
            return onRequestFailure(errors.shift(), failureCallback);
          }
          statusCode = error.response.status;
        } else if (error.request) {
          statusCode = error.request.status;
        }
        return onRequestFailure({ message, statusCode }, failureCallback);
      });
  };

  const onRequestSuccess = (data, callback) => {
    setTimeout(() => {
      updateState({
        data,
        error: null,
        pending: false,
      });
      if (isFunction(callback)) {
        callback(data);
      }
    }, 1500);
    return data;
  };

  const onRequestFailure = (data, callback) => {
    setTimeout(() => {
      const error = new Error(data.message);
      updateState({
        data: {},
        error,
        pending: false,
      });
      if (isFunction(callback)) {
        callback(error);
      }
    }, 1500);
  };

  return [state, request];
};

export default useGraphQL;

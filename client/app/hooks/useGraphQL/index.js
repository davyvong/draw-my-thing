import axios from 'axios';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import merge from 'lodash/merge';
import { useCallback, useReducer } from 'react';

import reducer from './reducer';

const useGraphQL = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, {
    data: {},
    error: null,
    pending: false,
    ...initialState,
  });

  const request = useCallback((options, successCallback, failureCallback) => {
    dispatch({ type: 'request' });
    const token = localStorage.getItem('token');
    const config = merge(
      {
        headers: token ? { authorization: `Bearer ${token}` } : {},
        method: 'post',
        url: process.env.GRAPHQL_HTTP_URL,
      },
      options,
    );
    return axios(config)
      .then(response => {
        const errors = get(response, 'data.errors', []);
        if (errors.length > 0) {
          return onRequestFailure(errors.shift(), failureCallback);
        }
        const data = get(response, 'data.data', {}) || {};
        return onRequestSuccess(data, successCallback);
      })
      .catch(error => {
        const { message } = error;
        if (error.response) {
          const errors = get(error, 'response.data.errors', []);
          if (errors.length > 0) {
            return onRequestFailure(errors.shift(), failureCallback);
          }
        }
        return onRequestFailure({ message }, failureCallback);
      });
  }, []);

  const onRequestSuccess = useCallback((data, callback) => {
    dispatch({
      type: 'success',
      data,
    });
    if (isFunction(callback)) {
      callback(data);
    }
    return data;
  }, []);

  const onRequestFailure = useCallback((data, callback) => {
    const error = new Error(data.message);
    dispatch({
      type: 'failure',
      error,
    });
    if (isFunction(callback)) {
      callback(error);
    }
  }, []);

  return [state, request];
};

export default useGraphQL;

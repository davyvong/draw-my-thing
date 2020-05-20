import useGraphQL from 'hooks/useGraphQL';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import { initialState } from './constants';
import * as queries from './queries';
import reducer from './reducer';

const ProfileContext = React.createContext({});

export const ProfileConsumer = ProfileContext.Consumer;

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [, request] = useGraphQL();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch({ type: 'rehydrate' });
    } else {
      signInAnonymously();
    }
  }, []);

  const signInAnonymously = useCallback(() => {
    request(
      {
        data: {
          query: queries.signInAnonymously,
          variables: { input: {} },
        },
      },
      data => {
        dispatch({
          type: 'setToken',
          data: data.signInAnonymously.token,
        });
      },
    );
  }, [state]);

  const update = useCallback(() => {
    request({
      data: {
        query: queries.updateAccount,
        variables: {
          input: {
            displayName: state.displayName,
          },
        },
      },
    });
  }, [state]);

  const value = useMemo(() => ({ dispatch, signInAnonymously, state, update }), [state]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

ProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ProfileContext;

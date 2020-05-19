import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useReducer } from 'react';

import { initialState } from './constants';
import reducer from './reducer';

const ProfileContext = React.createContext({});

export const ProfileConsumer = ProfileContext.Consumer;

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'rehydrate' });
  }, []);

  const value = useMemo(() => [state, dispatch], [state]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

ProfileProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ProfileContext;

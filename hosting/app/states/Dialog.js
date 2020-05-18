import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Prompt } from 'react-router';
import { useHistory } from 'react-router-dom';

const DialogContext = React.createContext({});

export const DialogConsumer = DialogContext.Consumer;

const initialState = {
  blockRoute: false,
  disableBackdrop: false,
  message: null,
  open: false,
  primaryCallback: null,
  primaryText: '',
  secondaryCallback: null,
  secondaryText: '',
  title: null,
};

export const DialogProvider = ({ children }) => {
  const [state, dispatch] = useState(initialState);
  const history = useHistory();
  const [nextPath, setNextPath] = useState(null);

  const resetState = useCallback(() => {
    dispatch(initialState);
  }, []);

  const setState = useCallback((updates = {}) => {
    dispatch({ ...initialState, ...updates });
  }, []);

  const updateState = useCallback(
    (updates = {}) => {
      dispatch(prevState => ({ ...prevState, ...updates }));
    },
    [state],
  );

  useEffect(() => {
    if (nextPath) {
      history.push(nextPath);
      state.resetState();
      setNextPath(null);
    }
  }, [history, nextPath, state]);

  const onRouteChange = useCallback(
    location => {
      if (!nextPath && state.blockRoute) {
        updateState({
          open: true,
          primaryCallback: () => {
            if (isFunction(state.primaryCallback)) {
              state.primaryCallback();
            }
            if (location.pathname) {
              setNextPath(location.pathname);
            }
          },
        });
        return false;
      }
      return true;
    },
    [nextPath, state],
  );

  const value = { ...state, resetState, setState, updateState };

  return (
    <React.Fragment>
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
      <Prompt when message={onRouteChange} />
    </React.Fragment>
  );
};

DialogProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default DialogContext;

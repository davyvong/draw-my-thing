import ErrorBoundary from 'containers/ErrorBoundary';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeRoute from 'routes/Home/Loadable';
import NotFoundRoute from 'routes/NotFound/Loadable';
import RoomRoute from 'routes/Room/Loadable';
import GlobalStyle from 'styles/GlobalStyle';

const App = () => (
  <ErrorBoundary>
    <Switch>
      <Route component={HomeRoute} exact path="/" />
      <Route component={RoomRoute} path="/room/:roomId" />
      <Route component={NotFoundRoute} />
    </Switch>
    <GlobalStyle />
  </ErrorBoundary>
);

export default App;

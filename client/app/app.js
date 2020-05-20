import App from 'containers/App';
import OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { LayoutProvider } from 'states/Layout';
import { ProfileProvider } from 'states/Profile';

import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <HelmetProvider>
      <BrowserRouter>
        <LayoutProvider>
          <ProfileProvider>
            <App />
          </ProfileProvider>
        </LayoutProvider>
      </BrowserRouter>
    </HelmetProvider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install();
}

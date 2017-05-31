import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

const root = document.getElementById('app-container');

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>
    , root,
  );
};

renderApp();

// Hot module reloading
if (module.hot) {
  module.hot.accept('./components/App', renderApp);
}

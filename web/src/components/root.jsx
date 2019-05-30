import React from 'react';
import { createHashHistory } from 'history';

import 'fluent-intl-polyfill/compat';

import '../../css/root.css';
import Store from './store';
import App from '../containers/app';
import AppLocalizationProvider from '../containers/AppLocalizationProvider';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.history = createHashHistory();
  }

  componentDidCatch(error, info) {
    console.error('Root component error', error, info);
  }

  render() {
    return (
      <Store history={this.history}>
        <AppLocalizationProvider userLocales={navigator.languages}>
          <App history={this.history} />
        </AppLocalizationProvider>
      </Store>
    );
  }
}

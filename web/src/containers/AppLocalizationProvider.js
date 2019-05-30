/* eslint-disable-next-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint-disable-next-line */
import { LocalizationProvider } from 'fluent-react/compat';

import { changeLocales } from '../actions/language';

class AppLocalizationProvider extends Component {
  async componentDidMount() {
    await this.props.changeLocales(navigator.languages);
  }

  componentDidCatch(error, info) {
    console.error('AppLocaliuationProvider component error', error, info);
  }

  render() {
    const { bundles, children } = this.props;
    if (!Object.keys(bundles).length) {
      return <div>…</div>;
    }

    return (
      <LocalizationProvider bundles={bundles}>
        {children}
      </LocalizationProvider>
    );
  }
}

const mapStateToProps = state => {
  return ({ bundles: state.language.bundles });
};
const mapDispatchToProps = { changeLocales };

export default connect(mapStateToProps, mapDispatchToProps)(
  AppLocalizationProvider
);

import React, { Component } from 'react';
import { Stitch } from 'mongodb-stitch-browser-sdk';

export default function (WrappedComponent) {
  class RequireAuth extends Component {
    constructor(props) {
      super(props);
      this.state = { isLoggedIn: false };
    }

    componentDidMount() {
      const { isLoggedIn } = Stitch.defaultAppClient.auth;
      console.log('||||| isLoggedIn |||||', isLoggedIn);
      const { history } = this.props;
      if (!isLoggedIn) {
        history.push('/login');
      }
      this.setState({ isLoggedIn });
    }

    render() {
      const { isLoggedIn } = this.state;
      if (!isLoggedIn) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return RequireAuth;
}

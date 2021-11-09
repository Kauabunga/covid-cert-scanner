import React from "react";

import Error from "./Error";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { children } = this.props;
    const { hasError, error } = this.state;
    if (hasError) {
      return <Error error={error} />;
    }

    return children;
  }
}

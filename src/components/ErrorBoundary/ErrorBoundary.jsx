import React, { Component } from "react";
import ErrorDialog from "../ErrorDialog";

class ErrorBoundary extends Component {
  state = {
    isError: false
  };

  static getDerivedStateFromError(error) {
    return { isError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error", errorInfo)
  }

  render() {
    return this.state.isError ? <ErrorDialog/> : this.props.children;
  }
}

export default ErrorBoundary;

import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }
  
  componentDidCatch(error, errorInfo) {
    // Update state so the next render will show the fallback UI.
    this.setState({ 
      hasError: true,
      error,
      errorInfo
     });
  }

  render() {
    if (this.state.hasError) {
      // Error path
      return (
        <div className="container mx-auto p-6 sm:pt-0 sm:pb-24 lg:px-32">
          <div className="sm:pt-12">
            <div className="sm:block md:flex sm:mt-32 pb-5">
              <div className="md:w-3/5">
                <h2 className="text-mb-title sm:text-title pb-4">
                  Uh oh... something went terribly wrong!
                </h2>
                <h4 className="text-mb-subtitle sm:text-subtitle">
                  But don't worry, we're on it!
                </h4>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  } 
}

export default ErrorBoundary;

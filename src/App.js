import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Header from "Common/Header";
import Footer from "Common/Footer";
import Spinner from "Common/Spinner";

import ErrorBoundary from "Common/ErrorBoundary";
import MainRoutes from "./routes/MainRoutes";

import { setAuthentionStatus } from "Actions/authActions";

import customStyles from "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount = async () => {
    setInterval(() => sessionStorage.removeItem('userToken'), 3600000); // Temporary for 1 hour
    if (sessionStorage.userToken) {
      await store.dispatch(setAuthentionStatus(true));
    } else {
      await store.dispatch(setAuthentionStatus(false));
    }
    await this.setState({ loading: false });
  }

  render() {
    let content;

    if (this.state.loading) {
      content = <Spinner />;
    } else {
      content = (
        <ErrorBoundary>
          <MainRoutes />
        </ErrorBoundary>
      );
    }

    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header styles={customStyles} />
              {content}
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

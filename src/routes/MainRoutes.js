import React, { Component, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import Spinner from "Common/Spinner";

import PrivateRoute from "./PrivateRoute";
import InitialRoute from "./InitialRoute";

const SignIn = lazy(() => import("Pages/SignIn"));
const Dashboard = lazy(() => import("Pages/Dashboard"));
const Agency = lazy(() => import("Pages/Agency"));
const Region = lazy(() => import("Pages/Region"));
const Branch = lazy(() => import("Pages/Branch"));
const Producer = lazy(() => import("Pages/Producer"));
const NotFound = lazy(() => import("Components/common/NotFound"));
const ReferralGenerate = lazy(() => import("Pages/ReferralGenerate"));


class MainRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <InitialRoute exact path="/" component={SignIn} />

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/agency/:mode/:id?" component={Agency} />
          <PrivateRoute exact path="/region/:mode/:agencyId?/:id?" component={Region} />
          <PrivateRoute exact path="/branch/:mode/:agencyId?/:regionId?/:id?" component={Branch} />
          <PrivateRoute exact path="/producer/:mode/:agencyId?/:regionId?/:branchId?/:id?" component={Producer} />
          <PrivateRoute exact path="/referralgenerator" component={ReferralGenerate} />

          <PrivateRoute component={NotFound} />
        </Switch>
      </Suspense>
    );
  }
}

export default MainRoutes;
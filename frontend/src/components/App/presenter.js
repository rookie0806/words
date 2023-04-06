import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router";
import "./styles.module.scss";
import Main from "../Main";
import Detail from "../Detail";
import Upload from "../Upload";
import { connect } from "react-redux";
const App = props => [
  <PublicRoutes key={2} />,
];

const PublicRoutes = props => (
  <Switch>
      <Route path="/upload" component={Upload}/>
      <Route path="/test/:testid" component={Upload}/>
      <Route path="/" component={Upload}/>
  </Switch>
);

App.propTypes = {

};


export default withRouter(connect()(App))
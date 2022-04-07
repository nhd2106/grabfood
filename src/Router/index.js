import React, { Component } from "react";
import { Route } from "react-router-dom";
import Menu from "../Components/Menu";
import FoodOrder from "../Components/FoodOrder";
import Header from './../Components/Header';

export default class index extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/order" component={FoodOrder} />
        <Route
          exact
          path="/"
          component={() => (
            <Menu
              data_Title={this.props.data_Title}
              data_Menu={this.props.data_Menu}
            />
          )}
        />
      </div>
    );
  }
}

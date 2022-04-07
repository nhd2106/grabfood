import React, { Component } from "react";
import Header from "../Header";
import ListFoodOrder from "./ListFoodOrder";

class index extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <ListFoodOrder />
          </div>
        </div>
      </div>
    );
  }
}

export default index;

import React, { Component } from "react";
import ListFoodOrder from "./ListFoodOrder";

class index extends Component {
  render() {
    return (
      <div>
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

import React, { Component } from "react";
import firebase from 'firebase';
import ItemMenu from './ItemMenu';

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lock: true,
    }
  }

  componentWillMount() {
    const lock = firebase.database().ref(`node1/Lock`)
    lock.on("value", (item_lock) => {
      const lock = item_lock.val().Lock;
      this.setState({ lock: lock });
    })
  }


  handlePrintDataMenu = (title) => {

    var arr = this.props.data_Menu;
    arr = arr.filter(item => item.title == title)
    return arr.map(value => {
      return (
        <ItemMenu
          id={value.id}
          product_name={value.nameFood}
          product_price={value.price}
          image={value.img}
          lock={this.state.lock}
        >
        </ItemMenu>
      )
    });
  }

  renderFullMenu = () => {
    return this.props.data_Title.map(value => {
      return (
        <div className="container">
          <p className="h1 mt-5 mb-5">{value.name_title}</p>
          <div className="row">
            {this.handlePrintDataMenu(value.id)}
          </div>
        </div>
      )
    })


  };

  render() {
    return <div disabled>
      {this.renderFullMenu()}
    </div>;
  }
}

export default index;

import "./App.css";
import { FirebaseConnect } from "./Components/FirebaseConnect";
import React, { Component } from "react";
import { BrowserRouter as RouterDom } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import ModalPhone from "./Components/ComponentsCustom/ModalPhone";
import Router from "./Router";
import firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFirebase: [],
      isEdit: true,
      data_sum: [],
      h2: [],
      name: "",
      hide_modal: true,
    };
  }

  componentWillMount() {
    
    if (localStorage.getItem("User") != null) {
      this.setState({ hide_modal: false });
    }

    const menu_Item = firebase.database().ref("node1/menu/");
    menu_Item.on("value", (items) => {
      var arrData = [];
      items.forEach((element) => {
        element.forEach((food) => {
          const key = food.val().id;
          const description = food.val().description;
          const nameFood = food.val().nameFood;
          const img = food.val().img;
          const title = food.val().title;
          const price = food.val().price;
          arrData.push({
            id: key,
            nameFood: nameFood,
            description: description,
            img: img,
            title: title,
            price: price,
          });
        });
      });
      this.setState({
        dataFirebase: arrData,
      });

      FirebaseConnect.on("value", (items) => {
        var arrData = [];
        items.forEach((element) => {
          const key = element.val().id;
          const name_title = element.val().name_title;

          arrData.push({
            id: key,
            name_title: name_title,
          });
        });
        this.setState({
          h2: arrData,
        });
      });
    });
  

    
    const IdCart = localStorage.getItem("ID");

    console.log( JSON.parse(IdCart));

    var arrData = [];

    JSON.parse(IdCart).map((value) => {
    const Call = firebase.database().ref(`Call/${value.id}`);
    Call.on("value", (notes) => {
    console.log(notes.val().id);

      
        var arrOption = [];
        const key = notes.key;
        const id = notes.val().id;
        const nameFood = notes.val().nameFood;
        const Option = notes.val().Option;
        const number = notes.val().number;
        const people = notes.val().people;

        const value_option = firebase.database().ref(`node1/check/${id}`);
        value_option.on("value", (notes1) => {
          var sum = 0;
          notes1.forEach((element1) => {
            element1.val().Value?.forEach((option) => {
              if (Option.filter((op) => op === option.name_value).length > 0) {
                Option.map((op) => {
                  if (op === option.name_value) {
                    const num = Number(option?.price) || 0;
                    sum = num + sum;
                    arrOption.push(option);
                  }
                });
              }
            });
          });
          // console.log(sum);
          arrData.push({
            key: key,
            id: id,
            nameFood: nameFood,
            Option: arrOption,
            number: number,
            sum_price_option: sum,
            people: people,
          });
        });

          //  arrData.push({
          //   key: key,
          //   id: id,
          //   nameFood: nameFood,
          //   number: number,
          //   people: people,
          // });
    });
  })

  console.log(arrData);

  }

  UpdateState = (type, value) => {
    if (value.length > 0) {
      this.setState({ hide_modal: false });
      localStorage.setItem("User", JSON.stringify(value));
      return NotificationManager.success(
        "Nhập tên của bạn thành công.",
        "Thành công",
        3000
      );
    } else {
      return NotificationManager.error(
        "Vui lòng nhập tên của bạn !",
        "Nhập tên",
        3000
      );
    }
  };

  render() {
    return (
      <div id="tm-gallery-page-pizza" className="tm-gallery-page">

      <article className="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item">
        <figure>
          <img src="img/gallery/01.jpg" alt="Image" className="img-fluid tm-gallery-img" />
          <figcaption>
            <h4 className="tm-gallery-title">Fusce dictum finibus</h4>
            <p className="tm-gallery-description">Nam in suscipit nisi, sit amet consectetur metus. Ut sit amet tellus accumsan</p>
            <div className="row">
             <div>$45 / $55<button className="float-right">+</button></div> 
            </div>
          </figcaption>
        </figure>
      </article>
    </div>

      // <div>
      //   <ModalPhone
      //     type={"Name"}
      //     isShow={this.state.hide_modal}
      //     handleSave={(type, value) => this.UpdateState(type, value)}
      //   />
      //   <NotificationContainer />
      //   <RouterDom>
      //     <Router
      //       data_Title={this.state.h2}
      //       data_Menu={this.state.dataFirebase}
      //     />
      //   </RouterDom>
      // </div>
    );
  }
}
export default App;

import "./App.css";
import { FirebaseConnect } from "./Components/FirebaseConnect";
import React, { Component } from "react";
import { BrowserRouter as RouterDom } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import ModalPhone from "./Components/ComponentsCustom/ModalPhone";
import ModalInsert from "./Components/ComponentsCustom/ModalInsert";
import { uid } from 'uid';
import Router from "./Router";
import firebase from "firebase";
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableRow } from "@mui/material";
import Cart from './Components/Cart'
import Header from './Components/Header';
import { connect } from "react-redux";
import _ from 'lodash'

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
      showCart : false,
      dataCart : [],
      badgeContent : 0,
      showInsertFood : false,
      abc : 0,
      lock: false,
    };
  }

  handleSumPrice = (number, price) => {
    const numberFormat = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      const sum = numberFormat.format((number * price) * 1000).replace("₫", "");
      return sum;
  }

  UNSAFE_componentWillMount() {
    
    this.props.dispatch1();

    const lock = FirebaseConnect().ref(`id_unit1/`).child(`node1/Lock`)
    lock.on("value", (item_lock) => {
      const lock = item_lock.val()?.Lock;
      this.setState({ lock: lock });
    })

    if (localStorage.getItem("User") != null) {
      this.setState({ hide_modal: false });
    }
  }

  UpdateState = (type, value) => {
    if (value.length > 0) {
      this.setState({ hide_modal: false });
      localStorage.setItem("User", value);
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
  

  handleChangeShowCart = () => {
    this.setState({
      showCart : !this.state.showCart
    })
    
  }

 

  handleInserData = (data, next) => {
  
    if(next != true)
    {
      this.setState({
        showInsertFood : !this.state.showInsertFood
      })
    }
  }

  // dataLocalIDCart = () => {

  //   var arrData = [];
  //   _.map((this.props.dataIdLocal), (value) => {
  //   const Call = firebase.database().ref(`Call/${value.id}`);
  //   Call.on("value", (notes) => {
  //     if(notes.val() == null)
  //     {
  //       this.props.deleteIDLocal(value.id);
  //       return;
  //     }
  //       var arrOption = [];
  //       const key = notes?.key;
  //       const id = notes.val()?.id;
  //       const nameFood = notes.val()?.nameFood;
  //       const Option = notes.val()?.Option;
  //       const number = notes.val()?.number;
  //       const foodLock = notes.val()?.Lock;

  //       const value_option = firebase.database().ref(`node1/check/${id}`);
  //       value_option.on("value", (item) => {
  //         var sum = 0;
  //         item.forEach((element) => {
  //           element.val().Value?.forEach((option) => {
  //             if (Option.filter((op) => op === option.name_value).length > 0) {
  //               Option.map((op) => {
  //                 if (op === option.name_value) {
  //                   const num = Number(option?.price) || 0;
  //                   sum = num + sum;
  //                   arrOption.push(option);
  //                 }
  //               });
  //             }
  //           });
  //         });
          
  //         const fullFood = this.state.dataFirebase.filter(value => value.id == id)
  //         sum += Number(fullFood[0]?.price) || 0;
  //         arrData.push({
  //           key: key,
  //           id: id,
  //           nameFood: nameFood,
  //           Option: arrOption,
  //           number: number,
  //           sum: sum,
  //           img: fullFood[0]?.img,
  //           foodLock : foodLock,
  //         });
  //       });
  //     });
  //   })
  //     // this.setState({dataCart : arrData})
      
  //     return arrData;

  // }

  dataLocalIDCart = () => {
    var arrData = [];
    _.map((this.props.dataIdLocal), (value, key) => {
      arrData.push({
        key: key,
        id: value?.id,
        nameFood: value?.nameFood,
        Option: value?.Option,
        number: value?.number,
        sum: value?.sum,
        img: value?.img,
        foodLock : value?.foodLock,
      });
    })
    return arrData;
  }


  render() {

    //  {this.testprop()}
    return (
    <div className="container">
    {/* <Shop/> */}
    {/* <button onClick = {() => this.props.deleteIDLocal()}>Click insert</button> */}
      
      {/* <ModalLogin isShow = {true} /> */}
      <ModalInsert 
      handleShowInsert = {() => this.handleShowInsert()}
      showInsertFood = {this.state.showInsertFood}
      handleInserData = {(data, next) => {this.handleInserData(data, next)}}
      type = "Add"
       />
      {/* {console.log(this.state.dataCart)} */}
      <Cart lock = {!this.state.lock && this.props.btnClock } 
      data = {this.props.dataIdLocal} 
      isShow = {this.state.showCart} handleShow = {() => {this.handleChangeShowCart()}}></Cart>






     {/* <div className="placeholder">
      <div className="parallax-window"><img src="img/simple-house-01.png" style={{ width:"1px" , height: "500px" }}/> 
        <div className="tm-header">
          <div className="row tm-header-inner">
            <div className="col-md-6 col-12">
              <img src="img/logo-H2TEA.png" alt="Logo" className="tm-site-logo" /> 
              <div className="tm-site-text-box">
                <h1 className="tm-site-title">H2 TAE</h1>
                <h6 className="tm-site-description">new restaurant template</h6>	
              </div>
            </div>
          </div>
        </div>
        </div>
      </div> */}
<div>
<ModalPhone
  type={"Name"}
  isShow={this.state.hide_modal}
  handleSave={(type, value) => this.UpdateState(type, value)
  }
/>
<NotificationContainer />
<Header badgeContent = {this.props.dataIdLocal.length || 0} clickAddFood = {() => this.handleShowInsert()}  clickCart = {() => this.handleChangeShowCart()} />
<RouterDom>
  <Router
    // data_Title={this.state.h2}
    // data_Menu={this.state.dataFirebase}
  />
</RouterDom>
</div>

{/* <footer className="tm-footer text-center">
			<p>Copyright &copy; 2021 Simple H2-Tea </p>
		</footer> */}


        {/* <div id="tm-gallery-page-pizza" className="tm-gallery-page">
      <article className="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item">
        <figure>
          <img src="img/gallery/01.jpg" alt="Image" className="img-fluid tm-gallery-img" />
          <figcaption>
            <h4 className="tm-gallery-title">Fusce dictum finibus czx c c z c zc  xzc  zxc xz c z xc zx c zx c zx c zx cxxxxz xc zx c zxc z xc zx c</h4>
            <p className="tm-gallery-description">Nam in suscipit nisi, sit amet consectetur metus. Ut sit amet tellus accumsan</p>
            <div className="row">
             <div>$45 / $55<button className="float-right">+</button></div> 
            </div>
          </figcaption>
        </figure>
      </article>
    </div> */}
</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataIdLocal: state.dataIdLocal,
    btnClock : state.btnClock
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch1: () => {
      dispatch({
        type:'GET_ID_LOCAL',
      })
    },

    deleteIDLocal: (id) => {
      dispatch({
        type: 'DELETE_ID_LOCAL',
        value : id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default App;

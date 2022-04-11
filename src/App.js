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


const menu_Item = firebase.database().ref("node1/menu/");
const lock = firebase.database().ref(`node1/`);

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

  componentWillMount() {
    
    this.props.dispatch1();

    const lock = firebase.database().ref(`node1/Lock`)
    lock.on("value", (item_lock) => {
      const lock = item_lock.val().Lock;
      this.setState({ lock: lock });
    })

    if (localStorage.getItem("User") != null) {
      this.setState({ hide_modal: false });
    }


    menu_Item.on("value", (items) => {
      var arrData = [];
      console.log(items.val())
      items.forEach((element) => {
        element.forEach((food) => {
          const id = food.val().id;
          const description = food.val().description;
          const nameFood = food.val().nameFood;
          const img = food.val().img;
          const title = food.val().title;
          const price = food.val().price;
          arrData.push({
            id: id,
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
  

    
    // const IdCart = localStorage.getItem("ID");
    // // let IdCartNew = [];
    // if(IdCart != null)
    // {
    // let DataID = []
    // try
    //   {
    //     DataID  =  JSON.parse(IdCart);
    //   }catch{
    //     localStorage.setItem("ID",[]);
    //   }
      
    // var arrData = [];
    // // DataID?.map((value) => {
    // _.map((this.props.dataIdLocal), (value) => {
      
    // console.log(value);
    // const Call = firebase.database().ref(`Call/${value.id}`);
    // Call.on("value", (notes) => {
    // // console.log(notes.val().id);
    //   // if(notes != null)
    //   //   IdCartNew.push({
    //   //     id : value.id
    //   //   });
    //     var arrOption = [];
    //     const key = notes.key;
    //     const id = notes.val().id;
    //     const nameFood = notes.val().nameFood;
    //     const Option = notes.val().Option;
    //     const number = notes.val().number;
    //     const foodLock = notes.val().Lock;

    //     const value_option = firebase.database().ref(`node1/check/${id}`);
    //     value_option.on("value", (notes1) => {
    //       var sum = 0;
    //       notes1.forEach((element1) => {
    //         element1.val().Value?.forEach((option) => {
    //           if (Option.filter((op) => op === option.name_value).length > 0) {
    //             Option.map((op) => {
    //               if (op === option.name_value) {
    //                 const num = Number(option?.price) || 0;
    //                 sum = num + sum;
    //                 arrOption.push(option);
    //               }
    //             });
    //           }
    //         });
    //       });
          
    //       const fullFood = this.state.dataFirebase.filter(value => value.id == id)
    //       // console.log(fullFood[0]);
    //       sum += Number(fullFood[0]?.price) || 0;
    //       arrData.push({
    //         key: key,
    //         id: id,
    //         nameFood: nameFood,
    //         Option: arrOption,
    //         number: number,
    //         sum: sum,
    //         // people: people,
    //         img: fullFood[0]?.img,
    //         foodLock : foodLock,
    //       });
    //     });
    //   });
    //   // localStorage.setItem("ID", JSON.stringify(IdCartNew));
    //   // console.log(IdCartNew);
    // })
      
    //   // console.log(IdCartNew);
    //   this.setState({
    //     dataCart : arrData,
    //     // badgeContent : DataID.length
    //   })
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
  

  handleChangeShowCart = () => {
    this.setState({
      showCart : !this.state.showCart
    })
    
  }

  handleShowInsert = () => {
    this.setState({
      showInsertFood : !this.state.showInsertFood
    })
  }

  handleInserData = (data, next) => {
  //   menu_Item.child('thuc-don-xbot').push({
  //     nameFood : data.name,
  //     title: "thuc-don-xbot",
  //     id : uid(16),
  //     img : data.img,
  //     description : '',
  //     price: data.price
  // })
  
    if(next != true)
    {
      this.setState({
        showInsertFood : !this.state.showInsertFood
      })
    }
  }

  testprop = () => {
    // console.log(this.props.dataIdLocal)
    // _.map( (this.props.dataIdLocal), (value) => console.log(value) )
    
    // this.setState({abc : this.props.dataIdLocal.length})
    // {_.map((this.props.dataIdLocal), (value) => {console.log(value);})}
    // const x = this.props.dataIdLocal.length;
    // console.log(x);
    var arrData = [];
    _.map((this.props.dataIdLocal), (value) => {
    console.log(value);
    const Call = firebase.database().ref(`Call/${value.id}`);
    Call.on("value", (notes) => {
    // console.log(notes.val().id);
      // if(notes != null)
      //   IdCartNew.push({
      //     id : value.id
      //   });
        var arrOption = [];
        const key = notes.key;
        const id = notes.val().id;
        const nameFood = notes.val().nameFood;
        const Option = notes.val().Option;
        const number = notes.val().number;
        const foodLock = notes.val().Lock;

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
          
          const fullFood = this.state.dataFirebase.filter(value => value.id == id)
          // console.log(fullFood[0]);
          sum += Number(fullFood[0]?.price) || 0;
          arrData.push({
            key: key,
            id: id,
            nameFood: nameFood,
            Option: arrOption,
            number: number,
            sum: sum,
            // people: people,
            img: fullFood[0]?.img,
            foodLock : foodLock,
          });
        });
      });
      // localStorage.setItem("ID", JSON.stringify(IdCartNew));
      // console.log(IdCartNew);
    })
      
      // console.log(IdCartNew);
      // this.setState({
      //   dataCart : arrData,
      //   // badgeContent : DataID.length
      // })

      console.log(arrData);
      return arrData;

  }

  render() {

    //  {this.testprop()}
    return (
      
    <div className="container">
    {/* <button onClick = {() => this.testprop()}>Click insert</button> */}
      <ModalInsert 
      handleShowInsert = {() => this.handleShowInsert()}
      showInsertFood = {this.state.showInsertFood}
      handleInserData = {(data, next) => {this.handleInserData(data, next)}}
      type = "Add"
       />
      {console.log(this.state.dataCart)}
      <Cart lock = {this.state.lock} data = {this.testprop()} isShow = {this.state.showCart} handleShow = {() => {this.handleChangeShowCart()}}></Cart>






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
    data_Title={this.state.h2}
    data_Menu={this.state.dataFirebase}
  />
</RouterDom>
</div>

{/* <footer className="tm-footer text-center">
			<p>Copyright &copy; 2021 Simple H2-Tea </p>
		</footer> */}
</div>

    //   <div id="tm-gallery-page-pizza" className="tm-gallery-page">
    //   <article className="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item">
    //     <figure>
    //       <img src="img/gallery/01.jpg" alt="Image" className="img-fluid tm-gallery-img" />
    //       <figcaption>
    //         <h4 className="tm-gallery-title">Fusce dictum finibus</h4>
    //         <p className="tm-gallery-description">Nam in suscipit nisi, sit amet consectetur metus. Ut sit amet tellus accumsan</p>
    //         <div className="row">
    //          <div>$45 / $55<button className="float-right">+</button></div> 
    //         </div>
    //       </figcaption>
    //     </figure>
    //   </article>
    // </div>

     
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataIdLocal: state.dataIdLocal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch1: () => {
      dispatch({
        type:'GET_ID_LOCAL',
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// export default App;

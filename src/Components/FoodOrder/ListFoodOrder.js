import React, { Component } from "react";
import firebase from "firebase";
import ItemFoodOrder from "./ItemFoodOrder";
import axios from "axios";
import ModalCustom from "../ComponentsCustom/ModalCustom";
import ModalPhone from "../ComponentsCustom/ModalPhone";
import CircularProgressWithLabel from "../ComponentsCustom/CircularProgressWithLabel";

const menu_Item = firebase.database().ref("node1/menu/");
const Call = firebase.database().ref("Call/");
const lock = firebase.database().ref(`node1/`);
const SDT = firebase.database().ref(`SDT`);
const Handle = firebase.database().ref(`Handle`);

class ListFoodOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataMenu: [],
      dataFirebase: [],
      sum_number: 0,
      arr_Tinhtien: [],
      sum_Tien: 0,
      lock: false,
      isShowGetData: false,
      new_sdt: false,
      SDT: 0,
      new_sms: false,
      SMS: 0,
      Handle: false,
      Load: 0,
      Title: "",
    };
  }

  componentWillMount() {
    menu_Item.on("value", (notes) => {
      var arr = [];
      notes.forEach((element) => {
        element.forEach((food) => {
          const key = food.val().id;
          const description = food.val().description;
          const nameFood = food.val().nameFood;
          const img = food.val().img;
          const title = food.val().title;
          const price = food.val().price;
          arr.push({
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
        dataMenu: arr,
      });
    });

    Call.on("value", (notes) => {
      this.setState({ arr_Tinhtien: [], sum_Tien: 0 });
      var arrData = [];
      notes.forEach((element) => {
        var arrOption = [];
        const key = element.key;
        const Request = element.val().Request;
        const id = element.val().id;
        const nameFood = element.val().nameFood;
        const Option = element.val().Option;
        const number = element.val().number;
        const people = element.val().people;
        const foodLock = element.val().Lock;
        const show = element.val().show;

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
          console.log(sum);
          arrData.push({
            key: key,
            id: id,
            nameFood: nameFood,
            Option: arrOption,
            number: number,
            sum_price_option: sum,
            people: people,
            foodLock : foodLock,
            Request : Request,
            show : show,
          });
          console.log(arrData);
          this.setState({
            dataFirebase: arrData,
          });
        });
      });
    });

    SDT.on("value", (item_SDT) => {
      const update_SDT = item_SDT.val().SDT.New;
      console.log(update_SDT);
      if (update_SDT == 1) this.setState({ new_sdt: false });
      else this.setState({ new_sdt: true });

      const update_SMS = item_SDT.val().SMS.New;
      console.log(update_SMS);
      if (update_SMS == 1) this.setState({ new_sms: false });
      else this.setState({ new_sms: true });

      const update_URL = item_SDT.val().URL.New;
      console.log(update_SMS);
      if (update_URL == 1) this.setState({ isShowGetData: false });
      else this.setState({ isShowGetData: true });
    });

    Handle.on("value", (item) => {
      const item_handle = item.val().Loading.Handle;
      const item_Load = item.val().Loading.Load;
      const item_Title = item.val().Loading.Title;
      this.setState({
        Handle: item_handle,
        Load: item_Load,
        Title: item_Title,
      });
    });
  }

  handle_TinhTien = () => {

    console.log(this.state.dataFirebase);
    var data = this.state.dataFirebase;

    for (let index = 0; index < data.length; index++) {

      console.log(data[index])

      data[index].people = data[index].people + " X" + data[index].number;

      for (let index1 = index + 1; index1 < data.length; index1++) {
        if (
          data[index].id === data[index1].id &&
          data[index1].Option.length === data[index].Option.length
        ) {
          var dem = 0;
          data[index].Option.map((vl_op) => {
            var count = data[index1].Option.filter(
              (vl_ft) => vl_ft.name_value === vl_op.name_value
            ).length;
            if (count > 0) dem++;
          });

          if (dem == data[index].Option.length) {
            data[index].number += data[index1].number;
            data[index].people +=
              " ," + data[index1].people + " X" + data[index1].number;
            data.splice(index1, 1);
            index1--;
          }
        }
      }
    }
    this.setState({ dataFirebase: data });

    var num_sum = 0;
    this.state.arr_Tinhtien.forEach((number) => {
      num_sum += number;
    });
    const numberFormat = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    num_sum = numberFormat.format(num_sum * 1000).replace("₫", "VND");
    this.setState({ sum_Tien: num_sum, lock: true });
    console.log(this.state.arr_Tinhtien);
  
    lock.child("Lock").update({
      Lock: true,
    });
  };

  getData = () => {
    if (this.state.dataFirebase) {
      return this.state.dataFirebase.map((value, key) => {
        var arr = this.state.dataMenu.filter(
          (value_ft) => value_ft.id == value.id
        );
        console.log(value);
        return (
        (value.show) ?
          <ItemFoodOrder
            id_key={value.key}
            id={value.id}
            index={key}
            nameFood={arr[0]?.nameFood || ''}
            Option={value.Option}
            number={value.number}
            price={arr[0]?.price || ''}
            sum_price_option={value.sum_price_option}
            people={value.people}
            Tinhtien={this.state.arr_Tinhtien}
            foodLock = {value.foodLock}
            Request = {value.Request}
            // show = {value.show}
          />
          : <div/>
        );
      });
    }
  };

  handle_unlock = () => {
    lock.child("Lock").update({
      Lock: false,
    });
    window.location.reload();
  };

  UpdateSMS = (type, value) => {
    if (type === "SMS")
      SDT.child("SMS").update({
        SMS: value,
        New: 1,
      });
    if (type === "Phone")
      SDT.child("SDT").update({
        SDT: value,
        New: 1,
      });
  };

  handleGetData = (data) => {
    SDT.child("URL").update({
      URL: data,
      New: 1,
    });

    axios.get("http://serverlth.ddns.net:1235/Khoitao");
  };

  handleClickGetData = () => {
    SDT.child("URL").update({
      New: 0,
    });
  };

  handleClickCloseGetData = () => {
    SDT.child("URL").update({
      New: 1,
    });
  };

  render() {
    return (
      <div className="col">
        <CircularProgressWithLabel
          isShow={this.state.Handle}
          value={this.state.Load}
          title={this.state.Title}
        />
        <ModalPhone
          type={"SMS"}
          isShow={this.state.new_sms}
          handleSave={(type, value) => this.UpdateSMS(type, value)}
        />
        <ModalPhone
          type={"Phone"}
          isShow={this.state.new_sdt}
          handleSave={(type, value) => this.UpdateSMS(type, value)}
        />
        <ModalCustom
          isShow={this.state.isShowGetData}
          handleClose={() => {
            this.handleClickCloseGetData();
          }}
          handleSave={(data) => this.handleGetData(data)}
        />

        <div id="noteList" role="tablist" aria-multiselectable="true">
          <div className="card">
            <div className="card-header" role="tab" id="note1">
              <h5 className="mb-0">
                <a className="float-left">Tổng cộng: {this.state.sum_Tien}</a>
                <a className="float-right">
                  <button 
                    onClick={() => this.handleClickGetData()}
                    className="btn btn-primary float-right ml-1"
                  >
                    Lấy dữ liệu
                  </button>
                  <button
                    onClick={() => this.handle_unlock()}
                    className="btn btn-warning float-right ml-1"
                  >
                    
                    Mở khóa
                  </button>
                  <button
                    disabled={this.state.lock}
                    onClick={() => this.handle_TinhTien()}
                    className="btn btn-success float-right ml-1"
                  >
                    Tổng kết
                  </button>
                </a>
              </h5>
            </div>
          </div>
          {this.getData()}
        </div>
      </div>
    );
  }
}

export default ListFoodOrder;

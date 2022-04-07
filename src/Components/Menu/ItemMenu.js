import React, { Component } from "react";
import firebase from "firebase";
import Option from "../Option";
import Drawer from "@mui/material/Drawer";
import Modal from "react-bootstrap/Modal";
import { NotificationManager } from "react-notifications";

export default class ItemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_Option: [],
      Option: false,
      ax: [],
      disable_btn: true,
      show_modal: false,
      Value_Check_Option: [""],
      number: 1,
      Name_People: "",
      price_option_check: 0,
    };
  }

  getDataOnClick = () => {
    var data = {};
    data.product_name = this.props.product_name;
    data.product_price = this.props.product_price;
    data.image = this.props.image;
    data.id = this.props.id;
  };

  handleGet_ValueCheck = (value, price) => {
    var arr = this.state.Value_Check_Option.filter(
      (item) => item == value.value
    );
    if (arr.length > 0) {
      console.log("--" + price);
      this.state.price_option_check =
        this.state.price_option_check - Number(price);
      console.log("Đã có");
      let arr = this.state.Value_Check_Option.filter(
        (item) => item != value.value
      );
      console.log(arr);
      this.setState({ Value_Check_Option: arr });
    } else {
      if (value.checked == true) {
        console.log("++" + price);
        this.state.price_option_check =
          this.state.price_option_check + Number(price);
        console.log("Chưa có");
        let arr = this.state.Value_Check_Option;
        arr.push(value.value);
        console.log(arr);
        this.setState({ Value_Check_Option: arr });
      }
    }
  };

  componentWillMount() {
    const data = firebase.database().ref(`node1/check/${this.props.id}/`);
    data.on("value", (notes) => {
      var arrData = [];
      notes.forEach((option) => {
        const Check = option.val().Checkbox;
        const Pick = option.val().Pick;
        const name = option.val().name;
        const Value = option.val().Value;

        if (Value == null) {
          arrData.push({
            Check: Check,
            Pick: Pick,
            name: name,
            Value: [{ hethan: "Đã bán hết!" }],
          });
        } else {
          arrData.push({
            Check: Check,
            Pick: Pick,
            name: name,
            Value: Value,
          });
        }
      });

      this.setState({
        data_Option: arrData,
      });
    });
  }

  check_option = () => {
    this.kiemtra_checked();
    this.setState({
      Option: true,
      show_modal: true,
    });
  };

  add_food = (id, name) => {
    const nodeAdd = firebase.database().ref("Call/");
    nodeAdd.push({
      nameFood: name,
      id: id,
      Option: this.state.Value_Check_Option.filter((value) => value != ""),
      number: Number(this.state.number),
      people: localStorage.getItem("User"),
    }).then((snap) =>{
      const IdCart = localStorage.getItem("ID");
      let DataID = []
      try
      {
        if(IdCart != null)
        DataID = JSON.parse(IdCart);
      }catch{}
      
      DataID.push({
        id : snap.key
      })
      localStorage.setItem("ID",JSON.stringify(DataID))
      return NotificationManager.success(
        "Thêm món thực đơn thành công !",
        "Thêm món",
        3000
      );
    });

    // console.log(key);

    

  };

  handleHide_Option = () => {
    this.kiemtra_checked();
    this.setState({
      show_modal: false,
      // show_modal : true
    });
    this.setState({
      ax: [],
    });
    console.log(this.state.Value_Check_Option);
  };

  handlePrint_Option = () => {
    return this.state.data_Option.map((op, key) => {
      return (
        <Option
          kiemtra_checked={() => this.kiemtra_checked()}
          ax={this.state.ax}
          name={op.name}
          Pick={op.Pick}
          Check={op.Check}
          Value={op.Value}
          Value_Check_Option={this.state.Value_Check_Option}
          handleGet_ValueCheck={(value, price) => {
            this.handleGet_ValueCheck(value, price);
          }}
        />
      );
    });
  };

  handlePrint_Full_Option = () => {
    if (this.state.Option == true) {
      return <div>{this.handlePrint_Option()}</div>;
    }
  };

  kiemtra_checked = () => {
    let number_pick = 0;
    let number_check_pick = 0;

    this.state.data_Option.map((op) => {
      if (op.Pick.lastIndexOf("Pick") >= 0) {
        number_pick++;
      }
      const dem = this.state.ax.filter((item) => item.name == op.name).length;
      if (dem > 0) {
        number_check_pick++;
      }
    });

    if (number_check_pick == number_pick) {
      this.setState({
        disable_btn: false,
      });
    } else {
      this.setState({
        disable_btn: true,
      });
    }
  };

  onChange_inputNumber = (event) => {
    if (event.target.value <= 1) event.target.value = 1;
    this.setState({ number: event.target.value });
  };

  handle_order = () => {
    this.handleHide_Option();
    this.add_food(this.props.id, this.props.product_name);
    
  };

  handle_print_price = () => {
    var numDef = Number(this.props.product_price.replace("VND", ""));

    var gia_option = this.state.price_option_check;

    const numberFormat = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    var numSL = Number(this.state.number);
    return numberFormat
      .format((gia_option + numDef) * numSL * 1000)
      .replace("₫", "VND");
  };
  render() {
    return (
      <div className="col-4 mt-4 ">
        <div className="card">
          <img
            onClick={() => this.getDataOnClick()}
            className="card-img-top"
            height={"300px"}
            src={this.props.image}
          />
          <div className="card-body">
            <div>
              <h4
                onClick={() => this.getDataOnClick()}
                className="row card-title float-left mt-2.5"
              >
                {this.props.product_name}
              </h4>
            </div>
            <br />
            <div>
              <h5
                onClick={() => this.getDataOnClick()}
                className=" row card-text float-right"
              >
                {this.props.product_price}
              </h5>
            </div>
          </div>
          <button
            disabled={this.props.lock}
            onClick={() => this.check_option()}
            type="button"
            class="btn btn-primary"
          >
            Thêm
          </button>
        </div>

        <Modal
          centered
          show={this.state.show_modal}
          onHide={() => this.handleHide_Option()}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.product_name} {this.handle_print_price()}{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.handlePrint_Full_Option()}</Modal.Body>
          <Modal.Footer>
            <label>Số lượng</label>
            <input
              className="with-40"
              onChange={(event) => this.onChange_inputNumber(event)}
              type="number"
              defaultValue="1"
            ></input>
            <button
              disabled={this.state.disable_btn || this.props.lock}
              onClick={() => this.handle_order()}
              type="button"
              class="btn btn-primary"
            >
              Đặt hàng
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

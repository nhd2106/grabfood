import React, { Component } from "react";
import _ from "lodash";
import firebase from "firebase";
import Option from "../Option";
import { connect } from "react-redux";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Button } from "@mui/material";
import { NotificationManager } from 'react-notifications';

const nodeAdd = firebase.database().ref("Call/");


class ItemFoodOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilte: "",
      content: "",
      option_fb: [],
      sum_price_option: 0,
    };
  }

  DeleteData = () => {
    console.log(this.props.id_key);
    nodeAdd.child(this.props.id_key).remove().then(function() {
      NotificationManager.success(
        "Xóa món ăn thành công",
        "Thành công",
        3000
      );
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
      NotificationManager.error(
        error.message,
        "Lỗi",
        3000
      );
    });
  };

  sum = 0;
  handle_show_Option = () => {
    if (this.props.Option.length > 0) {
      this.sum = 0;
      return (
        <div>
          <h4>Lựa chọn:</h4>
          {this.props.Option.map((value) => {
            const num = Number(value?.price) || 0;
            this.sum = num + this.sum;
            if (num == 0) return <li>{value.name_value}</li>;
            else
              return (
                <li>
                  {value.name_value}&emsp;({value.price})
                </li>
              );
          })}
        </div>
      );
    }
  };

  handle_print_price = () => {
    {
      var numDef = Number(this.props.price.replace("VND", ""));
      const numberFormat = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      var giatri = this.props.sum_price_option;
      var numSL = Number(this.props.number);
      var sum = numberFormat
        .format((giatri + numDef) * numSL * 1000)
        .replace("₫", "VND");
      this.props.Tinhtien.push((giatri + numDef) * numSL);

      if (giatri != 0) {
        giatri = numberFormat.format(giatri * 1000).replace("₫", "");
        return `${this.props.number} X (${this.props.price} + ${giatri}) = ${sum}`;
      } else {
        return `${this.props.number} X ${this.props.price}  = ${sum}`;
      }
    }
  };

  handleUnclockFoodOrder = () => {
      console.log(this.props.id_key);
      nodeAdd.child(this.props.id_key).update({
        Lock: false,
        Request : false,
      }).then();
  }

  render() {
    return (
      <div className="card">
        <div className="card-header" role="tab" id="note1">
          <h5 className="mb-0">
            <a
              className="float-left"
              data-toggle="collapse"
              data-parent="#noteList"
              href={"#A" + this.props.index}
              aria-expanded="true"
              aria-controls="noteContent1"
            >
              {(this.props.foodLock) ? <img style = {{maxWidth : 20}} src="img/icon-sc.png"/> : <div></div>}
              {` ${this.props.nameFood} `}
              {/* {(this.props.foodLock) ?  <div>Mở khóa</div> : <div></div>} */}
            </a>
            {(this.props.Request) ?  <Button onClick={() => this.handleUnclockFoodOrder()}> <LockOpenIcon/> Mở khóa</Button> : <div></div>}
            <a
              className="float-right"
              data-toggle="collapse"
              href={"#A" + this.props.index}
            >
              {this.handle_print_price()}
            </a>
          </h5>
        </div>
        <div
          id={"A" + this.props.index}
          className="collapse in"
          role="tabpanel"
          aria-labelledby="note1"
        >
          <div className="card-body">
            <div>{this.handle_show_Option()}</div>
          </div>
          <div className="col float-right mb-1">
            <h4>Số lượng: {this.props.number}</h4>
            <p>{this.props.people}</p>
            <button
              onClick={() => {
                this.DeleteData();
              }}
              type="button"
              className="btn btn-primary float-right"
            >
              Xóa món
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {};

export default connect(mapStateToProps)(ItemFoodOrder);

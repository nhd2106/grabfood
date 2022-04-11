import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import firebase from "firebase";
import { uid } from "uid";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
const menu_Item = firebase.database().ref("node1/");

class modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      price: "",
      name: "",
    };
  }

  componentWillMount() {
    this.setState({
      price: this.props.price,
      name: this.props.nameFood,
    });
  }

  isChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleInserData = async (data) => {
    menu_Item.child("Title/thuc-don-xbot").update({
      id: "thuc-don-xbot",
      name_title: "Thực đơn",
    });

    const uid_id = await uid(16);
    const dataAdd = {
      [uid_id]: {
        nameFood: data.name,
        title: "thuc-don-xbot",
        id: uid_id,
        img: data.img,
        description: "",
        price: data.price,
      },
    };
    menu_Item.child("menu/thuc-don-xbot").update(dataAdd);
  };

  handleEditData = (data, id) => {
    console.log(id);

    const uid_id = id;
    const dataAdd = {
      [uid_id]: {
        nameFood: data.name,
        title: "thuc-don-xbot",
        id: uid_id,
        img: data.img,
        description: "",
        price: data.price,
      },
    };
    menu_Item
      .child("menu/thuc-don-xbot")
      .update(dataAdd)
      .then(() => {
        NotificationManager.success(
          "Cập nhật món ăn thành công",
          "Thành công",
          3000
        );
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message);
        NotificationManager.error(error.message, "Lỗi", 3000);
      });
  };

  is_Save = (next) => {
    if (this.state.name.length < 1)
      return NotificationManager.error("Vui lòng nhập tên món ăn", "Lỗi", 2000);

    if (this.state.price.length < 1)
      return NotificationManager.error("Vui lòng nhập giá món ăn", "Lỗi", 2000);

    console.log(this.props.id);

    const name = this.state.name;
    const price = this.state.price;

    const data = {
      name,
      price,
      img: "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg",
    };
    if (!next) this.props.handleShowInsert();
    if (this.props.id) this.handleEditData(data, this.props.id);
    else {
      this.handleInserData(data);
      this.Clear_state();
    }
  };

  handleClickDelete = () => {
    menu_Item
      .child(`menu/thuc-don-xbot/${this.props.id}`)
      .remove()
      .then(function () {
        NotificationManager.success(
          "Xóa món ăn thành công",
          "Thành công",
          3000
        );
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message);
        NotificationManager.error(error.message, "Lỗi", 3000);
      });
    // nodeAdd.child(this.props.id_key).remove();
    this.props.handleShowInsert();
  };

  Clear_state = () => {
    this.setState({
      id: "",
      price: "",
      name: "",
    });
    return NotificationManager.success(
      "Thêm thực phẩm thành công",
      "Thành công",
      3000
    );
  };

  render() {
    return (
      <div>
        <Modal
          centered
          show={this.props.showInsertFood}
          onHide={() => this.props.handleShowInsert()}
        >
          <Modal.Header closeButton>
            {this.props.type == "Add" ? (
              <Modal.Title>Thêm món ăn</Modal.Title>
            ) : (
              <div />
            )}
            {this.props.type == "Edit" ? (
              <Modal.Title>Chỉnh sửa món ăn</Modal.Title>
            ) : (
              <div />
            )}
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="card border-primary">
                <div className="card-body">
                  <div className="form-group">
                    <label class="text-start">Tên món ăn</label>
                    <input
                      onChange={(value) => this.isChange(value)}
                      type="text"
                      name="name"
                      id=""
                      className="form-control"
                      placeholder=""
                      aria-describedby="helpId"
                      value={this.state.name}
                    />

                    <label for="">Giá món ăn</label>

                    <InputGroup className="mb-3">
                      <input
                        type="text"
                        name="price"
                        id=""
                        className="form-control"
                        placeholder=""
                        aria-describedby="helpId"
                        onChange={(event) => this.isChange(event)}
                        value={this.state.price}
                        // defaultValue={this.props.Data.first_name}
                      />

                      <InputGroup.Text>VNĐ</InputGroup.Text>
                    </InputGroup>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            {console.log(this.props.type)}
            {this.props.type == "Edit" ? (
              <div>
                <Button
                  variant="danger"
                  onClick={() => this.handleClickDelete(false)}
                >
                  Xóa
                </Button>
                {"  "}
                <Button variant="primary" onClick={() => this.is_Save(false)}>
                  Cập nhật
                </Button>
              </div>
            ) : (
              <div />
            )}
            {this.props.type == "Add" ? (
              <div>
                <Button variant="primary" onClick={() => this.is_Save(false)}>
                  Lưu
                </Button>{" "}
                <Button
                  type="reset"
                  variant="danger"
                  onClick={() => this.is_Save(true)}
                >
                  Lưu và tiếp tục
                </Button>
              </div>
            ) : (
              <div />
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default modal;


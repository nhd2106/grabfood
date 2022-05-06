import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import firebase from "firebase";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { FirebaseConnect } from "../FirebaseConnect";
import { v4 as uuidv4 } from 'uuid';
import {TITLE_MENU, URL_IMG_FOOD} from '../../libs/config'


export default function ModalInsert({ isShow ,data, handleEditData, handleSaveInsert, handleDeleteFood ,handleShowInsert, type}) {
  const menu_Item = FirebaseConnect().ref(`id_unit1/`).child("node1/")
  const [food, foodSet] = useState({});
  // const [price, priceSet] = useState(0);
  // const [name, nameSet] = useState();


  useEffect(() => {
    foodSet(data);
    // console.log(data)s
  }, [data])

  const  isChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    foodSet({...food, [name]: value});
  };

    const is_Save = (next) => {
    if (!food.nameFood || food.nameFood.length < 2)
      return NotificationManager.error("Vui lòng nhập tên món ăn", "Lỗi", 2000);

    if (!food.price || food.price.length < 2)
      return NotificationManager.error("Vui lòng nhập giá món ăn", "Lỗi", 2000);

    const nameFood = food.nameFood;
    const price = food.price;

    if (!next) handleShowInsert();
    if (type == "Edit") 
    {
      const dataEdit = {
        ...data, 
        nameFood : nameFood,
        price : price,
      }
      handleEditData(dataEdit); 
    } 
    else {
    const uid = uuidv4();
    const data = {
      id : uid,
      nameFood : nameFood,
      price,
      img: URL_IMG_FOOD,
      title : TITLE_MENU
    };
      handleSaveInsert(data);
      Clear_state();
    }
  };

    const Clear_state = () => {
    foodSet({nameFood:"", price: ""});
    return NotificationManager.success(
      "Thêm thực phẩm thành công",
      "Thành công",
      3000
    );
  };

  const handleDelete = (data) => {
    handleDeleteFood(data);
    handleShowInsert();
    return NotificationManager.success(
      "Xóa thực phẩm thành công",
      "Thành công",
      3000
    );
  }
  

  return (
    <div>
            <Modal
              centered
              show={isShow}
              onHide={handleShowInsert}
            >
              <Modal.Header closeButton>
                {type == "Add" ? (
                  <Modal.Title>Thêm món ăn</Modal.Title>
                ) : (
                  <div />
                )}
                {type == "Edit" ? (
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
                        <label className="text-start">Tên món ăn</label>
                        <input
                          onChange={(value) => isChange(value)}
                          type="text"
                          name="nameFood"
                          id=""
                          className="form-control"
                          placeholder=""
                          aria-describedby="helpId"
                          value={food?.nameFood}
                        />
    
                        <label for="">Giá món ăn</label>
    
                        <InputGroup className="mb-3">
                          <input
                            type="number"
                            name="price"
                            id=""
                            className="form-control"
                            placeholder=""
                            aria-describedby="helpId"
                            onChange={(event) => isChange(event)}
                            value={food?.price}
                          />
                          <InputGroup.Text>VNĐ</InputGroup.Text>
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                {type == "Edit" ? (
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(data)}
                    >
                      Xóa
                    </Button>
                    {"  "}
                    <Button variant="primary" onClick={() => is_Save(false)}>
                      Cập nhật
                    </Button>
                  </div>
                ) : (
                  <div />
                )}
                {type == "Add" ? (
                  <div>
                    <Button variant="primary" onClick={() => is_Save(false)}>
                      Lưu
                    </Button>{" "}
                    <Button
                      type="reset"
                      variant="danger"
                      onClick={() => is_Save(true)}
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
  )
}




// class ModalInsert extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: "",
//       price: "",
//       name: "",
//     };
//   }

//   UNSAFE_componentWillMount() {
//     this.setState({
//       price: this.props.data?.price,
//       name: this.props.data?.nameFood,
//     });
//     console.log(this.props.data);
//   }

//   isChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleInserData = async (data) => {
//     menu_Item.child("Title/thuc-don-xbot").update({
//       id: "thuc-don-xbot",
//       name_title: "Thực đơn",
//     });

//     const uid_id = await uuidv4();
//     const dataAdd = {
//       [uid_id]: {
//         nameFood: data.name,
//         title: "thuc-don-xbot",
//         id: uid_id,
//         img: data.img,
//         description: "",
//         price: data.price,
//       },
//     };
//     menu_Item.child("menu/thuc-don-xbot").update(dataAdd);
//   };

//   handleEditData = (data, id) => {
//     // console.log(id);

//     const uid_id = id;
//     const dataAdd = {
//       [uid_id]: {
//         nameFood: data.name,
//         title: "thuc-don-xbot",
//         id: uid_id,
//         img: data.img,
//         description: "",
//         price: data.price,
//       },
//     };
//     menu_Item
//       .child("menu/thuc-don-xbot")
//       .update(dataAdd)
//       .then(() => {
//         NotificationManager.success(
//           "Cập nhật món ăn thành công",
//           "Thành công",
//           3000
//         );
//       })
//       .catch(function (error) {
//         console.log("Remove failed: " + error.message);
//         NotificationManager.error(error.message, "Lỗi", 3000);
//       });
//   };

//   is_Save = (next) => {
//     if (this.state.name.length < 1)
//       return NotificationManager.error("Vui lòng nhập tên món ăn", "Lỗi", 2000);

//     if (this.state.price.length < 1)
//       return NotificationManager.error("Vui lòng nhập giá món ăn", "Lỗi", 2000);

//     // console.log(this.props.id);

//     const name = this.state.name;
//     const price = this.state.price;

//     const data = {
//       id : uuidv4(),
//       nameFood : name,
//       price,
//       img: URL_IMG_FOOD,
//       title : TITLE_MENU
//     };
//     if (!next) this.props.handleShowInsert();
//     if (this.props.data.id) this.handleEditData(data, this.props.id);
//     else {
//       // this.handleInserData(data);
//       this.props.handleSaveInsert(data);
//       this.Clear_state();
//     }
//   };



//   Clear_state = () => {
//     this.setState({
//       id: "",
//       price: "",
//       name: "",
//     });
//     return NotificationManager.success(
//       "Thêm thực phẩm thành công",
//       "Thành công",
//       3000
//     );
//   };

//   render() {
//     return (
//      
//     );
//   }
// }

// export default ModalInsert;


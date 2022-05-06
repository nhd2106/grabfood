import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import _ from "lodash";
import firebase from "firebase";
import ItemCart from "./ItemCart";
import {
  NotificationManager,
} from "react-notifications";
// import { FirebaseConnect } from "./Components/FirebaseConnect";
import { FirebaseConnect } from './../FirebaseConnect/index';



export default function Index({ data, isShow, handleShow , lock }) {

  const idRoom = useSelector(state => state.idRoom)

  const dispatch = useDispatch();
  const deleteIdLocal = useCallback(
    (index) => dispatch({
      type: 'DELETE_ID_LOCAL',
      index : index
    }),
  );

  const editIdLcal = useCallback((index, value) => dispatch({
    type: 'EDIT_ID_LOCAL',
    value : value,
    index : index
  }),
  [dispatch],
  )

  const sumPrice = () => {
    let sum = 0;
    _.map(data, (value) => {
       sum += Number(value?.number*value?.sum);
    })
    return sum;
  }

  const handleSumPrice = (number, price) => {
    const numberFormat = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    const sum = numberFormat.format(number * price * 1000).replace("₫", "");
    return sum;
  };

  const onChangeNumber = (event) => {
   
    const value = Number(event.target.value) || 0;
    if (value < 1) {
      event.target.value = 1;
      return;
    }    
    const index = event.target.name;
    editIdLcal(index,value)
  };

  const Call = FirebaseConnect().ref(idRoom).child(`/Call/`);
  
  const handleDeleteFood = (index, uid) => {
    Call.child(uid).remove().then(() => {
  
    deleteIdLocal(index)
          NotificationManager.success(
            "Xóa món ăn thành công.",
            "Thành công",
            3000)
      
    }).catch((error) => {
      NotificationManager.error(
        error.message,
        "Lỗi",
        3000)
    });
  };


  const handleRequestUnlock = (key) => {
    // Call.child(key).update({
    //   Request : true
    // }).then(() => {
    //   NotificationManager.success(
    //     "Gửi yêu cầu điều chỉnh thành công. Đang chờ quản trị viên xử lý",
    //     "Thành công",
    //     3000)
    // }).catch((error) => {
    //   NotificationManager.error(
    //     error.message,
    //     "Lỗi",
    //     3000)
    // });
  }

  const renderTable = () =>
    _.map(data, (value, key) => (
      <ItemCart
        data= {value} 
        index = {key}
        onChangeNumber={onChangeNumber}
        handleSumPrice={handleSumPrice}
        handleDeleteFood = {handleDeleteFood}
        handleRequestUnlock = {handleRequestUnlock}
        lock = {!lock}
      />
    ));



  const handleUpdateFood = () => {

    // const Call = FirebaseConnect().ref(idRoom).child(`/Call/`);

    _.map(data, (value) => {
      // console.log(value);
        Call.update( { [value.uid] : {
        id: value?.id,
        nameFood: value?.nameFood,
        Option: value?.Option,
        number: value?.number,
        sum: value?.sum,
        img: value?.img,
        people: localStorage.getItem("User"),
        foodLock : true,
        price : value.price,
        } });
    })

    // localStorage.setItem("Lock","fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa");

      console.log(idRoom);

    NotificationManager.success(
      "Đơn hàng đã cập nhật lên hệ thống",
      "Thành công",
      3000); 

    // setTimeout(function() {
    //   window.location.reload();
    // }, 1000);
  };

  // const mapDataUpdateToData = () => {
  //   for (let index = 0; index < data.length; index++) {
  //     if(dataUpdate[index] == null)
  //     {
  //       dataUpdateSet({
  //         ...dataUpdate,
  //         [index]: { ...data[index]},
  //       });
  //     }
  //   }
  // }


  return (
    <Drawer anchor={"right"} open={isShow} onClose={handleShow}>
      {/* {mapDataUpdateToData()} */}
      {/* {console.log(uuidv4())} */}
      <List component="nav" aria-label="mailbox folders">
        <ListItem divider>
          <h4 className="load-center">
            Giỏ đồ ăn  
            {/* {sumPrice()/1000}.000 VND  */}
            </h4>
        </ListItem>
        <ListItem>
          <h5>Danh sách vừa được chọn: </h5>
        </ListItem>
        <ListItem>
          <TableContainer sx={{ maxHeight: "480px" }}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              {renderTable()}
            </Table>
          </TableContainer>
        </ListItem>
      </List>
      <Box className="footer">
        <ListItem divider>
          <Stack className="load-center" direction="row" spacing={2}>
            {/* <Button
              // onClick={() => handleUpdateFood()}
              className="float-left"
              variant="contained"
            >
              Yêu cầu mở khóa
            </Button> */}
            <Button
              disabled = {!lock}
              onClick={() => handleUpdateFood()}
              variant="contained"
              color="success"
            >
              Chốt đơn
            </Button>
          </Stack>
        </ListItem>
      </Box>
    </Drawer>
  );
}

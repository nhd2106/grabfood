import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
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

const Call = firebase.database().ref(`Call/`);

export default function Index({ data, isShow, handleShow , lock }) {
  // const [dataUpdate, dataUpdateSet] = useState(data);

  // const [sumPrice, sumPriceSet] = useState(0);
  const [dataUpdate, dataUpdateSet] =  useState(data);

  const sumPrice = () => {
    let sum = 0;
    _.map(dataUpdate, (value, key) => {
       sum += (value?.number*value?.sum);
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

    console.log(value)

    if (value < 0) {
      event.target.value = 0;
      return;
    }    
    const index = event.target.name;

    console.log(index)

    dataUpdateSet({
      ...dataUpdate,
      [index]: { ...data[index], number: value },
    });
  };


  console.log(data)
 

  
  const handleDeleteFood = (key) => {
    // console.log(key);
    Call.child(key).remove().then(() => {
      const local = localStorage.getItem("ID");
      let DataID = [{}]
      try
        {
          DataID  =  JSON.parse(local);
          DataID = DataID.filter(item => item.id != key)
          localStorage.setItem("ID",JSON.stringify(DataID));

          NotificationManager.success(
            "Xóa món ăn thành công.",
            "Thành công",
            3000)
        }catch{
          console.log("catch");
        }
    }).catch((error) => {
      NotificationManager.error(
        error.message,
        "Lỗi",
        3000)
    });
  };


  const handleRequestUnlock = (key) => {
    Call.child(key).update({
      Request : true
    }).then(() => {
      NotificationManager.success(
        "Gửi yêu cầu điều chỉnh thành công. Đang chờ quản trị viên xử lý",
        "Thành công",
        3000)
    }).catch((error) => {
      NotificationManager.error(
        error.message,
        "Lỗi",
        3000)
    });
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
        lock = {lock}
      />
    ));

  const handleUpdateFood = () => {

    _.map(dataUpdate, (value) => {
      Call.child(value.key).update({
        number: value.number,
        Lock: true,
        Request : false,
        show : true,
      });
    })

    NotificationManager.success(
      "Đơn hàng đã cập nhật lên hệ thống",
      "Thành công",
      3000); 

    setTimeout(function() {
      window.location.reload();
    }, 2000);
  };

  const mapDataUpdateToData = () => {
    for (let index = 0; index < data.length; index++) {
      if(dataUpdate[index] == null)
      {
        dataUpdateSet({
          ...dataUpdate,
          [index]: { ...data[index]},
        });
      }
    }
  }

  return (
    <Drawer anchor={"right"} open={isShow} onClose={handleShow}>
      {mapDataUpdateToData()}
      <List component="nav" aria-label="mailbox folders">
        <ListItem divider>
          <h4 className="load-center">Giỏ đồ ăn {sumPrice()}.000 VND </h4>
        </ListItem>
        <ListItem>
          <h5>Trà Sữa Hi Gogo - Nguyễn Ảnh Thủ</h5>
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
              disabled = {lock}
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

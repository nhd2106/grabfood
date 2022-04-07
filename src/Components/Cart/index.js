import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import _ from 'lodash'
import firebase from "firebase";

export default function Index({data, isShow, handleShow}) {

  const [dataUpdate] = useState(data);

  // console.log(data);

  const handleSumPrice = (number, price) => {
    const numberFormat = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      const sum = numberFormat.format((number * price) * 1000).replace("₫", "");
      return sum;
  }

  const onChangeNumber = (event) => {
    if(event.target.value < 0)
        event.target.value = 0

    const index = event.target.name;
    const value = event.target.value;
    dataUpdate[index].number = value;

    // console.log(event.target.name)
    // console.log(event.target.value)
    // console.log(dataUpdate[index])
  }

  const renderTable = () =>  _.map(data ,(value, key) =>  (
    <TableRow key={value.id}>
      <TableCell>  
          <input
            onChange={onChangeNumber}
            name = {key}
            className="with-40"
            type="number"
            defaultValue={value.number}
        ></input>
      </TableCell>
      <TableCell><img style = {{maxWidth : 60}} src={value.img}/>  </TableCell>
        <TableCell style={{ width: 330 }} align="left"> 
          <Box maxWidth={270}>
            <h6><b>{value.nameFood}</b></h6>
            { _.map(value.Option, (option) => <div>{option.name_value}</div>)}
          </Box>
        </TableCell>
      <TableCell> <div>{handleSumPrice(value.number, value.sum)}</div></TableCell>
    </TableRow>
  ))
  
  const handleUpdateFood = () => {
    const Call = firebase.database().ref(`Call/`);
    _.map(dataUpdate , (value) => 
      {
      Call.child(value.key).update({
        number: value.number
      })
    })
  }

  
  return (
    <Drawer anchor={"right"} open={isShow} onClose = {handleShow}>
    <List component="nav" aria-label="mailbox folders">
    <ListItem divider>
          <h4 className='load-center'>Giỏ đồ ăn </h4>
    </ListItem>
    <ListItem>           
          <h5>Trà Sữa Hi Gogo - Nguyễn Ảnh Thủ</h5>
    </ListItem>
    <ListItem>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        {renderTable()}
      </Table>
      </ListItem>
    </List> 
    <Box className = "footer">
    <ListItem divider>
    <Stack className = "load-center" direction="row" spacing={2}>
        <Button onClick={() => handleUpdateFood()} className="float-left" variant="contained">Contained</Button>
        <Button onClick ={() => onChangeNumber(1,1)}variant="contained" color="success">Chốt đơn</Button>
      </Stack>
    </ListItem>
    </Box>
    </Drawer>
  )
}



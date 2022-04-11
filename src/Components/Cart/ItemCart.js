import React from 'react'
import { Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import Box from '@mui/material/Box';
import _ from 'lodash'
import { useState } from 'react';
import firebase from "firebase";
const nodeCall = firebase.database().ref("Call/");


export default function ItemCart({data, index , onChangeNumber , handleDeleteFood, handleRequestUnlock , lock }) {
  
    // console.log(index)
    
    // const [price, priceSet] = useState((data?.number*data?.sum));

    // const onChange = (event) => {
    //     const value = event.target.value;
    //     if (value < 0) {
    //         event.target.value = 0;
    //         return;
    //       }    
    //     // priceSet((data?.sum*value))
    //     onChangeNumber(event)
    // }

    // {handleSumPrice(data.number, data.sum)}


    return (
    <TableRow key={data?.id}>
      <TableCell>  
          <input
            disabled = {data.foodLock || lock}
            onChange={(event) =>onChangeNumber(event)}
            name = {index}
            className="with-40"
            type="number"
            defaultValue={data?.number}
        ></input>
      </TableCell>
      <TableCell><img style = {{maxWidth : 60}} src={data?.img}/>  </TableCell>
        <TableCell style={{ width: 330 }} align="left"> 
          <Box maxWidth={270}>
            <h6><b>{data.nameFood}</b></h6>
            { _.map(data?.Option, (option) => <div>{option?.name_value}</div>)}
          </Box>
        </TableCell>
      <TableCell> {(data.foodLock == false ) ? <Button disabled = {lock} onClick={(key) => handleDeleteFood(data.key)} >Xóa</Button> : <div/> }</TableCell>
      <TableCell> {(data.foodLock == true ) ? <Button disabled = {lock} onClick={(key) => handleRequestUnlock(data.key)}>Yêu cầu mở khóa</Button> : <div/> }</TableCell>
      <TableCell> <label>{data?.number*data?.sum}.000</label></TableCell>
    </TableRow>
  )
}



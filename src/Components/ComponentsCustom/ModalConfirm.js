import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, InputGroup, ModalTitle } from "react-bootstrap";
import firebase from "firebase";
import ModalInsert from "../ComponentsCustom/ModalInsert"
import { v4 as uuidv4 } from 'uuid';


export default function ModalUnit({ isShow, handleClose, data }) {
  return (
    <Modal 
    sx={{
      color: "#00ff00",
      zIndex: 1,
    }}
    centered show={false} onHide={() => handleClose()}>
         <Modal.Header closeButton>
              <Modal.Title><input onChange={handleChangeValue} defaultValue={"Tên quán"}></input></Modal.Title>
            
          </Modal.Header>
          <Modal.Body>
            
        
        </Modal.Body>

          <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => handleSaveStore()}
                >
                  S
                </Button>
          </Modal.Footer>
        </Modal>
  );
}

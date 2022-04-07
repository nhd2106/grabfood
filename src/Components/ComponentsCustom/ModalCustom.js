import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, FormControl, InputGroup, ModalTitle } from "react-bootstrap";

export default function ModalCustom({ isShow, handleClose, handleSave }) {
  const [value, valueSet] = useState();

  const handleChangeValue = (value) => {
    valueSet(value.target.value);
  };

  return (
    <Modal centered show={isShow} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <ModalTitle>Nhập thông tin URL lấy dữ liệu</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title>
          <InputGroup className="mb-3">
            <InputGroup.Text>{"Nhập URL Grab Food :"}</InputGroup.Text>
            <FormControl onChange={handleChangeValue} />
          </InputGroup>
        </Modal.Title>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSave(value)}
        >
          Bắt đầu lấy dữ liệu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

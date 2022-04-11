import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, FormControl, InputGroup, ModalTitle } from "react-bootstrap";

export default function ModalPhone({ type, isShow, handleSave }) {
  const [value, valueSet] = useState();
  const [disabled, disabledSet] = useState(true);

  const handleChangeValue = (value) => {
    valueSet(value.target.value);

    if (type === "Phone") {
      if (value.target.value.length === 10) disabledSet(false);
      else disabledSet(true);
    }
    if (type === "SMS") {
      if (value.target.value.length === 6) disabledSet(false);
      else disabledSet(true);
    }

    if (type === "Name") {
      if (value.target.value.length > 1) disabledSet(false);
      else disabledSet(true);
    }
  };

  return (
    <Modal centered show={isShow}>
      <Modal.Header>
        <ModalTitle>
          {type === "SMS"
            ? "Nhập mã số SMS"
            : type === "Phone"
            ? "Nhập số điện thoại"
            : "Nhập tên của anh/chị"}
        </ModalTitle>
      </Modal.Header>
      <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              {type === "SMS"
                ? "Nhập mã số SMS : "
                : type === "Phone"
                ? "Nhập số điện thoại : "
                : "Nhập tên của anh/chị :"}
            </InputGroup.Text>

            {type === "SMS" || type === "Phone" ? (
              <FormControl
                type="number"
                aria-label="First name"
                onChange={handleChangeValue}
              />
            ) : (
              <FormControl
                aria-label="First name"
                onChange={handleChangeValue}
              />
            )}
          </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={disabled}
          type="button"
          className="btn btn-primary"
          onClick={() => handleSave(type, value)}
        >
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

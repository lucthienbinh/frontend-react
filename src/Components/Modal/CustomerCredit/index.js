import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function CustomerCreditModal(props) {
  const [state, setState] = useState({
    id: 0,
    customer_id: 0,
    account_balance: 0,
  });
  const customer_id = state.customer_id;
  const account_balance = state.account_balance;

  const [modalInfo, setModalInfo] = useState({
    modalName: "",
    submitButtonName: "",
  });
  const modalName = modalInfo.modalName;
  const submitButtonName = modalInfo.submitButtonName;

  useEffect(() => {
    setState(() => {
      return {
        id: props.customerCredit.id,
        customer_id: props.customerCredit.customer_id,
        account_balance: props.customerCredit.account_balance,
      };
    });

    setModalInfo(() => {
      return {
        modalName: "Update customer credit",
        submitButtonName: "Update",
      };
    })
  }, [props.customerCredit]);

  const handleChange = (event) => {
    const { name, value, valueAsNumber } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: valueAsNumber || value };
    });
  };

  const handleSubmit = () => {
    props.modalButton.submitUpdate(state);
    props.setModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={() => props.setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            width: "500px",
            height: "285px",
            top: "30%",
            margin: "0 auto",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <div className="customer-credit-modal-align-center">
          <h2>{modalName}</h2>
        </div>
        <hr/>
        <Form className="content">
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Customer ID
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={customer_id}
                onChange={handleChange}
                required
                disabled={true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Balance
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="account_balance"
                placeholder="District"
                value={account_balance}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <div className="customer-credit-modal-align-center">
            <Button
              className="btn-6"
              onClick={handleSubmit}
            >
              {submitButtonName}
            </Button>
            <Button
              className="btn-7"
              onClick={() => props.setModalIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}

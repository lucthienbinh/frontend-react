import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function EmployeeTypeModal(props) {
  const [state, setState] = useState({
    id: 0,
    name: "",
  });
  const name = state.name;

  const [modalInfo, setModalInfo] = useState({
    modalName: "",
    hideSubmitButton: false,
    submitButtonName: "",
  });
  const modalName = modalInfo.modalName;
  const hideSubmitButton = modalInfo.hideSubmitButton;
  const submitButtonName = modalInfo.submitButtonName;

  useEffect(() => {
    if (typeof props.employeeType !== "undefined") {
      setState(() => {
        return {
          id: props.employeeType.id,
          name: props.employeeType.name,
        };
      });
      if (props.disabledInput === true) {
        setModalInfo(() => {
          return {
            modalName: "Employee type detail",
            hideSubmitButton: true,
          };
        });
      } else {
        setModalInfo(() => {
          return {
            modalName: "Update employee type",
            hideSubmitButton: false,
            submitButtonName: "Update",
          };
        });
      }
    } else {
      setState(() => {
        return {
          id: 0,
          name: "",
        };
      });
      setModalInfo(() => {
        return {
          modalName: "Create employee type",
          hideSubmitButton: false,
          submitButtonName: "Create",
        };
      });
    }
  }, [props.employeeType, props.disabledInput]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = () => {
    if (typeof props.employeeType === "undefined") {
      props.modalButton.submitCreate(state);
    } else {
      props.modalButton.submitUpdate(state);
    }
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
            width: "400px",
            height: "210px",
            top: "40%",
            margin: "0 auto",
            border: "3px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <div className="employee-type-modal-align-center">
          <h2>{modalName}</h2>
        </div>
        <Form className="content">
          <Form.Group as={Row} controlId="formHorizontal">
            <Form.Label column sm={2}>
              Type name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={handleChange}
                required
                disabled={props.disabledInput}
              />
            </Col>
          </Form.Group>

          <div className="employee-type-modal-align-center">
            <Button
              className="btn-6"
              onClick={handleSubmit}
              hidden={hideSubmitButton}
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

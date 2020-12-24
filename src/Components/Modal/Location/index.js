import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function LocationModal(props) {
  const [state, setState] = useState({
    id: 0,
    city: "",
    district: 0,
  });
  const city = state.city;
  const district = state.district;

  const [modalInfo, setModalInfo] = useState({
    modalName: "",
    hideSubmitButton: false,
    submitButtonName: "",
  });
  const modalName = modalInfo.modalName;
  const hideSubmitButton = modalInfo.hideSubmitButton;
  const submitButtonName = modalInfo.submitButtonName;

  useEffect(() => {
    if (typeof props.location !== "undefined") {
      setState(() => {
        return {
          id: props.location.id,
          city: props.location.city,
          district: props.location.district,
        };
      });
      if (props.disabledInput === true) {
        setModalInfo(() => {
          return {
            modalName: "Delivery detail",
            hideSubmitButton: true,
          };
        });
      } else {
        setModalInfo(() => {
          return {
            modalName: "Update delivery",
            hideSubmitButton: false,
            submitButtonName: "Update",
          };
        });
      }
    } else {
      setState(() => {
        return {
          id: 0,
          city: "",
          district: "",
        };
      });
      setModalInfo(() => {
        return {
          modalName: "Create delivery",
          hideSubmitButton: false,
          submitButtonName: "Create",
        };
      });
    }
  }, [props.location, props.disabledInput]);

  const handleChange = (event) => {
    const { name, value, valueAsNumber } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: valueAsNumber || value };
    });
  };

  const handleSubmit = () => {
    if (typeof props.location === "undefined") {
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
            width: "600px",
            height: "240px",
            top: "30%",
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
        <div className="location-modal-align-center">
          <h2>{modalName}</h2>
        </div>
        <Form className="content">
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              City
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="city"
                placeholder="City"
                value={city}
                onChange={handleChange}
                required
                disabled={props.disabledInput}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              District
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="district"
                placeholder="District"
                value={district}
                onChange={handleChange}
                required
                disabled={props.disabledInput}
              />
            </Col>
          </Form.Group>

          <div className="location-modal-align-center">
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

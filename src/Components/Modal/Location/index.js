import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import Modal from "react-modal";

Modal.setAppElement("#root");
export default function LocationCard(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [state, setState] = useState({
    city: "",
    district: 0,
  });

  useEffect(() => {
    setModalIsOpen(props.modalIsOpen);
  },[props.modalIsOpen])

  const city = state.city;
  const district = state.district;

  if (typeof props.location !== 'undefined') {
    setState(() => {
      return {
        city: props.location.city,
        district: props.location.district,
      }
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    props.setModalIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
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
            width: "50%",
            height: "50%",
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
        <h2>Modal header</h2>
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
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 1 }}>
              <Button className="btn-6" type="submit">
                Create
              </Button>
            </Col>

            <Col sm={{ span: 1 }}>
              <Button
                className="btn-7"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
}

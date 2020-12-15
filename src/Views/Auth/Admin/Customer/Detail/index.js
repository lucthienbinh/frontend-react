import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

export default function CustomerDetail() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  const [state, setState] = useState({
    name: "",
    address: "",
    phone: 0,
    age: 0,
    gender: "",
    point: 0,
  });
  const name = state.name;
  const address = state.address;
  const phone = state.phone;
  const age = state.age;
  const gender = state.gender;
  const point = state.point;

  useEffect(() => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
      },
      credentials: "include",
    };

    fetch("/api/customer/id/" + id, requestOptions)
      .then((res) => {
        setIsLoading(false);
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setState(json.customer_info);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <p className="customer-detail-header">Customer detail</p>
        <Form className="content">
          <Form.Group as={Row} controlId="formHorizontalID">
            <Form.Label column sm={2}>
              ID
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={name} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAge">
            <Form.Label column sm={2}>
              Age
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={age} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhone">
            <Form.Label column sm={2}>
              Phone
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={phone} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalGender">
            <Form.Label column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={gender} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddress">
            <Form.Label column sm={2}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={address} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPoint">
            <Form.Label column sm={2}>
              Point
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={point} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 1,offset: 2 }}>
              <Button
                className="btn-7"
                onClick={() => history.push("/customer/list")}
              >
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </AdminLayout>
    );
  }
}

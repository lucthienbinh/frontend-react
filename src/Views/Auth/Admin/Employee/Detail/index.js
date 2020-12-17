import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

export default function EmployeeDetail() {
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
    identity_card: "",
    employee_type_name: "",
    avatar: "",
    delivery_location_city: "",
    delivery_location_district: "",
  });
  const name = state.name;
  const address = state.address;
  const phone = state.phone;
  const age = state.age;
  const gender = state.gender;
  const identity_card = state.identity_card;
  const employee_type_name = state.employee_type_name;
  const avatar = state.avatar;
  const delivery_location_city = state.delivery_location_city;
  const delivery_location_district = state.delivery_location_district;

  useEffect(() => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      credentials: "include",
      mode: "cors",
    };

    fetch(process.env.REACT_APP_API_URL + `/api/employee/id/${id}`, requestOptions)
      .then((res) => {
        setIsLoading(false);
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setState(json.employee_info);
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
        <p className="customer-detail-header">Employee detail</p>
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

          <Form.Group as={Row} controlId="formHorizontalIdentityCard">
            <Form.Label column sm={2}>
              Identity card
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={identity_card} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmployeeTypeName">
            <Form.Label column sm={2}>
              Employee type name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={employee_type_name} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDeliveryLocationCity">
            <Form.Label column sm={2}>
              Delivery location city
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={delivery_location_city} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDeliveryLocationDistrict">
            <Form.Label column sm={2}>
              Delivery location district
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={delivery_location_district} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 2 }}>
              <Button
                className="btn-7"
                onClick={() => history.push("/employee/list")}
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

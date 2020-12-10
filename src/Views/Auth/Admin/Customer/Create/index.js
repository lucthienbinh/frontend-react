import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row, FormGroup } from "react-bootstrap";

import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import CustomerCard from "../../../../../Components/CustomerCard";
import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

export default function CustomerCreate() {
  const [cookies, setCookie, removeCookie] = useCookies(["csrf"]);

  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [gender, setGender] = useState("male");

  const handleGenderChange = (e) => {
    e.persist();
    setGender(e.target.value);
  };

  if (isLoading == false) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <p className="customer-create-header">Create Customer</p>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Name" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddress">
            <Form.Label column sm={2}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Address"/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhone">
            <Form.Label column sm={2}>
              Phone
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAge">
            <Form.Label column sm={2}>
              Age
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="number" />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} controlId="formHorizontalGender">
              <Form.Label as="book" column sm={2}>
                Gender
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Male"
                  value="male"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  onChange={handleGenderChange}
                  checked={gender === "male"}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  value="female"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  onChange={handleGenderChange}
                  checked={gender === "female"}
                />
                <Form.Check
                  type="radio"
                  label="Others"
                  value="others"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                  onChange={handleGenderChange}
                  checked={gender === "others"}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </AdminLayout>
    );
  }
}

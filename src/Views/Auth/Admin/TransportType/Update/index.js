import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

export default function CustomerUpdate() {
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
  })
  const name = state.name;
  const address = state.address;
  const phone = state.phone;
  const age = state.age;
  const gender = state.gender;

  const handleChange = (event) => {
    const { name, value, valueAsNumber } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: valueAsNumber || value };
    });
  };

  useEffect(() => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      
      credentials: "include",
      method: "GET",
    };

    fetch(`/api/customer/id/${id}`, requestOptions)
      .then((res) => {
        setIsLoading(false);
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setState(() => { return { ...json.customer_info } })
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(state),
    };
    console.log(state);
    return fetch("/api/customer/update/" + id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <p className="customer-create-header">Update Customer</p>
        <Form className="content" onSubmit={(e) => handleSubmit(e)}>
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddress">
            <Form.Label column sm={2}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhone">
            <Form.Label column sm={2}>
              Phone
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={handleChange}
                required
                min="100000000"
                max="9999999999"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAge">
            <Form.Label column sm={2}>
              Age
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="age"
                value={age}
                onChange={handleChange}
                min="1"
                max="99"
                required
              />
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
                  name="gender"
                  id="genderRadios1"
                  onChange={handleChange}
                  checked={gender === "male"}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  value="female"
                  name="gender"
                  id="genderRadios2"
                  onChange={handleChange}
                  checked={gender === "female"}
                />
                <Form.Check
                  type="radio"
                  label="Others"
                  value="others"
                  name="gender"
                  id="genderRadios3"
                  onChange={handleChange}
                  checked={gender === "others"}
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 2 }}>
              <Button className="btn-6" type="submit">
                Update
              </Button>
            </Col>

            <Col sm={{ span: 1 }}>
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

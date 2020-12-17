import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import bsCustomFileInput from 'bs-custom-file-input';

import AdminLayout from "../../../../Layouts/AdminLayout";

export default function EmployeeCreate() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  useEffect(() => {
    bsCustomFileInput.init()
    return () => {
      bsCustomFileInput.destroy()
    }
  }, [])

  const [state, setState] = useState({
    email: "admin123@gmail.com",
    password: "1111111111",
    name: "employee Hai",
    address: "123 tran nao",
    phone: 909888999,
    age: 20,
    gender: "male",
    avatar: "",
    identity_card: "24873t2716653826325",
    employee_type_id: 3,
    delivery_location_id: 1,
  });

  const fileFormRef = useRef();

  const email = state.email;
  const password = state.password;
  const name = state.name;
  const address = state.address;
  const phone = state.phone;
  const age = state.age;
  const gender = state.gender;
  const avatar = state.avatar;
  const identity_card = state.identity_card;
  const employee_type_id = state.employee_type_id;
  const delivery_location_id = state.delivery_location_id;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const resetForm = () => {
    fileFormRef.current.reset()
  }

  const submitImage = () => {
    const formData = new FormData(fileFormRef.current);
    // Source code: https://stackoverflow.com/questions/18606305/accessing-formdata-values
    let formObj = {};
    for (var pair of formData.entries()) {
      formObj[pair[0]] = pair[1]
    }
    console.log(formObj)
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: new FormData(fileFormRef.current),
    };

    return fetch(process.env.REACT_APP_API_URL + "/api/employee/upload/image", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject('Bad request sent to server!');
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestImageOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: JSON.stringify(state),
    };

    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: JSON.stringify(state),
    };

    return fetch(process.env.REACT_APP_API_URL + "/api/employee/create", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject('Bad request sent to server!');
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AdminLayout>
      <p className="employee-create-header">Create employee</p>

      <Form ref={fileFormRef} className="content" onSubmit={(e) => handleSubmit(e)}>

        <Form.Group as={Row} controlId="formHorizontalAvatar">
          <Form.Label column sm={2}>
            Avatar
          </Form.Label>
          <Col sm={10}>
            <InputGroup>
              <Form.File
                name="file"
                id="custom-file"
                label="Select file"
                custom
              />
              <InputGroup.Append>
                <Button className="btn btn-10" onClick={resetForm}>Remove</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
              minLength="10"
            />
          </Col>
        </Form.Group>

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
              Create
            </Button>
          </Col>

          <Col sm={{ span: 1 }}>
            <Button className="btn-7" onClick={() => history.push("/employee/list")}>
              Cancel
            </Button>
          </Col>

          <Col sm={{ span: 1, offset: 2 }}>
            <Button className="btn-6" onClick={submitImage}>
              Create
            </Button>
          </Col>

        </Form.Group>
      </Form>
    </AdminLayout>
  );
}

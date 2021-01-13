import React from "react";
import "./index.css";

import { Button, Container, Form, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import PublicLayout from "../../Layouts/PublicLayout";

export default function Login() {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Source code: https://stackoverflow.com/questions/18606305/accessing-formdata-values
    let formObj = {};
    for (var pair of formData.entries()) {
      formObj[pair[0]] = pair[1]
    }

    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      
      credentials: "include",
      body: JSON.stringify(formObj),
      method: "POST",
    };

    return fetch("/api/loginJSON", requestOptions)
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          return Promise.reject("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PublicLayout>
      <Container>
        <Form className="content" onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
            />
          </Form.Group>
          <ButtonGroup className="buttonGroup">
            <Button className="btn btn-1" type="submit">
              Đăng nhập
            </Button>
            <Link to="/register" className="btn btn-2">
              Đăng ký
            </Link>
          </ButtonGroup>
        </Form>
      </Container>
    </PublicLayout>
  );
}

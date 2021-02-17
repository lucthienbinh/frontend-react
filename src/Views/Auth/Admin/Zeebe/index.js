import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { Button, Form, Col, Row, Alert } from "react-bootstrap";

// Import both component for file upload
import bsCustomFileInput from 'bs-custom-file-input';

import AdminLayout from "../../../Layouts/AdminLayout";

export default function Zeebe() {
  const [cookies] = useCookies(["csrf"]);


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const clearNotify = () => {
    setSuccessMessage("");
    setErrorMessage("")
  }

  useEffect(() => {
    // eslint-disable-next-line
    return () => {
      bsCustomFileInput.destroy()
    }
    // eslint-disable-next-line
  }, [])


  const handleTestAPI = async (api) => {
    clearNotify();

    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },

      credentials: "include",
      method: "GET",
    };
    return await fetch(api, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then(data => setSuccessMessage(data.server_response))
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  return (
    <AdminLayout>
      <p className="longship-update-header">Zeebe API</p>

      {successMessage !== "" ? (<Alert key={3} variant="success">Server response: {successMessage}</Alert>) : (<></>)}
      {errorMessage !== "" ? (<Alert key={3} variant="danger">Server response: {errorMessage}</Alert>) : (<></>)}

      <hr />
      <p className="longship-update-header2">Long Ship Workflow</p>
      <Form className="content">
        <Form.Group as={Row} controlId="buttongroup">
          <Form.Label column sm={2}>Test API</Form.Label>
          <Col sm={10}>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/state-service/zeebe/deploy-long-ship-workflow")}>
              Deploy Workflow
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/state-service/zeebe/create-instance")}>
              Create Instance
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/state-service/zeebe/create-instance-with-bug")}>
              Create Instance (With Bug)
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <hr />
      <p className="longship-update-header2">Order Workflow</p>
      <Form className="content">
        <Form.Group as={Row} controlId="buttongroup">
          <Form.Label column sm={2}>Test API</Form.Label>
          <Col sm={10}>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/state-service/zeebe/deploy-long-ship-workflow")}>
              Deploy Workflow
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/state-service/zeebe/create-instance")}>
              Create Instance
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/state-service/zeebe/create-instance-with-bug")}>
              Create Instance (With Bug)
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </AdminLayout>
  );
}

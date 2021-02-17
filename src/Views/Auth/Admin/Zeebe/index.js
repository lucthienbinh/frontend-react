import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Button, Form, Col, Row, Image, InputGroup, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// Import both component for file upload
import bsCustomFileInput from 'bs-custom-file-input';
import { ResizeImage } from "../../../../Components/FileUpload"

import AdminLayout from "../../../Layouts/AdminLayout";
import Loading from "../../../Loading";

import { format } from 'date-fns'

export default function Zeebe() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [picture, setPicture] = useState([]);
  const onChangePicture = e => {
    setPicture([...picture, e.target.files[0]]);
  };
  const resetForm = () => {
    formRef.current.reset()
    setPicture([]);
  };
  const formRef = useRef();


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const clearNotify = () => {
    setSuccessMessage("");
    setErrorMessage("")
  }

  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  const [state, setState] = useState({
    order_id: 0,
    shipper_id: 0,
    customer_send_id: 0,
    customer_receive_id: 0,
    sender: "",
    receiver: "",
    shipper_receive_money: false,
    shipper_called: false,
    shipper_received_money: false,
    received_money_time: 0,
    shipper_shipped: false,
    shipped_time: 0,
    shipper_confirmed: false,
    shipper_confirmed_time: 0,
    canceled: false,
    canceled_reason: "",
    finished: false,
    oss_qr_code: ""
  });

  const order_id = state.order_id;
  const shipper_id = state.shipper_id;
  const customer_send_id = state.customer_send_id;
  const customer_receive_id = state.customer_receive_id;
  const shipper_receive_money = state.shipper_receive_money;
  const sender = state.sender;
  const receiver = state.receiver;

  // Shipper Called
  const shipper_called = state.shipper_called;

  // Shipper Received Money
  const shipper_received_money = state.shipper_received_money;
  const received_money_time = state.received_money_time;

  // Shipper Shipped
  const shipper_shipped = state.shipper_shipped;
  const shipped_time = state.shipped_time;

  // Shipper Confirmed
  const shipper_confirmed = state.shipper_confirmed;
  const shipper_confirmed_time = state.shipper_confirmed_time;

  // Message data in workflow - End
  const canceled = state.canceled;
  const canceled_reason = state.canceled_reason;
  const finished = state.finished;
  const oss_qr_code = state.oss_qr_code;

  useEffect(() => {
    fetchCreateFormData();
    // eslint-disable-next-line
    return () => {
      bsCustomFileInput.destroy()
    }
    // eslint-disable-next-line
  }, [])


  const fetchCreateFormData = async () => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      credentials: "include",

    };

    return await fetch(`/api/order-short-ship/id/1`, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setState(json.order_short_ship_info);
        setIsLoading(false);
        bsCustomFileInput.init()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTestAPI = async (api) => {
    clearNotify();

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
    return await fetch(api + id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        fetchCreateFormData()
        return res.json();
      })
      .then(data => setSuccessMessage(data.server_response))
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  const handleTestConfirmAPI = async (e) => {
    clearNotify();
    e.preventDefault();

    const config = {
      file: picture[0],
      maxSize: 300
    };
    const resizedImage = await ResizeImage(config)

    console.log(picture[0].name);
    let formData = new FormData();
    formData.append("file", resizedImage, picture[0].name);

    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },

      credentials: "include",
      method: "PUT",
      body: formData,
    };

    return await fetch("/api/order-short-ship/update/shipper-confirmed/" + id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        fetchCreateFormData()
        return res.json();
      })
      .then(data => setSuccessMessage(data.server_response))
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  const handleTestCancelAPI = async (api) => {
    clearNotify();

    const formData = new FormData();
    formData.append('canceled_reason', 'Hom nay troi mua nen khong xuong nha duoc.');

    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },

      credentials: "include",
      method: "PUT",
      body: formData,
    };

    return await fetch(api + id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        fetchCreateFormData()
        return res.json();
      })
      .then(data => setSuccessMessage(data.server_response))
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <p className="longship-update-header">Zeebe API</p>

        {successMessage !== "" ? (<Alert key={3} variant="success">Server response: {successMessage}</Alert>) : (<></>)}
        {errorMessage !== "" ? (<Alert key={3} variant="danger">Server response: {errorMessage}</Alert>) : (<></>)}

        <hr />
        <p className="longship-update-header2">Long Ship Workflow</p>
        <Form ref={formRef} className="content" onSubmit={(e) => handleTestConfirmAPI(e)}>
        <Form.Group as={Row} controlId="buttongroup">
          <Form.Label column sm={2}>Old Workflow</Form.Label>
          <Col sm={10}>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-called/")}>
              Deploy Workflow
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-received-money/")}>
              Create Instance (With Bug)
            </Button>
          </Col>
        </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalAvatar">
            <Form.Label column sm={2}>
              Select BPMN File
          </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <Form.File
                  name="file"
                  id="custom-file"
                  label="Select file"
                  onChange={onChangePicture}
                  accept="image/*"
                  custom
                  required
                />
                <InputGroup.Append>
                  <Button className="btn btn-10" onClick={resetForm}>Remove</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="buttongroup">
          <Form.Label column sm={2}>New Workflow</Form.Label>
          <Col sm={10}>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-called/")}>
              Deploy Workflow
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-received-money/")}>
              Create Instance
            </Button>
          </Col>
        </Form.Group>
        </Form>

        <hr />
        <hr />
        <p className="longship-update-header2">Long Ship Workflow</p>
        <Form ref={formRef} className="content" onSubmit={(e) => handleTestConfirmAPI(e)}>
        <Form.Group as={Row} controlId="buttongroup">
          <Form.Label column sm={2}>Old Workflow</Form.Label>
          <Col sm={10}>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-called/")}>
              Deploy Workflow
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-received-money/")}>
              Create Instance (With Bug)
            </Button>
          </Col>
        </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalAvatar">
            <Form.Label column sm={2}>
              Select BPMN File
          </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <Form.File
                  name="file"
                  id="custom-file"
                  label="Select file"
                  onChange={onChangePicture}
                  accept="image/*"
                  custom
                  required
                />
                <InputGroup.Append>
                  <Button className="btn btn-10" onClick={resetForm}>Remove</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="buttongroup">
          <Form.Label column sm={2}>New Workflow</Form.Label>
          <Col sm={10}>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-called/")}>
              Deploy Workflow
            </Button>
            <Button className="longship-update-button" onClick={() => handleTestAPI("/api/order-short-ship/update/shipper-received-money/")}>
              Create Instance
            </Button>
          </Col>
        </Form.Group>
        </Form>
      </AdminLayout>
    );
  }
}

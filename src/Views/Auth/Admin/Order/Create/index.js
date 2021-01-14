import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

import { LONGSHIPCOLUMNS, TRANSPORTTYPECOLUMNS } from "./columns";
import { TableSelect } from "../../../../../Components/Table/TableSelect";

export default function OrderCreate() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [isLoading, setIsLoading] = useState(true);
  const [transportTypes, setTransportTypes] = useState([]);
  const [longShips, setLongShips] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  
  const clearNotify = () => {
    setSuccessMessage("");
    setErrorMessage("")
  }

  // Order payment
  const [orderCreatedID, setOrderCreatedID] = useState(0);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0)
  const [finishedStepOne, setFinishedStepOne] = useState(false);
  const [hideCreditButton, setHideCreditButton] = useState(false);
  const [finishedStepTwo, setFinishedStepTwo] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    fetchCreateFormData();
    // eslint-disable-next-line
  }, [])

  const fetchCreateFormData = async () => {
    setIsLoading(true);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": cookies.csrf,
      },

      credentials: "include",
      method: "GET",
    };

    return await fetch("/api/order/create-form-data", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setLongShips(json.long_ship_list);
        setTransportTypes(json.transport_type_list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [state, setState] = useState({
    weight: 1,
    volume: 1,
    type: "123",
    customer_send_id: 1,
    customer_receive_id: 0,
    sender: "123 Vie ",
    receiver: "123 Vie ",
    transport_type_id: 3,
    detail: "123 Vie ",
    note: "123 Vie ",
    use_long_ship: true,
    long_ship_id: 1,
    short_ship_distance: 20,
  });
  const weight = state.weight;
  const volume = state.volume;
  const type = state.type;
  const customer_send_id = state.customer_send_id;
  const customer_receive_id = state.customer_receive_id;
  const sender = state.sender;
  const receiver = state.receiver;
  const transport_type_id = state.transport_type_id;
  const detail = state.detail;
  const note = state.note;
  const long_ship_id = state.long_ship_id;
  const short_ship_distance = state.short_ship_distance;

  const handleChange = (event) => {
    const { name, value, valueAsNumber } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: valueAsNumber || value };
    });
  };

  const handleSubmit = (e) => {
    clearNotify()
    e.preventDefault();

    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },

      credentials: "include",
      method: "POST",
      body: JSON.stringify(state),
    };

    return fetch("/api/order/create", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject('Bad request sent to server!');
        }
        return res.json();
      })
      .then(data => {
        setOrderCreatedID(data.order_id);
        setOrderTotalPrice(data.total_price)
        setSuccessMessage(data.server_response)
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  const actionLink1 = {
    handleSelectItem: (e) => {
      setState((prevState) => {
        return {
          ...prevState,
          transport_type_id: e.transport_type_id,
          long_ship_id: e.id
        };
      });
    },
  };

  const actionLink2 = {
    handleSelectItem: (e) => { console.log(e) },
  };

  const handlePaymentStep1 = async () => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },

      credentials: "include",
      method: "POST",
      body: JSON.stringify({ order_id: orderCreatedID }),
    };


    return await fetch("/api/order-pay/create-step-one", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        setFinishedStepOne(true)
        setHideCreditButton(data.hideCreditButton)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePaymentStep2 = async (method) => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },

      credentials: "include",
      method: "POST",
      body: JSON.stringify({ order_id: orderCreatedID, pay_method: method }),
    };


    return await fetch("/api/order-pay/create-step-two", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        setFinishedStepTwo(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePaymentStep3 = async () => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },

      credentials: "include",
      method: "PUT",
      body: JSON.stringify({ order_id: orderCreatedID }),
    };

    return await fetch("/api/order-pay/update-payment-confirm/orderid/" + orderCreatedID, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then(() => {
        setPaymentConfirmed(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else if (finishedStepOne === false) {
    return (
      <AdminLayout>
        <p className="order-create-header-1">Create order</p>
        <Form className="content" onSubmit={(e) => handleSubmit(e)}>

          <Form.Group as={Row} controlId="formHorizontalsAddress">
            <Form.Label column sm={2}>
              Weight
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="weight"
                placeholder="weight"
                value={weight}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizon4taflsAess">
            <Form.Label column sm={2}>
              Volume
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="volume"
                placeholder="volume"
                value={volume}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHoriz4on55taflsAess">
            <Form.Label column sm={2}>
              Type
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="type"
                placeholder="type"
                value={type}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHof2riasflsAess">
            <Form.Label column sm={2}>
              Detail
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="detail"
                placeholder="detail"
                value={detail}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHoriaf2sflsAess">
            <Form.Label column sm={2}>
              Note
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="note"
                placeholder="Note"
                value={note}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <hr />

          <Form.Group as={Row} controlId="formHoriz42on5v5taflsAess">
            <Form.Label column sm={2}>
              Customer send id
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="customer_send_id"
                placeholder="customer_send_id"
                value={customer_send_id}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizon5552tasflsAess">
            <Form.Label column sm={2}>
              Customer receive id
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="customer_receive_id"
                placeholder="customer_receive_id"
                value={customer_receive_id}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <hr />

          <Form.Group as={Row} controlId="formHorizoantwf2atl4aeq">
            <Form.Label column sm={2}>Long ship ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={long_ship_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizoantwf2arl4aeq">
            <Form.Label column sm={2}>Transport type ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={transport_type_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizon55tas312flsAess">
            <Form.Label column sm={2}>
              Sender
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="sender"
                placeholder="sender"
                value={sender}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizon55tasfls23Aess">
            <Form.Label column sm={2}>
              Receiver
          </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="receiver"
                placeholder="receiver"
                value={receiver}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHoriddzontalsAddress">
            <Form.Label column sm={2}>
              Short ship distance
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="number"
                name="short_ship_distance"
                placeholder="short_ship_distance"
                value={short_ship_distance}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <hr />

          {successMessage !== "" ? ( <Alert key={3} variant="success">Server response: {successMessage}</Alert>) : (<></>)}
          {errorMessage !== "" ? ( <Alert key={3} variant="danger">Server response: {errorMessage}</Alert>) : (<></>)}

          <Form.Group as={Row} controlId="formHorizoantgswf2al4aeq">
            <Form.Label column sm={2}>Total price</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={orderTotalPrice} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizoantwf2al4aeq">
            <Form.Label column sm={2}>Order created ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={orderCreatedID} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Create order
            </Form.Label>
            <Col sm={10}>
              {orderCreatedID !== 0 ? (
                <Button className="btn-10 mr-4" onClick={handlePaymentStep1}>
                  Pay
                </Button>
              ) : (<></>)}
              <Button className="btn-6 mr-4" type="submit">
                Create
              </Button>
              <Button className="btn-7" onClick={() => history.push("/order/list")}>
                Cancel
              </Button>
            </Col>
          </Form.Group>
        </Form>
        <hr />
        <div>
          <p className="long-ship-list-header">Long ship list</p>
        </div>
        <TableSelect columns={LONGSHIPCOLUMNS} data={longShips} actionLink={actionLink1} />
        <hr />
        <div>
          <p className="long-ship-list-header">Transport type list</p>
        </div>
        <TableSelect columns={TRANSPORTTYPECOLUMNS} data={transportTypes} actionLink={actionLink2} />
      </AdminLayout>
    );
  } else if (finishedStepTwo === false) {
    return (
      <AdminLayout>
        <p className="order-create-header-1">Select method - Total price: {orderTotalPrice} VND</p>
        <Form.Group as={Row}>
          <Form.Label column md={6}>
            <p className="order-create-text-step-2">Employee receive money:</p>
          </Form.Label>
          <Col md={6}>
            <Button className="order-create-button" onClick={() => handlePaymentStep2("cash")}>
              Use Cash
          </Button>
          </Col>
        </Form.Group>
        {hideCreditButton ? (<></>) : (
          <Form.Group as={Row}>
            <Form.Label column md={6}>
              <p className="order-create-text-step-2">Customer credit:</p>
            </Form.Label>
            <Col md={6}>
              <Button className="order-create-button" onClick={() => handlePaymentStep2("credit")}>
                Use Credit
              </Button>
            </Col>
          </Form.Group>
        )}
      </AdminLayout>
    )
  } else if (paymentConfirmed === false){
    return (
      <AdminLayout>
        <p className="order-create-header-1">Please click this button with your carefulness!</p>
        <div className="order-create-align-center">
          <Button className="order-create-button-step-3" onClick={() => handlePaymentStep3()}>
            Payment confirm
          </Button>
        </div>
      </AdminLayout>
    )
  } else {
    return (
      <AdminLayout>
      <p className="order-create-header-1">New order has been created and its payment has been processed!</p>
      <div className="order-create-align-center">
        <Button className="order-create-button-confirmed" onClick={() => history.push("/order/list")}>
          Order list
        </Button>
      </div>
    </AdminLayout>
    )
   
  }
}

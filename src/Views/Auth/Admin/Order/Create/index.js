import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

import { LONGSHIPCOLUMNS, TRANSPORTTYPECOLUMNS } from "./columns";
import { TableSelect } from "../../../../../Components/Table/TableSelect";
import { faTruckMonster } from "@fortawesome/free-solid-svg-icons";

export default function OrderCreate() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [isLoading, setIsLoading] = useState(true);
  const [transportTypes, setTransportTypes] = useState([]);
  const [longShips, setLongShips] = useState([]);

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
    weight: 0,
    volume: 0,
    type: "",
    customer_send_id: 0,
    customer_receive_id: 0,
    sender: "",
    receiver: "",
    transport_type_id: 0,
    detail: "",
    note: "",
    use_long_ship: true,
    long_ship_id: 0,
    short_ship_distance: 0,
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
    console.log(event)
    const { name, value, valueAsNumber } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: valueAsNumber || value };
    });
  };

  const handleSubmit = (e) => {
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
          return Promise.reject(res.json());
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch((err) => {
        console.log(err);
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

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <p className="customer-create-header">Create Order </p>
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

          <Form.Group as={Row} controlId="formHorizoantwf2al4aeq">
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

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 2 }}>
              <Button className="btn-6" type="submit">
                Create
            </Button>
            </Col>

            <Col sm={{ span: 1 }}>
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
  }
}

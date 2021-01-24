import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

export default function TransportTypeDetail() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

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
    total_price: 0,
    use_long_ship: false,
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
  const total_price = state.total_price;
  const use_long_ship = state.use_long_ship;
  const long_ship_id = state.long_ship_id;
  const short_ship_distance = state.short_ship_distance;

  useEffect(() => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      credentials: "include",
    };

    fetch(`/api/order/id/${id}`, requestOptions)
      .then((res) => {
        setIsLoading(false);
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setState(json.order_info);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <p className="customer-detail-header">Order detail</p>
        <Form className="content">

        <Form.Group as={Row} controlId="formHorizontal2">
            <Form.Label column sm={2}>ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalID1">
            <Form.Label column sm={2}>Weight</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={weight} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal2">
            <Form.Label column sm={2}>volume</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={volume} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizodntal3">
            <Form.Label column sm={2}>Type</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={type} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row} controlId="formHorizonstal4">
            <Form.Label column sm={2}>Customer send ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={customer_send_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizonatal4aq">
            <Form.Label column sm={2}>Customer receive ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={customer_receive_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizoantal45q">
            <Form.Label column sm={2}>Sender</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={sender} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorigzontal4aq">
            <Form.Label column sm={2}>Receiver</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={receiver} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row} controlId="formHorizoantwal4aeq">
            <Form.Label column sm={2}>Transport type ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={transport_type_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizgontwafrl4afq">
            <Form.Label column sm={2}>Detail</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={detail} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizonrtafafq">
            <Form.Label column sm={2}>Note</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={note} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizwontafffafq">
            <Form.Label column sm={2}>Total price</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={total_price} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row} controlId="formHotyrirzontafffafq">
            <Form.Label column sm={2}>Use long ship</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={use_long_ship} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizwonffafq">
            <Form.Label column sm={2}>Long ship ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={long_ship_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontaerfffafq">
            <Form.Label column sm={2}>Short ship distance</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={short_ship_distance} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 2 }}>
              <Button
                className="btn-7"
                onClick={() => history.push("/order/list")}
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

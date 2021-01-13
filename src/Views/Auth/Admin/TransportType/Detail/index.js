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
    same_city: false,
    location_one: "",
    location_two: "",
    bus_station_from: "",
    bus_station_to: "",
    long_ship_duration: 0,
    long_ship_price: 0,
    short_ship_price_per_km: 0,
  });
  const same_city = state.same_city;
  const location_one = state.location_one;
  const location_two = state.location_two;
  const bus_station_from = state.bus_station_from;
  const bus_station_to = state.bus_station_to;
  const long_ship_duration = state.long_ship_duration;
  const long_ship_price = state.long_ship_price;
  const short_ship_price_per_km = state.short_ship_price_per_km;

  useEffect(() => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      credentials: "include",
    };

    fetch(`/api/transport-type/id/${id}`, requestOptions)
      .then((res) => {
        setIsLoading(false);
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setState(json.transport_type_info);
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
        <p className="transport-type-detail-header">Transport Type detail</p>
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
              Same City
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={same_city} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAge">
            <Form.Label column sm={2}>
              Location one
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={location_one} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhone">
            <Form.Label column sm={2}>
              Location two
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={location_two} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddress">
            <Form.Label column sm={2}>
              Bus station from
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={bus_station_from} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPoint">
            <Form.Label column sm={2}>
              Bus station to
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={bus_station_to} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPoint">
            <Form.Label column sm={2}>
              Long ship duration
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={long_ship_duration} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPoint">
            <Form.Label column sm={2}>
              Long ship price
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={long_ship_price} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPoint">
            <Form.Label column sm={2}>
              Short ship price per Km
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={short_ship_price_per_km} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 2 }}>
              <Button
                className="btn-7"
                onClick={() => history.push("/transport-type/list")}
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

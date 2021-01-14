import React, { useState } from "react";
import "./index.css";
import { Button, Form, Col, Row, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import AdminLayout from "../../../../Layouts/AdminLayout";

export default function TransportTypeCreate() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const clearNotify = () => {
    setSuccessMessage("");
    setErrorMessage("")
  }


  const [state, setState] = useState({
    same_city: true,
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

  const handleChange = (event) => {
    console.log(event)
    const { name, value, valueAsNumber } = event.target;
    if (name === "same_city") {
      // Remove all long ship info when same_city change state (change from long ship to short ship)
      if (value === "true") {
        setState((prevState) => {
          return {
            ...prevState,
            location_two: "",
            bus_station_from: "",
            bus_station_to: "",
            long_ship_duration: 0,
            long_ship_price: 0,
            [name]: true
          };
        });
      } else {
        setState((prevState) => {
          return { ...prevState, [name]: false };
        });
      }
    } else {
      setState((prevState) => {
        return { ...prevState, [name]: valueAsNumber || value };
      });
    }
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

    return fetch("/api/transport-type/create", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then(data => setSuccessMessage(data.server_response))
      .catch((err) => {
        setErrorMessage(err);
      });

  };

  const LongShipInput = () => {
    return (
      <fieldset>
        <Form.Group as={Row} controlId="formHorizontalLocationTwo">
          <Form.Label column sm={2}>
            Location two
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="location_two"
              placeholder="Location two"
              value={location_two}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalBusStationFrom">
          <Form.Label column sm={2}>
            Bus station from
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="bus_station_from"
              placeholder="Bus station from"
              value={bus_station_from}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalBusStationTo">
          <Form.Label column sm={2}>
            Bus station to
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="bus_station_to"
              placeholder="Bus station to"
              value={bus_station_to}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalLongShipDuration">
          <Form.Label column sm={2}>
            Long ship duration
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="long_ship_duration"
              placeholder="Long ship duration"
              value={long_ship_duration}
              onChange={handleChange}
              required
              min="86400"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalLongShipPrice">
          <Form.Label column sm={2}>
            Long ship price
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="long_ship_price"
              placeholder="Long ship price"
              value={long_ship_price}
              onChange={handleChange}
              required
              min="100000"
            />
          </Col>
        </Form.Group>
      </fieldset>
    );
  }

  return (
    <AdminLayout>
      <p className="customer-create-header">Create transport type</p>

      {successMessage !== "" ? (<Alert key={3} variant="success">Server response: {successMessage}</Alert>) : (<></>)}
      {errorMessage !== "" ? (<Alert key={3} variant="danger">Server response: {errorMessage}</Alert>) : (<></>)}

      <Form className="content" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group as={Row} controlId="formHorizontalSameCity">
          <Form.Label column sm={2}>
            Same city
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              inline
              type="radio"
              label="Yes (Short Ship)"
              value="true"
              name="same_city"
              id="genderRadios1"
              onChange={handleChange}
              checked={same_city === true}
            />
            <Form.Check
              inline
              type="radio"
              label="No (Long Ship)"
              value="false"
              name="same_city"
              id="genderRadios2"
              onChange={handleChange}
              checked={same_city === false}
            />
          </Col>
        </Form.Group>
        <hr />
        <Form.Group as={Row} controlId="formHorizontalLocationOne">
          <Form.Label column sm={2}>
            Location one
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="location_one"
              placeholder="Location one"
              value={location_one}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        {same_city ? (<></>) : (LongShipInput())}
        <Form.Group as={Row} controlId="formHorizontalShortShipPricePerKm">
          <Form.Label column sm={2}>
            Short ship price per Km
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="short_ship_price_per_km"
              placeholder=" Short ship price per Km"
              value={short_ship_price_per_km}
              onChange={handleChange}
              required
              min="10000"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 1, offset: 2 }}>
            <Button className="btn-6" type="submit">
              Create
            </Button>
          </Col>

          <Col sm={{ span: 1 }}>
            <Button className="btn-7" onClick={() => history.push("/transport-type/list")}>
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </AdminLayout>
  );
}

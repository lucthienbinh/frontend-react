import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Button, Form, Col, Row, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

export default function LongShipDetail() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  const [state, setState] = useState({
    transport_type_id: 0,
    license_plate: "",
    estimated_time_of_departure: 0,
    estimated_time_of_arrival: 0,
    current_location
    current_location
    current_location
    current_location
    current_location
    current_location

    current_location
    current_location
    current_location
    current_location
    current_location
    current_location
    current_location
    current_location
    current_location
    current_location

    
  });
  const transport_type_id = state.transport_type_id;
  const license_plate = state.license_plate;
  const estimated_time_of_departure = state.estimated_time_of_departure;
  const estimated_time_of_arrival = state.estimated_time_of_arrival;
  const current_location = state.current_location;
  const finished = state.finished;
  const ls_qr_code = state.ls_qr_code;

  // Package Loaded
  const package_loaded = state.package_loaded;
  const empl_load_id = state.empl_load_id;
  const loaded_time = state.loaded_time;
  // Vehicle Started
  const vehicle_started = state.vehicle_started;
  const empl_driver_1_id = state.empl_driver_1_id;
  const started_time = state.started_time;
  // Vehicle Arrived
  const vehicle_arrived = state.vehicle_arrived;
  const empl_driver_2_id = state.empl_driver_2_id;
  const arrived_time = state.arrived_time;
  // Package Unloaded
  const package_unloaded = state.package_unloaded;
  const empl_unload_id = state.empl_unload_id;
  const unloaded_time = state.unloaded_time;

  useEffect(() => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      credentials: "include",
      
    };

    fetch(`/api/long-ship/id/${id}`, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setState(json.employee_info);
        setIsLoading(false);
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
        <p className="customer-detail-header">Long ship detail</p>
        <Form className="content">
          <Form.Group as={Row} controlId="formHorizontalID">
            <Form.Label column sm={2}>
              Avatar
            </Form.Label>
            <Col sm={10}>
              <Image className="employee-avatar" src={process.env.REACT_APP_API_IMAGE_URL + "/" + avatar} rounded />
            </Col>
          </Form.Group>

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
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={name} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAge">
            <Form.Label column sm={2}>
              Age
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={age} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPhone">
            <Form.Label column sm={2}>
              Phone
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={phone} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalGender">
            <Form.Label column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={gender} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddress">
            <Form.Label column sm={2}>
              Address
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={address} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalIdentityCard">
            <Form.Label column sm={2}>
              Identity card
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={identity_card} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmployeeTypeName">
            <Form.Label column sm={2}>
              Employee type name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={employee_type_name} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDeliveryLocationCity">
            <Form.Label column sm={2}>
              Delivery location city
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={delivery_location_city} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDeliveryLocationDistrict">
            <Form.Label column sm={2}>
              Delivery location district
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={delivery_location_district} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 2 }}>
              <Button
                className="btn-7"
                onClick={() => history.push("/employee/list")}
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

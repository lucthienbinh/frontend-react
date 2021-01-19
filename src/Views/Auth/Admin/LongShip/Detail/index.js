import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Button, Form, Col, Row, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import AdminLayout from "../../../../Layouts/AdminLayout";
import Loading from "../../../../Loading";

import { format } from 'date-fns'

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
    current_location: "",
    finished: false,
    ls_qr_code: "",
    package_loaded: false,
    empl_load_id: 0,
    loaded_time: 0,
    vehicle_started: false,
    empl_driver_1_id: 0,
    started_time: 0,
    vehicle_arrived: false,
    empl_driver_2_id: 0,
    arrived_time: 0,
    package_unloaded: false,
    empl_unload_id: 0,
    unloaded_time: 0,     
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
        setState(json.long_ship_info);
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
          <Form.Group as={Row} controlId="formHorizontalID1">
            <Form.Label column sm={2}>QR Code</Form.Label>
            <Col sm={10}>
              <Image className="qr-code" src={process.env.REACT_APP_API_ORCODE_URL + "/" + ls_qr_code} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal2">
            <Form.Label column sm={2}>ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal3">
            <Form.Label column sm={2}>Transport Type</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={transport_type_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal4">
            <Form.Label column sm={2}> Licens Plate</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={license_plate} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal5">
            <Form.Label column sm={2}>Time Of Departure</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={format(new Date(estimated_time_of_departure * 1000), 'dd/MM/yyyy')} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal6">
            <Form.Label column sm={2}>Time Of Arrival</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={format(new Date(estimated_time_of_arrival * 1000), 'dd/MM/yyyy')} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal7">
            <Form.Label column sm={2}>Current Location</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={current_location} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal20">
            <Form.Label column sm={2}>Finished</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={finished} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row} controlId="formHorizontal8">
            <Form.Label column sm={2}>Package Loaded</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={package_loaded} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal9">
            <Form.Label column sm={2}>Employee Load ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={empl_load_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal10">
            <Form.Label column sm={2}>Loaded Time</Form.Label>
            <Col sm={10}>
            <Form.Control type="text" value={format(new Date(loaded_time * 1000), 'dd/MM/yyyy HH:mm:ss')} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row} controlId="formHorizontal11">
            <Form.Label column sm={2}>Vehicle Started</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={vehicle_started} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal12">
            <Form.Label column sm={2}>Employee Driver 1 ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={empl_driver_1_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal13">
            <Form.Label column sm={2}>Started Time</Form.Label>
            <Col sm={10}>
            <Form.Control type="text" value={format(new Date(started_time * 1000), 'dd/MM/yyyy HH:mm:ss')} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row} controlId="formHorizontal14">
            <Form.Label column sm={2}>Vehicle Arrived</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={vehicle_arrived} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal15">
            <Form.Label column sm={2}>Employee Driver 2 ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={empl_driver_2_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal16">
            <Form.Label column sm={2}>Arrived Time</Form.Label>
            <Col sm={10}>
            <Form.Control type="text" value={format(new Date(arrived_time * 1000), 'dd/MM/yyyy HH:mm:ss')} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row} controlId="formHorizontal17">
            <Form.Label column sm={2}>Package Unloaded</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={package_unloaded} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal18">
            <Form.Label column sm={2}>Employee Unload ID</Form.Label>
            <Col sm={10}>
              <Form.Control type="number" value={empl_unload_id} disabled={true} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontal19">
            <Form.Label column sm={2}>Unloaded Time</Form.Label>
            <Col sm={10}>
            <Form.Control type="text" value={format(new Date(unloaded_time * 1000), 'dd/MM/yyyy HH:mm:ss')} disabled={true} />
            </Col>
          </Form.Group>

          <hr/>

          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 2 }}>
              <Button
                className="btn-7"
                onClick={() => history.push("/long-ship/list")}
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

import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { format } from 'date-fns'

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";
import { TableSelect } from "../../../../../Components/Table/TableSelect";

import { TRANSPORTTYPECOLUMNS } from "./columns";

export default function LongShipCreate() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  const [isLoading, setIsLoading] = useState(true);
  const [transportTypes, setTransportTypes] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  
  const clearNotify = () => {
    setSuccessMessage("");
    setErrorMessage("")
  }

  const [state, setState] = useState({
    transport_type_id: 0,
    transport_type_duration: 0,
    license_plate: "51A-12345",
    estimated_time_of_departure: Math.floor(new Date().getTime()/1000),
    estimated_time_of_arrival:  Math.floor(new Date().getTime()/1000),
  });

  useEffect(() => {
    fetchCreateFormData();
    // eslint-disable-next-line
  }, [])

  const transport_type_id = state.transport_type_id;
  const transport_type_duration = state.transport_type_duration;
  const license_plate = state.license_plate;
  const estimated_time_of_departure = state.estimated_time_of_departure;
  const estimated_time_of_arrival = state.estimated_time_of_arrival;

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

    return await fetch("/api/long-ship/create-form-data", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setTransportTypes(json.transport_type_list);
        console.log(Math.floor(new Date().getTime()/1000));
        console.log(new Date().getTime());
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    console.log(event)
    console.log(state)
    const { name, value, valueAsNumber, valueAsDate } = event.target;
    if ( name === "select_date_of_departure" ) {
      // Source: https://stackoverflow.com/a/7195589
      const startOfDay = new Date(valueAsDate.getFullYear(), valueAsDate.getMonth(), valueAsDate.getDate());
      const timestamp = startOfDay / 1000;
      setState((prevState) => {
        return { ...prevState, 
          estimated_time_of_departure: timestamp,
          estimated_time_of_arrival: timestamp + prevState.transport_type_duration,
        }
        ;
      });
    } else if (name === "select_time_of_departure" ) {
      const timestamp = valueAsNumber / 1000;
      setState((prevState) => {
        const prevDeptTime = new Date(prevState.estimated_time_of_departure * 1000);
        const startOfDay = new Date(prevDeptTime.getFullYear(), prevDeptTime.getMonth(), prevDeptTime.getDate());
        const startOfDayUnix = startOfDay / 1000;
        
        const newDeparture = startOfDayUnix + timestamp;
        const newArrival = startOfDayUnix + timestamp + transport_type_duration;
      return { ...prevState, estimated_time_of_departure: newDeparture, estimated_time_of_arrival: newArrival};
      });
    } else {
      setState((prevState) => {
      return { ...prevState, [name]: valueAsNumber || value };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.transport_type_id === 0) {
      setErrorMessage("Please select the transport info in the below table")
      return
    }
    clearNotify()
    
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

    return fetch("/api/long-ship/create", requestOptions)
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

  const actionLink = {
    handleSelectItem: (e) => {
      clearNotify()
      console.log(e)
      setState((prevState) => {
        console.log(prevState)
        return {
          ...prevState,
          transport_type_duration: e.long_ship_duration,
          transport_type_id: e.id,
          estimated_time_of_arrival: prevState.estimated_time_of_departure + e.long_ship_duration,
        };
      });
    },
  };

  if (isLoading) {
    return <Loading />;
  } else {
  return (
    <AdminLayout>
      <p className="employee-create-header">Create long ship</p>
      <Form className="content" onSubmit={(e) => handleSubmit(e)}>
      {successMessage !== "" ? ( <Alert key={3} variant="success">Server response: {successMessage}</Alert>) : (<></>)}
      {errorMessage !== "" ? ( <Alert key={3} variant="danger">Server response: {errorMessage}</Alert>) : (<></>)}
      <Form.Group as={Row} controlId="formHorizontal1">
          <Form.Label column sm={2}>
            License Plate
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="license_plate"
              placeholder="License plate"
              value={license_plate}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontal2">
          <Form.Label column sm={2}>
            Transport Type ID
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="transport_type_id"
              placeholder="Select ID in the table"
              value={transport_type_id}
              required
              disabled={true}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorfizontal4">
          <Form.Label column sm={2}>
            Duration (days)
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="transport_type_duration"
              placeholder="Select ID in the table"
              value={Math.floor(transport_type_duration / 86400)}
              required
              disabled={true}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizodntal5">
          <Form.Label column sm={2}>
            Select departure date 
          </Form.Label>
          <Col sm={10}>
          <Form.Control
              type="date"
              name="select_date_of_departure"
              value={format(new Date(estimated_time_of_departure * 1000), 'yyyy-MM-dd')} 
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHforizontal5">
          <Form.Label column sm={2}>
            Select departure time 
          </Form.Label>
          <Col sm={10}>
          <Form.Control
              type="time"
              name="select_time_of_departure"
              value={format(new Date(estimated_time_of_departure * 1000), 'HH:mm:ss')} 
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontal6">
          <Form.Label column sm={2}>
            Arrival time 
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="estimated_time_of_arrival"
              value={format(new Date(estimated_time_of_arrival * 1000), 'MM/dd/yyyy HH:mm:ss')}
              onChange={handleChange}
              required
              disabled={true}
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
            <Button className="btn-7" onClick={() => history.push("/long-ship/list")}>
              Cancel
            </Button>
          </Col>

        </Form.Group>
      </Form>
      <hr/>
        <div>
          <p className="long-ship-list-header">Transport type list</p>
        </div>
        <TableSelect columns={TRANSPORTTYPECOLUMNS} data={transportTypes} actionLink={actionLink}/>
    </AdminLayout>
  );
  }
}

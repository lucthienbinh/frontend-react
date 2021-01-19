import React, { useState, useEffect } from "react";
import "./index.css";
import { Card, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

import { TableLink } from "../../../../../Components/Table/TableLink";
import { LONGSHIPCOLUMNS, TRANSPORTTYPECOLUMNS } from "./columns";

export default function LongShipList() {
  const [cookies] = useCookies(["csrf"]);

  const [longShips, setLongShips] = useState([]);
  const [transportTypes, setTransportTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [longShipTotal, setLongShipTotal] = useState(0);
  const [availableTotal, setAvailableTotal] = useState(0);
  const [readyTotal, setReadyTotal] = useState(0);
  const [runningTotal, setRunningTotal] = useState(0);
  const [finishedTotal, setFinishedTotal] = useState(0);

  useEffect(() => {
    fetchLongShipList();
    // eslint-disable-next-line
  }, []);

  const fetchLongShipList = async (URLString) => {
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
    const newURL = URLString || "/api/long-ship/list";
    return await fetch(newURL, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setLongShips(json.long_ship_list);
        setTransportTypes(json.transport_type_list);
        setLongShipTotal(json.long_ship_total);
        setReadyTotal(json.ready_total);
        setAvailableTotal(json.available_total);
        setRunningTotal(json.running_total);
        setFinishedTotal(json.finished_total);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (deleteLinkAPI) => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      
      credentials: "include",
      method: "DELETE",
    };

    fetch(deleteLinkAPI, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        return fetchLongShipList();
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  const actionLink = {
    detailLink: "/long-ship/detail/",
    updateLink: "/long-ship/update/",
    deleteLink: "/api/long-ship/delete/",
    handleDelete,
  };

  const Cards = () => {
    return (
      <Row>
        <Col>
          <Card border="primary" style={{ width: '10rem', margin: '1rem' }}>
            <Card.Header>Total</Card.Header>
            <Card.Body>
            <Card.Link href="#" onClick={() => fetchLongShipList()}>{longShipTotal} long ship(s).</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="info" style={{ width: '10rem', margin: '1rem' }}>
            <Card.Header>Available (wait)</Card.Header>
            <Card.Body>
              <Card.Link href="#" onClick={() => fetchLongShipList("/api/long-ship/list?sortByCondition=available")}>{availableTotal} long ship(s).</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="info" style={{ width: '10rem', margin: '1rem' }}>
            <Card.Header>Ready to run</Card.Header>
            <Card.Body>
              <Card.Link href="#" onClick={() => fetchLongShipList("/api/long-ship/list?sortByCondition=ready")}>{readyTotal} long ship(s).</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="success" style={{ width: '10rem', margin: '1rem' }}>
            <Card.Header>Running</Card.Header>
            <Card.Body>
              <Card.Link href="#" onClick={() => fetchLongShipList("/api/long-ship/list?sortByCondition=running")}>{runningTotal} long ship(s).</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="dark" style={{ width: '10rem', margin: '1rem' }}>
            <Card.Header>Finished</Card.Header>
            <Card.Body>
            <Card.Link href="#" onClick={() => fetchLongShipList("/api/long-ship/list?sortByCondition=finished")}> {finishedTotal} long ship(s).</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <p className="long-ship-list-dashboard">Long ship dashboard</p>
        {Cards()}
        <hr/>
        <div>
          <Link to={'/long-ship/create'} className="btn long-ship-list-create-button">Create</Link>
        </div>
        <TableLink columns={LONGSHIPCOLUMNS} data={longShips} actionLink={actionLink} />
        <hr/>
        <div>
          <p className="long-ship-list-header">Transport type list</p>
        </div>
        <TableLink columns={TRANSPORTTYPECOLUMNS} data={transportTypes} actionLink={actionLink}/>
      </AdminLayout>
    );
  }
}

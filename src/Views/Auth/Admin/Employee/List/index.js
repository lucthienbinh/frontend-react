import React, { useState, useEffect } from "react";
import "./index.css";
import { Card, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

import { TableLink } from "../../../../../Components/Table/TableLink";
import { COLUMNS } from "./columns";

export default function EmployeeList() {
  const [cookies] = useCookies(["csrf"]);

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [inputStaffTotal, setInputStaffTotal] = useState(0);
  const [deliveryStaffTotal, setDeliveryStaffTotal] = useState(0);
  const [loadPackageStaffTotal, setLoadPackageStaffTotal] = useState(0);

  useEffect(() => {
    fetchEmployeeList();
    // eslint-disable-next-line
  }, []);

  const fetchEmployeeList = async () => {
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

    return await fetch("/api/employee/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setEmployees(json.employee_list);
        setInputStaffTotal(json.input_staff_total);
        setDeliveryStaffTotal(json.delivery_staff_total);
        setLoadPackageStaffTotal(json.load_package_staff_total);
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
        return fetchEmployeeList();
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  const actionLink = {
    detailLink: "/employee/detail/",
    updateLink: "/employee/update/",
    deleteLink: "/api/employee/delete/",
    handleDelete: handleDelete,
  };

  const Cards = () => {
    return (
      <Row>
        <Col>
          <Card border="primary" style={{ width: '13rem', margin: '1rem' }}>
            <Card.Header>Total</Card.Header>
            <Card.Body>
              <Card.Text>
                {employees.length} employee(s).
            </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="success" style={{ width: '13rem', margin: '1rem' }}>
            <Card.Header>Input staff</Card.Header>
            <Card.Body>
              <Card.Text>
                {inputStaffTotal} employee(s).
            </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="danger" style={{ width: '13rem', margin: '1rem' }}>
            <Card.Header>Delivery staff</Card.Header>
            <Card.Body>
              <Card.Text>
              {deliveryStaffTotal} employee(s).
          </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card border="info" style={{ width: '13rem', margin: '1rem' }}>
            <Card.Header>Load package staff</Card.Header>
            <Card.Body>
              <Card.Text>
              {loadPackageStaffTotal} employee(s).
          </Card.Text>
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
        {Cards()}
        <div>
          <p className="employee-list-header">Employee list</p>
          <Link to={'/employee/create'} className="btn employee-list-create-button">Create</Link>
        </div>
        <TableLink columns={COLUMNS} data={employees} actionLink={actionLink} />
      </AdminLayout>
    );
  }
}

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function EmployeeCard(props) {
  let detailLink = "/employee/detail/" + props.employee.id;
  let updateLink = "/employee/update/" + props.employee.id;
  let deleteLinkAPI = "/api/employee/delete/" + props.employee.id;
  return (
    <div>
      <p>ID: {props.employee.id}</p>
      <p>Name: {props.employee.name}</p>
      <p>Age: {props.employee.age}</p>
      <p>Phone: {props.employee.phone}</p>
      <p>Gender: {props.employee.gender}</p>
      <p>Address: {props.employee.address}</p>
      <p>Point: {props.employee.point}</p>
      <Link to={detailLink} className="btn btn-1">
        Detail
      </Link>
      <Link to={updateLink} className="btn btn-2">
        Update
      </Link>
      <Button className="btn btn-3" onClick={() => props.handleDelete(deleteLinkAPI)}>
        Delete
      </Button>
      <hr></hr>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function CustomerCard(props) {
  let updateLink = "/customer/update/" + props.customer.id;
  let deleteLinkAPI = "/api/customer/delete/" + props.customer.id;
  return (
    <div>
      <p>ID: {props.customer.id}</p>
      <p>Name: {props.customer.name}</p> 
      <p>Age: {props.customer.age}</p>
      <p>Phone: {props.customer.phone}</p>
      <p>Gender: {props.customer.gender}</p>
      <p>Address: {props.customer.address}</p>
      <p>Point: {props.customer.point}</p>
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

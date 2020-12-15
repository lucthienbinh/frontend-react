import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";
import { Button } from "react-bootstrap";

import { TableModal } from "../../../../../Components/Table/TableModal";
import { COLUMNS } from "./columns";

import LocationModal from "../../../../../Components/Modal/Location";

export default function LocationList() {
  const [cookies] = useCookies(["csrf"]);

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const fetchCustomerList = async () => {
    setIsLoading(true);
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
      },
      credentials: "include",
    };

    return await fetch("/api/delivery-location/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setLocations(json.delivery_location_list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let locationModal = null;

  const handleDetail = (ID) => {
    console.log(modalIsOpen);
    setModalIsOpen(true);
    console.log(modalIsOpen);
    locationModal = locations.map((location) => {
      if (location.id === ID) {
        
        
      }
      return 1;
    });
  };

  const handleDelete = (deleteLinkAPI) => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
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
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });

    return fetchCustomerList();
  };

  const handleUpdate = (deleteLinkAPI) => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
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
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });

    return fetchCustomerList();
  };

  const actionLink = {
    handleDetail: handleDetail,
    handleUpdate: handleUpdate,
    deleteLink: "/api/delivery-location/delete/",
    handleDelete: handleDelete,
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <TableModal
          columns={COLUMNS}
          data={locations}
          actionLink={actionLink}
        />
        <Button onClick={() => setModalIsOpen(true)}></Button>
        <LocationModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
      </AdminLayout>
    );
  }
}

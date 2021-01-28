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
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);
1
  useEffect(() => {
    fetchLocationList();
    // eslint-disable-next-line
  }, []);

  const fetchLocationList = async () => {
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

    return await fetch( "/api/delivery-location/list", requestOptions
    )
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

  const buttonCreate = (id) => {
    setDisabledInput(false);
    setModalIsOpen(true);
    setLocation(undefined);
  };

  const buttonDetail = (id) => {
    setDisabledInput(true);
    setModalIsOpen(true);
    locations.map((location) => {
      if (location.id === id) {
        setLocation(location);
      }
      return 1;
    });
  };

  const buttonUpdate = (id) => {
    setDisabledInput(false);
    setModalIsOpen(true);
    locations.map((location) => {
      if (location.id === id) {
        setLocation(location);
      }
      return 1;
    });
  };

  const buttonDelete = (id) => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
      },
      
      credentials: "include",
      method: "DELETE",
    };


    fetch("/api/delivery-location/delete/" + id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return fetchLocationList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitCreate = (locationModal) => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      
      credentials: "include",
      method: "POST",
      body: JSON.stringify(locationModal),
    };

    fetch("/api/delivery-location/create", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return fetchLocationList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitUpdate = (locationModal) => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(locationModal),
    };

    fetch("/api/delivery-location/update/" + locationModal.id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return fetchLocationList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tableButton = {
    buttonDetail: buttonDetail,
    buttonUpdate: buttonUpdate,
    buttonDelete: buttonDelete,
  };

  const modalButton = {
    submitCreate: submitCreate,
    submitUpdate: submitUpdate,
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>
          <p className="location-list-header">Delivery location list</p>
          <Button
            className="location-list-create-button"
            onClick={buttonCreate}
          >
            Create
          </Button>
        </div>
        <TableModal
          columns={COLUMNS}
          data={locations}
          tableButton={tableButton}
        />
        <LocationModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          location={location}
          disabledInput={disabledInput}
          modalButton={modalButton}
        />
      </AdminLayout>
    );
  }
}

import React, { useState, useEffect } from "react";
import "./index.css";
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

  useEffect(() => {
    fetchLongShipList();
    // eslint-disable-next-line
  }, []);

  const fetchLongShipList = async () => {
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

    return await fetch("/api/long-ship/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setLongShips(json.long_ship_list);
        setTransportTypes(json.transport_type_list);
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

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>
          <p className="long-ship-list-header">Long ship list</p>
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

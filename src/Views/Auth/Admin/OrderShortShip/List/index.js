import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

import { TableLink } from "../../../../../Components/Table/TableLink";
import { COLUMNS } from "./columns";

export default function OrderShortShipList() {
  const [cookies] = useCookies(["csrf"]);

  const [orderShortShips, setOrderShortShips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line
  }, []);

  const fetchOrderList = async () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      
      credentials: "include",
      method: "GET",
    };

    return await fetch("/api/order-short-ship/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setOrderShortShips(json.order_short_ship_list);
        console.log(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionLink = {
    detailLink: "/order-short-ship/update/",
    updateLink: "/order-short-ship/update/",
    deleteLink: "/",
    handleDelete: () => console.log("a")
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>
          <p className="order-list-header">Order short ship list</p>
        </div>
        <TableLink columns={COLUMNS} data={orderShortShips} actionLink={actionLink} />
      </AdminLayout>
    );
  }
}

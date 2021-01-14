import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

import { TableLink } from "../../../../../Components/Table/TableLink";
import { ORDER_PAY_COLUMNS, COLUMNS } from "./columns";

export default function OrderList() {
  const [cookies] = useCookies(["csrf"]);

  const [orders, setOrders] = useState([]);
  const [orderPays, setOrderPays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrderList();
    // eslint-disable-next-line
  }, []);

  const fetchOrderList = async () => {
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

    return await fetch("/api/order/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json)
        setOrders(json.order_info_list);
        setOrderPays(json.order_pay_list)
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
        return fetchOrderList();
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  const actionLink = {
    detailLink: "/order/detail/",
    updateLink: "/order/update/",
    deleteLink: "/api/order/delete/",
    handleDelete,
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>
          <p className="order-list-header">Order information list</p>
          <Link to={'/order/create'} className="btn transport-type-list-create-button">Create</Link>
        </div>
        <TableLink columns={COLUMNS} data={orders} actionLink={actionLink} />
        <hr/>
        <div>
          <p className="order-list-header">Order payment list</p>
        </div>
        <TableLink columns={ORDER_PAY_COLUMNS} data={orderPays} actionLink={actionLink} />
      </AdminLayout>
    );
  }
}

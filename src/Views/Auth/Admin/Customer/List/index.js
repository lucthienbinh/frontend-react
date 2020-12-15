import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

import { TableLink } from "../../../../../Components/Table/TableLink";
import { COLUMNS } from "./columns";

export default function CustomerList() {
  const [cookies] = useCookies(["csrf"]);

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    return await fetch("/api/customer/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setCustomers(json.customer_list);
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
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
      });

    return fetchCustomerList();
  };

  const actionLink = {
    detailLink: "/customer/detail/",
    updateLink: "/customer/update/",
    deleteLink: "/api/customer/delete/",
    handleDelete: handleDelete,
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>
          <p className="customer-list-header">Customer list</p>
          <Link to={'/customer/create'} className="btn customer-list-create-button">Create</Link>
        </div>
        <TableLink columns={COLUMNS} data={customers} actionLink={actionLink} />
      </AdminLayout>
    );
  }
}

import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";

import CustomerCard from "../../../../../Components/Card/Customer";
import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

export default function EmployeeList() {
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
      setIsLoading(false);
      if (res.status !== 200) {
        return Promise.reject("Bad request sent to server!");
      }
      return res.json();
    })
    .then((json) => {
      setCustomers(json.customer_list);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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

  const customerCards = customers.map((customer, index) => (
    <CustomerCard key={index} customer={customer} handleDelete={handleDelete}/>
  ));

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>{customerCards}</div>
      </AdminLayout>
    );
  }
}

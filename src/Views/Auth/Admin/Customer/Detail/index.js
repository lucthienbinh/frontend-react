import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import AdminLayout from "../../../../Layouts/AdminLayout";
import CustomerCard from "../../../../../Components/Card/Customer";
import Loading from "../../../../Loading";

export default function CustomerDetail() {
  const [cookies] = useCookies(["csrf"]);

  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
      },
      credentials: "include",
    };

    fetch("/api/customer/id/" + id, requestOptions)
      .then((res) => {
        setIsLoading(false);
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then(json => {
        setCustomer(json.customer_info);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <CustomerCard customer={customer} />
      </AdminLayout>
    );
  }
}

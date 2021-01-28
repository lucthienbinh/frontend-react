import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

import { TableModal } from "../../../../../Components/Table/TableModal";
import { COLUMNS } from "./columns";

import CustomerCreditModal from "../../../../../Components/Modal/CustomerCredit";

export default function CustomerCreditList() {
  const [cookies] = useCookies(["csrf"]);

  const [customerCredits, setCustomerCredits] = useState([]);
  const [customerCredit, setCustomerCredit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchCustomerCreditList();
    // eslint-disable-next-line
  }, []);

  const fetchCustomerCreditList = async () => {
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

    return await fetch("/api/customer-credit/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setCustomerCredits(json.customer_credit_list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buttonUpdate = (id) => {
    setModalIsOpen(true);
    customerCredits.map((customerCredit) => {
      if (customerCredit.id === id) {
        setCustomerCredit(customerCredit);
      }
      return 1;
    });
  };

  const submitUpdate = (customerCreditModal) => {
    let formData = new FormData();
    formData.append("account_balance", customerCreditModal.account_balance);
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      
      credentials: "include",
      method: "PUT",
      body: formData,
    };

    fetch("/api/customer-credit/update/balance/" + customerCreditModal.id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return fetchCustomerCreditList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalButton = {
    submitUpdate: submitUpdate,
  };

  const tableButton = {
    buttonDetail: () => console.log(1),
    buttonUpdate: buttonUpdate,
    buttonDelete: () => console.log(1),
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>
          <p className="customer-credit-list-header">Customer credit list</p>
        </div>
        <TableModal columns={COLUMNS} data={customerCredits} tableButton={tableButton} />
        <CustomerCreditModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          customerCredit={customerCredit}
          modalButton={modalButton}
        />
      </AdminLayout>
    );
  }
}
import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

import { TableLink } from "../../../../../Components/Table/TableLink";
import { COLUMNS } from "./columns";

export default function EmployeeList() {
  const [cookies] = useCookies(["csrf"]);

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = async () => {
    setIsLoading(true);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      mode: "cors",
      credentials: "include",
      method: "GET",
    };

    return await fetch(process.env.REACT_APP_API_URL+"/api/employee/list", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setEmployees(json.employee_list);
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
      mode: "cors",
      credentials: "include",
      method: "DELETE",
    };

    fetch(process.env.REACT_APP_API_URL + deleteLinkAPI, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        return fetchEmployeeList();
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  const actionLink = {
    detailLink: "/employee/detail/",
    updateLink: "/employee/update/",
    deleteLink: "/api/employee/delete/",
    handleDelete: handleDelete,
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <AdminLayout>
        <div>
          <p className="employee-list-header">Employee list</p>
          <Link to={'/employee/create'} className="btn employee-list-create-button">Create</Link>
        </div>
        <TableLink columns={COLUMNS} data={employees} actionLink={actionLink} />
      </AdminLayout>
    );
  }
}

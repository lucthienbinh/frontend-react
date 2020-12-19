import React, { useState, useEffect } from "react";
import "./index.css";
import { useCookies } from "react-cookie";
import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";
import { Button } from "react-bootstrap";

import { TableModal } from "../../../../../Components/Table/TableModal";
import { COLUMNS } from "./columns";

import EmployeeTypeModal from "../../../../../Components/Modal/EmployeeType";

export default function EmployeeTypeList() {
  const [cookies] = useCookies(["csrf"]);

  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeType, setEmployeeType] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [disabledInput, setDisabledInput] = useState(false);

  useEffect(() => {
    fetchEmployeeTypeList();
  }, []);

  const fetchEmployeeTypeList = async () => {
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

    return await fetch(
      process.env.REACT_APP_API_URL + "/api/employee-type/list",
      requestOptions
    )
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setEmployeeTypes(json.employee_type_list);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buttonCreate = (id) => {
    setDisabledInput(false);
    setModalIsOpen(true);
    setEmployeeType(undefined);
  };

  const buttonDetail = (id) => {
    setDisabledInput(true);
    setModalIsOpen(true);
    employeeTypes.map((employeeType1) => {
      if (employeeType1.id === id) {
        setEmployeeType(employeeType1);
      }
      return 1;
    });
  };

  const buttonUpdate = (id) => {
    setDisabledInput(false);
    setModalIsOpen(true);
    employeeTypes.map((employeeType1) => {
      if (employeeType1.id === id) {
        setEmployeeType(employeeType1);
      }
      return 1;
    });
  };

  const buttonDelete = (id) => {
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
      },
      mode: "cors",
      credentials: "include",
      method: "DELETE",
    };


    fetch(process.env.REACT_APP_API_URL + "/api/employee-type/delete/" + id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return fetchEmployeeTypeList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitCreate = (EmployeeTypeModal) => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      mode: "cors",
      credentials: "include",
      method: "POST",
      body: JSON.stringify(EmployeeTypeModal),
    };

    fetch(process.env.REACT_APP_API_URL + "/api/employee-type/create", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return fetchEmployeeTypeList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitUpdate = (EmployeeTypeModal) => {
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-Token": cookies.csrf,
      },
      mode: "cors",
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(EmployeeTypeModal),
    };

    fetch(process.env.REACT_APP_API_URL + "/api/employee-type/update/" + EmployeeTypeModal.id, requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return fetchEmployeeTypeList();
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
          <p className="employee-type-list-header">Employee type list</p>
          <Button
            className="employee-type-list-create-button"
            onClick={buttonCreate}
          >
            Create
          </Button>
        </div>
        <TableModal
          columns={COLUMNS}
          data={employeeTypes}
          tableButton={tableButton}
        />
        <EmployeeTypeModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          employeeType={employeeType}
          disabledInput={disabledInput}
          modalButton={modalButton}
        />
      </AdminLayout>
    );
  }
}

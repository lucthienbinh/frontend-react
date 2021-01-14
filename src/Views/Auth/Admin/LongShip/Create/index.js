import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

// Import both component for file upload
import bsCustomFileInput from 'bs-custom-file-input';

// Import both component for select
import Select from 'react-select'

import Loading from "../../../../Loading";
import AdminLayout from "../../../../Layouts/AdminLayout";

export default function EmployeeCreate() {
  const history = useHistory();
  const [cookies] = useCookies(["csrf"]);

  useEffect(() => {
    fetchCreateFormData();
    return () => {
      bsCustomFileInput.destroy()
    }
    // eslint-disable-next-line
  }, [])

  const [isLoading, setIsLoading] = useState(true);

  const [picture, setPicture] = useState([]);
  const [etOptions, setEtOptions] = useState([])
  const [dlOptions, setDlOptions] = useState([])
  const formRef = useRef();

  const [state, setState] = useState({
    email: "admin123@gmail.com",
    password: "1111111111",
    name: "employee Hai",
    address: "123 tran nao",
    phone: 909888999,
    age: 20,
    gender: "male",
    avatar: "",
    identity_card: "24873t2716653826325",
    employee_type_id: 2,
    delivery_location_id: 0,
  });

  const email = state.email;
  const password = state.password;
  const name = state.name;
  const address = state.address;
  const phone = state.phone;
  const age = state.age;
  const gender = state.gender;
  const identity_card = state.identity_card;

  const fetchCreateFormData = async () => {
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

    return await fetch("/api/employee/create-form-data", requestOptions)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject("Bad request sent to server!");
        }
        return res.json();
      })
      .then((json) => {
        setEtOptions(json.et_options);
        setDlOptions(json.dl_options);
        setIsLoading(false);
        bsCustomFileInput.init()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    if (typeof event.target !== "undefined") {
      const { name, value, valueAsNumber } = event.target;
      setState((prevState) => {
        return { ...prevState, [name]: valueAsNumber || value };
      });
    } else {
      const { name, value } = event;
      setState((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  const onChangePicture = e => {
    setPicture([...picture, e.target.files[0]]);
  };

  const resetForm = () => {
    formRef.current.reset()
    setPicture([]);
  };

  const submitImage = async () => {

    const config = {
      file: picture[0],
      maxSize: 300
    };
    const resizedImage = await ResizeImage(config)

    console.log(picture[0].name);
    let formData = new FormData();
    formData.append("file", resizedImage, picture[0].name);
    
    const requestOptions = {
      headers: {
        "X-CSRF-Token": cookies.csrf,
        Accept: "application/json",
      },
      
      credentials: "include",
      method: "POST",
      body: formData,
    };

    return await fetch("/api/employee/upload/image", requestOptions)
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject('Bad request sent to server!');
        }
        return res.json();
      })
      .then(async (data) => { 
        console.log(data.filename)
        // Keep in mind this a very dangerous way to change state of component!!!!!
        state.avatar = data.filename;
        setState((prevState) => {
          return { ...prevState, avatar: data.filename };
        });
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return submitImage()
      .then(() => {
        const requestOptions = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-Token": cookies.csrf,
          },
          
          credentials: "include",
          method: "POST",
          body: JSON.stringify(state),
        };
    
        return fetch("/api/employee/create", requestOptions);
      })
      .then((res) => {
        if (res.status !== 201) {
          return Promise.reject('Bad request sent to server!');
        }
        return res.json();
      })
      .then(data => console.log(data))
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loading />;
  } else {
  return (
    <AdminLayout>
      <p className="employee-create-header">Create employee</p>
      <Form ref={formRef} className="content" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group as={Row} controlId="formHorizontalAvatar">
          <Form.Label column sm={2}>
            Avatar
          </Form.Label>
          <Col sm={10}>
            <InputGroup>
              <Form.File
                name="file"
                id="custom-file"
                label="Select file"
                onChange={onChangePicture}
                accept="image/*"
                custom
                required
              />
              <InputGroup.Append>
                <Button className="btn btn-10" onClick={resetForm}>Remove</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
              minLength="10"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalAddress">
          <Form.Label column sm={2}>
            Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="address"
              placeholder="Address"
              value={address}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPhone">
          <Form.Label column sm={2}>
            Phone
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={handleChange}
              required
              min="100000000"
              max="9999999999"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalAge">
          <Form.Label column sm={2}>
            Age
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="age"
              value={age}
              onChange={handleChange}
              min="1"
              max="99"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalGender">
          <Form.Label as="book" column sm={2}>
            Gender
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Male"
              value="male"
              name="gender"
              id="genderRadios1"
              onChange={handleChange}
              checked={gender === "male"}
            />
            <Form.Check
              type="radio"
              label="Female"
              value="female"
              name="gender"
              id="genderRadios2"
              onChange={handleChange}
              checked={gender === "female"}
            />
            <Form.Check
              type="radio"
              label="Others"
              value="others"
              name="gender"
              id="genderRadios3"
              onChange={handleChange}
              checked={gender === "others"}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalIdentityCard">
          <Form.Label column sm={2}>
            Identity card
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="identity_card"
              placeholder="Identity Card"
              value={identity_card}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSelectEmployeeType">
          <Form.Label column sm={2}>Employee type</Form.Label>
          <Col sm={10}>
            <Select options={etOptions} onChange={handleChange} defaultValue={{ name: "employee_type_id" ,label: "Input staff", value: 2 }}/>
          </Col>

        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalSelectDeliveryLocation">
          <Form.Label column sm={2}>Delivery location</Form.Label>
          <Col sm={10}>
          <Select options={dlOptions} onChange={handleChange} />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 1, offset: 2 }}>
            <Button className="btn-6" type="submit">
              Create
            </Button>
          </Col>

          <Col sm={{ span: 1 }}>
            <Button className="btn-7" onClick={() => history.push("/employee/list")}>
              Cancel
            </Button>
          </Col>

        </Form.Group>
      </Form>
    </AdminLayout>
  );
  }
}

import React from 'react';
import './index.css';

import {
  Button,
  Container,
  Form,
  FormGroup,
} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import PublicLayout from '../../Layouts/PublicLayout'

export default function Login () {
  const history = useHistory();
  const [email, setEmail] = React.useState('admin@gmail.com');
  const [password, setPassword] = React.useState('12345678');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/user-auth/web/loginJSON', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then(() => history.push("/customer/list"));
  };

  return (
    <PublicLayout>
      <Container>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={() => setEmail()}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={() => setPassword()}
            />
          </Form.Group>
          <FormGroup>
            <Button color="primary" onClick={handleSubmit}>
              Login
            </Button>
            <Button color="secondary" href="/customer/list">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </PublicLayout>
  );
}
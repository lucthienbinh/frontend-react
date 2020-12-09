import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
        </Container>
      </div>
    );
  }
}

export default Home;
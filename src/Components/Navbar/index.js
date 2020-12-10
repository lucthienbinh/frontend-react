import React from "react";
import "./index.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default function NavBarContainer(props) {
  // props: links, isLogged, sticky
  let links = props.links !== undefined ? props.links : [];

  let loggedIn = props.loggedIn !== undefined ? true : false;

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">Move nice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {links.map((link, index) => {
              if (link.dropDown) {
                return (
                  <NavDropdown
                    key={index}
                    title={link.name}
                    id="basic-nav-dropdown"
                  >
                    {link.childrens.map((children, cIndex) => {
                      return (
                        <React.Fragment key={cIndex}>
                          <NavDropdown.Item href={children.href}>
                            {children.name}
                          </NavDropdown.Item>
                        </React.Fragment>
                      );
                    })}
                  </NavDropdown>
                );
              } else {
                return (
                  <Nav.Link key={index} href={link.href}>
                    {link.name}
                  </Nav.Link>
                );
              }
            })}
          </Nav>

          <Nav className="ml-auto">
            {loggedIn ? (
              <React.Fragment>
                <Nav.Link href="/notification">
                  <FontAwesomeIcon icon={faCoffee} />
                </Nav.Link>
                <Nav.Link href="/profile">Trang cá nhân</Nav.Link>
              </React.Fragment>
            ) : (
              <Nav.Link href="/login">Đăng nhập</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

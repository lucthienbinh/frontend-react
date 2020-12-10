import React from "react";
import "./index.css";

import Container from "react-bootstrap/Container";
import NavBar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer";

import AdminLinks from "../../../Components/Navbar/Links/AdminLinks";

export default function AdminLayout({ children }) {
  return (
    <>
      <NavBar links={AdminLinks} loggedIn />
      <div className="layout-container-parent">
        <Container className="layout-container-child">{children}</Container>
      </div>
      <Footer />
    </>
  );
}

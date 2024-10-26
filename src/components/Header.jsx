import React, { useEffect, useState } from "react";
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBBtn,
} from "mdb-react-ui-kit";
import AuthnComponent from "./AuthnComponent";
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    setUsername(storedUser?.username || "");
  }, []);

  const toggleNavbar = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <MDBNavbar expand="lg" dark bgColor="dark" style={{ marginBottom: "10px" }}>
      <MDBContainer>
        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={isOpen}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </MDBNavbarItem>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              <Link to="/candidates">
                <MDBBtn> Candidates </MDBBtn>
              </Link>
              <Link to="/orders">
                <MDBBtn> Orders </MDBBtn>
              </Link>
              <Link to="/addCandidate">
                <MDBBtn> Add Candidate </MDBBtn>
              </Link>
              <Link to="/messageTemplate">
                <MDBBtn> Messages </MDBBtn>
              </Link>
              <Link to="/createMessageTemplate">
                <MDBBtn> Create message </MDBBtn>
              </Link>
              <Link to="/items">
                <MDBBtn> Items </MDBBtn>
              </Link>
              <Link to="/filterAndSendMessage">
                <MDBBtn> Filter and send message </MDBBtn>
              </Link>
              <Link to="/expenses">
                <MDBBtn> Expenses </MDBBtn>
              </Link>
              <Link to="/employeeDetails">
                <MDBBtn> Employee Detail </MDBBtn>
              </Link>
              <Link to="/report">
                <MDBBtn> Report </MDBBtn>
              </Link>
            </div>
            <div className="ms-auto d-flex align-items-center">
              {username ? (
                <AuthnComponent />
              ) : (
                <Link to="/login" className="me-1">
                  <MDBBtn>Login</MDBBtn>
                </Link>
              )}
            </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;

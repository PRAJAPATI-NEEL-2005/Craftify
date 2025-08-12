import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Github, Image, MicFill, InfoCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppNavbar() {
  return (
    <Navbar expand="md" className="bg-light shadow-sm" sticky="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-primary fw-bold fs-4"
        >
          <span className="text-secondary">Craft</span>ify
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-md-center">
            <Nav.Link
              as={Link}
              to="/generate"
              className="d-flex align-items-center text-dark me-md-1 px-3 py-1 rounded my-1 my-md-0"
              style={{
                borderRadius: "20px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e9ecef")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f8f9fa")
              }
            >
              <Image size={16} className="me-2" />
              Image
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/generateaudio"
              className="d-flex align-items-center text-dark me-md-1 px-3 py-1 rounded my-1 my-md-0"
              style={{
                borderRadius: "20px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e9ecef")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f8f9fa")
              }
            >
              <MicFill size={16} className="me-2" />
              Speech
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/about"
              className="d-flex align-items-center text-dark me-md-1 px-3 py-1 rounded my-1 my-md-0"
              style={{
                borderRadius: "20px",
                backgroundColor: "#f8f9fa",
                transition: "background-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#e9ecef")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f8f9fa")
              }
            >
              <InfoCircle size={16} className="me-2" />
              About
            </Nav.Link>

            <Nav.Link
              href="https://github.com/PRAJAPATI-NEEL-2005"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center justify-content-center bg-light border rounded my-1 my-md-0"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
              }}
              aria-label="Visit my GitHub profile"
            >
              <Github size={20} className="text-dark" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

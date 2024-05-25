import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  console.log(loggedInUser);

  const handleSignOut = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return (
    <header>
      <Navbar
        bg="primary"
        navbar="light"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Nav.Link>
            <Navbar.Brand>ECart</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <i class="bi bi-cart">Cart</i>
              </Nav.Link>

              {loggedInUser && (
                <Nav.Link>
                  <i class="bi bi-bucket-fill"> Orders</i>
                </Nav.Link>
              )}

              {loggedInUser && (
                <Nav.Link>
                  <i class="bi bi-bucket-fill"> Profile</i>
                </Nav.Link>
              )}

              {loggedInUser && loggedInUser.isAdmin == true && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item>Users</NavDropdown.Item>

                  <NavDropdown.Item>Products</NavDropdown.Item>

                  <NavDropdown.Item>Categories</NavDropdown.Item>

                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </NavDropdown>
              )}

              {!loggedInUser && (
                <Nav.Link>
                  <i class="bi bi-box-arrow-in-right"> Log In</i>
                </Nav.Link>
              )}
              {loggedInUser && (
                <Nav.Link onClick={(e) => handleSignOut(e)}>
                  <i class="bi bi-box-arrow-in-right"> Sign Out</i>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

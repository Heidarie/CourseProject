import React from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Container, Form, Nav, NavDropdown } from 'react-bootstrap'
import { logOut, getCurrentUser } from '../../api/Api';
import logo from "../../logo.png"

const Navb = () => {
  const user = getCurrentUser();

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">Wypożczyalnia samochodów</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/Rent">Wynajem</Nav.Link>
              <Nav.Link as={NavLink} to="/AddCar">Dodaj samochód</Nav.Link>
              <Nav.Link as={NavLink} to="/AddInstructor">Dodaj konto instruktora</Nav.Link>
              <NavDropdown title={<span style={{ color: "gray" }}>Panel instruktora</span>} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={NavLink} to="/InstructorCars" >Samochody</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/InstructorTrainings" >Szkolenia</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav
              className="ms-auto" >
              <Form className="d-flex">
                {user ? (<>             
                  {user.includes("Admin") ? (<NavDropdown title={<span style={{ color: "white" }}>Panel Administratora</span>} id="navbarScrollingDropdown">
                    
                    <NavDropdown.Divider />
                  </NavDropdown>
                  ) : (null)
                  }
                  <NavDropdown title={<span style={{ color: "gray" }}>Profil</span>} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={NavLink} to="/ChangePassword" >Zmień hasło</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link href="/login" style={{ color: "red" }} className="nav-link" onClick={logOut}>
                    Wyloguj</Nav.Link>
                </>
                ) : (<>
                  <Nav.Link as={NavLink} style={{ color: "gray" }} to="/Login">Login</Nav.Link>
                  <Nav.Link as={NavLink} style={{ color: "gray" }} to="/Register">Zarejestuj się</Nav.Link>
                </>)}
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}
export default Navb
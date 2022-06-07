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
          <Navbar.Brand as={NavLink} to="/"><img className='logo' src={logo} />Kursy językowe</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/Rent">Wynajem</Nav.Link>
              
            </Nav>
            <Nav
              className="ms-auto" >
              <Form className="d-flex">
                {user ? (<>
                  {user[0] === "Student" && user.length === 1 ? (<></>) : <>
                    <NavDropdown title={<span style={{ color: "white" }}>Panel Nauczyciela</span>} id="navbarScrollingDropdown">
                      <NavDropdown.Item as={NavLink} to="/AddFlashcard">Dodaj fiszki</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={NavLink} to="/AddQuiz">Dodaj quiz</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={NavLink} to="/AddSchooling">Dodaj szkolenie</NavDropdown.Item>
                    </NavDropdown>
                  </>}

                  {user.includes("Admin") ? (<NavDropdown title={<span style={{ color: "white" }}>Panel Administratora</span>} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={NavLink} to="/Register">Stwórz użytkownika</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Users">Zarządaj użytkownikami</NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                  ) : (null)
                  }
                  <NavDropdown title={<span style={{ color: "white" }}>Profil</span>} id="navbarScrollingDropdown">
                    <NavDropdown.Item as={NavLink} to="/ChangePassword" >Zmień hasło</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Profil" >Informacje o profilu</NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/Payment" >Abonament</NavDropdown.Item>
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
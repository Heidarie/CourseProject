import { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./Login.css";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { login, getCurrentUser } from "../../api/Api";
import reactDom from "react-dom";

const validEmailRegex = RegExp(
  /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      validationMessage: '',
      emailValidation: ''
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
      && this.state.emailValidation.length === 0;
  }

  handleSubmit(event) {
    event.preventDefault()


    login({
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if (res.status === 200) {
        this.props.history("/", { replace: true });

      }
    }
    ).catch(err => {
      this.setState({
        validationMessage: err.response.data.message
      })
    })


  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });
    if (e.target.id === "email") {
      let error = validEmailRegex.test(e.target.value)
        ? ''
        : 'Email is not valid!';
      this.setState({
        emailValidation: error,
      })
    }
  }

  render() {

    return (

      <div className="loginFields">
        <h2>Logowanie</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Form.Group as={Col} size="lg" >
              <Form.Label>Email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="validationMessage">{this.state.emailValidation}</div>
          </Row>
          <Row>
            <Form.Group as={Col} size="lg" >
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <div className="validationMessage">{this.state.validationMessage}</div>
            <Col>
              <Button size="lg" className="submit" type="submit" disabled={!this.validateForm()}>
                Login
              </Button>
              <div>
                <span className="registerLink">Nie masz konta? {" "}<p>
                  <NavLink to="/Register">Stwórz konto</NavLink></p></span>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

    );
  }
}

export default Login
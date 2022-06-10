import { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./Register.css";
import { Col } from "react-bootstrap";
import { register, getCurrentUser, registerAdmin } from "../../api/Api";


const validEmailRegex = RegExp(
  /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i
);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      surname: '',
      password: '',
      repassword: '',
      validationMessage: '',
      emailValidation: '',
      type: 2,
      pesel:""
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 4
      && this.state.emailValidation.length === 0 && this.state.repassword.length > 4
      && this.state.name.length > 0 && this.state.surname.length > 0 && this.state.pesel.length==11;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.type != 0) {
      register({
        "email": this.state.email,
        "password": this.state.password,
        "givenName": this.state.name,
        "familyName": this.state.surname,
        "peselNumber": this.state.pesel
      }).then(res => {
        if (res.status === 200) {
          if (getCurrentUser() && getCurrentUser().includes("Admin")) {
            window.location.reload(false);
          }
          else {

            this.props.history("/Login", { replace: true });
          }

        }
      }).catch(err => {
        this.setState({
          validationMessage: err.response.data.message
        })
      })
    }
    else {
      registerAdmin({
        email: this.state.email,
        password: this.state.password,
        givenName: this.state.name,
        familyName: this.state.surname,
      }).then(res => {
        if (res.status === 200) {
          if (getCurrentUser() && getCurrentUser().includes("Admin")) {
            window.location.reload(false);
          }
          else {

            this.props.history("/Login", { replace: true });
          }

        }
      }).catch(err => {
        this.setState({
          validationMessage: err.response.data.message
        })
      })
    }
  }
  componentDidMount() {
    let user = getCurrentUser();
    this.setState({
      usr: user
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
      <div className="registerForm">
        <div className="registerFields ">
          <h2> Stwórz konto</h2>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Row>
              <Col sm>
                <Form.Group size="lg" >
                  <Form.Label>Imię</Form.Label>
                  <Form.Control
                    id="name"
                    type="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <div className="validationMessage"></div>
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group size="lg" >
                  <Form.Label>Nazwisko</Form.Label>
                  <Form.Control
                    id="surname"
                    type="text"
                    value={this.state.surname}
                    onChange={this.handleChange}
                  />
                  <div className="validationMessage"></div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group size="lg" >
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
              <Col sm>
                <Form.Group size="lg" >
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Form.Group></Col>
              <Col sm>
                <Form.Group size="lg" >
                  <Form.Label>Powtórz hasło</Form.Label>
                  <Form.Control
                    id="repassword"
                    type="password"
                    value={this.state.repassword}
                    onChange={this.handleChange}
                  />
                </Form.Group></Col>
            </Row>
            <Row>
              <div className="validationMessage"></div>
              <Row>
              <Col sm>
                <Form.Group size="lg" >
                  <Form.Label>Pesel</Form.Label>
                  <Form.Control
                    id="pesel"
                    type="number"
                    
                    onChange={this.handleChange}
                  />
                  <div className="validationMessage">{this.state.pesel.length}</div>
                </Form.Group>
              </Col>
            </Row>
              <Row>
                {this.state.usr && this.state.usr.includes("Admin") ? (
                  <Col sm>
                    <Form.Group size="lg" >
                      <Form.Label>Typ użytkownika</Form.Label>
                      <Form.Select id="type"
                        onChange={this.handleChange}>
                        <option value="2">Uczeń</option>
                        <option value="1">Nauczyciel</option>
                        <option value="0">Administrator</option>
                      </Form.Select>
                    </Form.Group></Col>
                ) : (null)}
                <div className="validationMessage">{this.state.validationMessage}</div>
              </Row>
              <Col>
                <Button size="lg" className="submit" type="submit" disabled={!this.validateForm()}>
                  Stwórz konto
                </Button>
              </Col>
            </Row>
          </Form>
        </div></div>
    );
  }
}

export default Register
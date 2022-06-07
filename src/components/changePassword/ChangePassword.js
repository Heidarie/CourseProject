import { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./ChangePassword.css";
import { Col } from "react-bootstrap";
import { changePassword } from "../../api/Api"

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old: "",
      password: '',
      repassword: '',
      validationMessage: '',
    }
  }

  validateForm() {
    return this.state.repassword.length > 0 && this.state.password.length > 0
      && this.state.validationMessage.length === 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    changePassword({
      oldPassword: this.state.old,
      newPassword: this.state.password
    }).then(res => {
      this.props.history("/", { replace: true })
    }).catch(err => {
      {
        this.setState({
          validationMessage: err.response.data.message
        })
      }
    })



  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    });

  }

  render() {
    return (

      <div className="changePasswordFields">
        <h2>Zmień hasło</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Form.Group as={Col} size="lg" >
              <Form.Label>Stare hasło</Form.Label>
              <Form.Control
                id="old"
                type="password"
                value={this.state.old}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} size="lg" >
              <Form.Label>Nowe hasło</Form.Label>
              <Form.Control
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="validationMessage">{this.state.emailValidation}</div>
          </Row>
          <Row>
            <Form.Group as={Col} size="lg" >
              <Form.Label>Powtórz hasło</Form.Label>
              <Form.Control
                id="repassword"
                type="password"
                value={this.state.repassword}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <div className="validationMessage">{this.state.validationMessage}</div>
            <Col>
              <Button size="lg" className="submit" type="submit" disabled={!this.validateForm()}>
                Zmień hasło
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default ChangePassword
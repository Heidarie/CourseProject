import { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {BuyTokensAPI} from "../../api/Api";
import reactDom from "react-dom";



class BuyTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
        numberOfTokens:1,
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    BuyTokensAPI(this.state.numberOfTokens).then(res=>{
        if (res.status === 200) {
            this.props.history("/Profil", { replace: true });
    
          }
        }
        ).catch(err => {
        })
  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value})
  }

  render() {

    return (

      <div className="loginFields">
        <h2>Kup pakiet kursów</h2>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Row>
            <Form.Group as={Col} size="lg" >
              <Form.Label>Wybierz pakiet</Form.Label>
              <Form.Select aria-label="Default select example" id="numberOfTokens" onChange={this.handleChange}>
                            <option value="1">1 kurs - 100 zł</option>
                            <option value="3">3 kursy - 230 zł</option>
                            <option value="6">6 kursów - 370 zł</option>
                        </Form.Select>
            </Form.Group>
            <div className="validationMessage">{this.state.emailValidation}</div>
          </Row>
          <Row>
            <div className="validationMessage">{this.state.validationMessage}</div>
            <Col>
              <Button size="lg" className="submit" type="submit">
                Kup
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

    );
  }
}

export default BuyTokens
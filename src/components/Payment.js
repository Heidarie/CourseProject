import { Col } from "react-bootstrap";
import { Form, Button, Row } from "react-bootstrap";
import { Component } from "react";
import { BuyPremium, getCurrentUser } from "../api/Api"

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abonament: "1",
            user: ""
        }
    }

    componentDidMount() {
        this.setState({
            user: getCurrentUser()
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        BuyPremium(this.state.abonament).then(res => {
            if (res.status === 200) {
                this.props.history("/", { replace: true })
            }
        })

    }


    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });

    }


    validateForm() {
        return this.state.abonament.length > 0
    }

    render() {
        return (
            <div className="loginFields ">
                {this.state.user.includes("StudentPremium") || this.state.user.includes("Teacher") ? (<h2>Posiadasz już ważny abonament</h2>) : (<div>
                    <h1 style={{ textAlign: "center" }}>Kup abonament</h1>
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Row>

                            <Col sm>
                                <Form.Group size="lg" >
                                    <Form.Label>Wybierz abonament</Form.Label>
                                    <Form.Select id="abonament"
                                        onChange={this.handleChange}>
                                        <option value="1">1 miesiąc - 29,99zł</option>
                                        <option value="2">2 miesiące - 55,99zł</option>
                                        <option value="3">3 miesiące - 70,99zł</option>
                                    </Form.Select>
                                </Form.Group></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button size="lg" className="submit" type="submit" disabled={!this.validateForm()}>
                                    Kup
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>)}
            </div>
        )
    }
}
export default Payment
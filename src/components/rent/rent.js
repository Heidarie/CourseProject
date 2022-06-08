import { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./Rent.css";
import { Col } from "react-bootstrap";
import { } from "../../api/Api";
import Cars from "../../jsonTestData/cars.json"
import car from "./../../car.png"
import Modal from "react-modal";
class Rent extends Component {
    constructor(props) {
        super(props);
        this.state = {
                isOpen:false
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }
    toggleModal = () =>{
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    render() {
        return (
            <div className="Rent">
                <div className="filters d-flex row justify-content-center py-5">

                    <div className="col-md-2  col-5">

                        <Form.Select aria-label="Default select example">
                            <option>Marka</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-2 col-5">
                        <Form.Select aria-label="Default select example">
                            <option>Napęd</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-2  col-5">
                        <Form.Select aria-label="Default select example">
                            <option>Skrzynia biegów</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-2  col-5">
                        <Form.Select aria-label="Default select example">
                            <option>Rodzaj paliwa</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>

                </div>
                <div className="Cars row d-flex justify-content-center py-5">
                    {Cars.map((x) => {
                        return (
                            <div className="row car">
                                <div className="col-md-2">
                                    <div className="img-responsive">
                                        <img className="rentCar" src={car}></img>
                                    </div>
                                </div>

                                <div className="col-md-2">{<h2>{x.Brand} {x.Model}</h2>}<br />
                                    <div style={{ padding: "10px" }}>
                                        <Row>Napęd: {x.Drive}</Row>
                                        <Row>Skrzynia biegów: {x.Gearbox} </Row>
                                        <Row>Rodzaj paliwa: {x.FuelType} </Row>
                                    </div>
                                </div>
                                <div className="col-md-6"><h3>Opis</h3>
                                    {x.ShortDescription} </div>

                                <div className="col-md-2 d-flex flex-column text-end">
                                    
                                    {
                                        <div>
                                        <h2 className="price">{x.PricePerDay} zł</h2>
                                        </div>
                                    }
                                    
                                    <div className="mt-auto">
                                        <button className="btn btn-lg btn-block btn-outline-primary" onClick={()=>{this.toggleModal()}}>Wynajmij</button>
                                    </div>

                                </div>

                            </div>

                        )
                    })}

                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.toggleModal}
                    style={{
                        overlay: {
                            position: 'fixed',
                            zIndex: 1020,
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(255, 255, 255, 0.75)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        content: {
                            background: 'white',
                            width: '45rem',
                            maxWidth: 'calc(100vw - 10rem)',
                            minHeight: '300px',
                            maxHeight: 'calc(100vh - 2rem)',
                            overflowY: 'auto',
                            position: 'relative',
                            border: '1px solid #ccc',
                            borderRadius: '0.3rem',
                        }
                    }}
                    contentLabel="My dialog"
                >
                    <div>
                        
                    <button className="mt-auto btn btn-lg btn-block btn-outline-danger" onClick={()=>{this.toggleModal()}}> Anuluj</button>
                       
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Rent
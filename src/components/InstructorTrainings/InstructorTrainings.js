import { Component, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { getCalendarTraining } from "../../api/Api";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { getReservationsRequest, accpectReservation, getSchedule } from "../../api/Api"

class InstructorTrainings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservationsRequest: null,
            shcedule: null,
            loading: true,
            loading2: true,

        }
    }



    componentDidMount() {
        getReservationsRequest().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    loading: false,
                    reservationsRequest: res.data
                })
            }
        }).catch(err => {

            console.log(err)

        })
        getSchedule().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    loading2: false,
                    schedule: res.data
                })
            }
        }).catch(err => {

            console.log(err)

        })

    }

    handleSubmit = () => {

    }



    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }
    accpectReservation = (id) => {
        accpectReservation(id).then(res => {
            if (res.status === 200) {
                window.location.reload(false);
            }
        }).catch(err => {

            console.log(err)

        })
    }

    render() {
        return (<>
            {this.state.loading || this.state.loading2 ? (<h1>Loading</h1>) : (
                <div className="Rent">
                    <h1 style={{ textAlign: "center" }}> Akceptowanie rezerwacji</h1>
                    {this.state.reservationsRequest.length === 0 ? (<h3 style={{ textAlign: "center" }}> Brak rezerwacji do zaakceptowania</h3>) : (<></>)}
                    {this.state.reservationsRequest.map((x) => {
                        return (
                            <div className="Cars row d-flex justify-content-center">
                                <div className="row car">
                                    <div className="col-md-2">
                                        <div className="img-responsive">
                                            <img className="rentCar" src={`data:image/jpeg;base64,${x.car.imageString}`}></img>
                                        </div>
                                    </div>

                                    <div className="col-md-3">{<h2>{x.car.brand} {x.car.model}</h2>}<br />
                                        <div style={{ padding: "10px" }}>
                                            <Row>Napęd: {x.car.drive}</Row>
                                            <Row>Skrzynia biegów: {x.car.gearbox} </Row>
                                            <Row>Rodzaj paliwa: {x.car.fuelType} </Row>
                                        </div>
                                    </div>
                                    <div className="col-md-7 d-flex flex-column text-end">
                                        {
                                            <div>

                                                <h2 className="price"> Data: {x.trainingDay.toString().split("T")[0]} </h2>
                                            </div>
                                        }
                                        <div className="mt-auto">

                                            <button className="btn btn-lg btn-block btn-outline-success" onClick={() => { this.accpectReservation(x.reservationId) }}>Akceptuj</button>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )
                    })}
                    <h1 style={{ textAlign: "center" }}> Terminarz</h1>
                    {this.state.schedule.length === 0 ? (<h3 style={{ textAlign: "center" }}> Brak zaplanowanych kursów</h3>) : (<></>)}
                    <div className="Cars row d-flex justify-content-center py-2">
                        {this.state.schedule.map((x) => {
                            return (
                                <div className="row car">
                                    <div className="col-md-2">
                                        <div className="img-responsive">
                                            <img className="rentCar" src={`data:image/jpeg;base64,${x.car.imageString}`}></img>
                                        </div>
                                    </div>
                                    <div className="col-md-3">{<h2>{x.car.brand} {x.car.model}</h2>}<br />
                                        <div style={{ padding: "10px" }}>
                                            <Row>Napęd: {x.car.drive}</Row>
                                            <Row>Skrzynia biegów: {x.car.gearbox} </Row>
                                            <Row>Rodzaj paliwa: {x.car.fuelType} </Row>
                                        </div>
                                    </div>
                                    <div className="col-md-7 d-flex flex-column text-end">
                                        {
                                            <div>

                                                <h2 className="price"> Data: {x.trainingDay.toString().split("T")[0]} </h2>
                                            </div>
                                        }
                                        <div className="mt-auto">
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>)}</>
        );
    }
}

export default InstructorTrainings
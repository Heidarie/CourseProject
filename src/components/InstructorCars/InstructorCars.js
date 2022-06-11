import { Component, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { AvailableCarList, TeacherCarList, TeacherAddCar, TeacherRemoveCar } from "../../api/Api";
import Modal from "react-modal";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import CalendarPicker from '../calendar/Calendar';
import { getBrands, } from "../../api/Api"

class InstructorCars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: null,
            teacherCars: null,
            loading: true,
            loading2: true


        }
    }



    componentDidMount() {
        TeacherCarList().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    teacherCars: res.data,
                    loading2: false
                })
            }
        }).catch(err => {

            console.log(err)

        })
        AvailableCarList().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    loading: false,
                    cars: res.data
                })
            }
        }).catch(err => {

            console.log(err)

        })
    }

    addCar = (id) => {
        TeacherAddCar(id).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                window.location.reload(false);
            }
        }).catch(err => {

            console.log(err)

        })
    }
    removeCar = (id) => {
        TeacherRemoveCar(id).then(res => {
            if (res.status === 200) {
                console.log(res.data)
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
                    <div className="Cars row d-flex justify-content-center py-5">
                        <div className="col-md-6">
                            <div className="col-md-12 text-center">
                                <h1>
                                    Dostępne samochody
                                </h1>
                            </div>

                            {this.state.cars.map((x) => {
                                return (
                                    <div className="row car mx-3 my-3">

                                        <div className="col-md-2">
                                            <div className="img-responsive">
                                                <img className="rentCar" src={`data:image/jpeg;base64,${x.imageString}`}></img>
                                            </div>
                                        </div>

                                        <div className="col-md-7">
                                            {<h2>{x.brand} {x.model}</h2>}
                                            <div className="col-sx-12">Id: {x.id}</div>
                                        </div>
                                        <div className="col-md-2">
                                            <div>
                                                <button className="btn btn-lg btn-block btn-outline-primary" onClick={() => { this.addCar(x.id) }}>Dodaj</button>
                                            </div>

                                        </div>

                                    </div>

                                )
                            })}
                        </div>
                        <div className="col-md-6 ">
                            <div className="col-md-12 text-center">
                                <h1>
                                    Moje samochody szkoleniowe
                                </h1>
                            </div>


                            {this.state.teacherCars.map((x) => {
                                return (
                                    <div className="row car mx-2 my-3">

                                        <div className="col-md-2">
                                            <div className="img-responsive">
                                                <img className="rentCar" src={`data:image/jpeg;base64,${x.imageString}`}></img>
                                            </div>
                                        </div>

                                        <div className="col-md-7">
                                            {<h2>{x.brand} {x.model}</h2>}
                                            <div className="col-sx-12">Id: {x.id}</div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="mt-auto">
                                                <button className="btn btn-lg btn-block btn-outline-danger" onClick={() => { this.removeCar(x.id) }}>Usuń</button>
                                            </div>

                                        </div>

                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>)}</>
        );
    }
}

export default InstructorCars
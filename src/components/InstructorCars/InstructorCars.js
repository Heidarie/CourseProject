import { Component, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { AvailableCarList, TeacherCarList,TeacherAddCar,TeacherRemoveCar } from "../../api/Api";
import Modal from "react-modal";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import CalendarPicker from '../calendar/Calendar';
import {getBrands,} from "../../api/Api"

class InstructorCars extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cars:null,
                teacherCars:null,
                loading:true,
                loading2:true
               
               
        }
    }

   

    componentDidMount(){
        TeacherCarList().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({                   
                    teacherCars:res.data,
                    loading2:false
                })
            }
          }).catch(err => {
            
             console.log(err)
           
          })
        AvailableCarList().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    loading:false,
                    cars:res.data
                })
            }
          }).catch(err => {
            
             console.log(err)
           
          })
    }

    addCar=(id)=>{
        TeacherAddCar(id).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                window.location.reload(false);
            }
          }).catch(err => {
            
             console.log(err)
           
          })
    }
    removeCar=(id)=>{
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
            {this.state.loading || this.state.loading2?(<h1>Loading</h1>):(
            <div className="Rent">
                <div className="Cars row d-flex justify-content-center py-5">
                <div className="col-md-6">
                    <h2>Dostępne samochody</h2>
                   
                    {this.state.cars.map((x) => {
                        return (
                            <div className="row car">
                                
                                <div className="col-md-2">
                                    <div className="img-responsive">
                                        <img className="rentCar" src={`data:image/jpeg;base64,${x.imageString}`}></img>
                                    </div>
                                </div>

                                <div className="col-md-3">{<h2>{x.brand} {x.model}</h2>}<br />
                                    <div style={{ padding: "10px" }}>
                                        <Row>Napęd: {x.drive}</Row>
                                        <Row>Skrzynia biegów: {x.gearbox} </Row>
                                        <Row>Rodzaj paliwa: {x.fuelType} </Row>
                                    </div>
                                </div>
                                <div className="col-md-7 d-flex flex-column text-end">
                                    
                                    {
                                        <div>
                                        <h2 className="price">{x.pricePerDay} zł</h2>
                                        </div>
                                    }
                                    
                                    <div className="mt-auto">
                                       
                                        <button className="btn btn-lg btn-block btn-outline-primary" onClick={()=>{this.addCar(x.id)}}>Dodaj</button>
                                    </div>

                                </div>
                                
                            </div>

                        )
                    })}
                    </div>
                    <div className="col-md-6 ">
                        <h2>Moje samochody szkoleniowe</h2>
                        
                       
                        {this.state.teacherCars.map((x) => {
                        return (
                            <div className="row car">
                                
                                <div className="col-md-2">
                                    <div className="img-responsive">
                                        <img className="rentCar" src={`data:image/jpeg;base64,${x.imageString}`}></img>
                                    </div>
                                </div>

                                <div className="col-md-3">{<h2>{x.brand} {x.model}</h2>}<br />
                                    <div style={{ padding: "10px" }}>
                                        <Row>Napęd: {x.drive}</Row>
                                        <Row>Skrzynia biegów: {x.gearbox} </Row>
                                        <Row>Rodzaj paliwa: {x.fuelType} </Row>
                                    </div>
                                </div>
                                <div className="col-md-7 d-flex flex-column text-end">
                                    
                                    {
                                        <div>
                                        <h2 className="price">{x.pricePerDay} zł</h2>
                                        </div>
                                    }
                                    
                                    <div className="mt-auto">
                                        <button className="btn btn-lg btn-block btn-outline-danger" onClick={()=>{this.removeCar(x.id)}}>Usuń</button>
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
import { Component, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./Rent.css";
import { getCalendarTraining } from "../../api/Api";
import Modal from "react-modal";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import CalendarPicker from '../calendar/Calendar';
import CalendarPicker2 from '../calendar/Calendar2';
import {CarList,getBrands,getCalendar, makeReservation,createTrainingReservation} from "../../api/Api"

class Rent extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cars:null,
                loading:true,
                isOpen:false,
                dateRange:null,
                brands:null,
                carId:null,
                calendar:null,
                isTraining:false,
        }
    }

   

    componentDidMount(){
        getBrands().then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({                   
                    brands:res.data
                })
            }
          }).catch(err => {
            
             console.log(err)
           
          })
        CarList().then(res => {
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

    handleSubmit = () => {
        if(!this.state.isTraining){
        makeReservation({
            carId: this.state.carId,
            loanFrom: new Date(this.state.dateRange.from.year+"-"+this.state.dateRange.from.month+"-"+this.state.dateRange.from.day+" 06:00:00"),
            loanTo: new Date(this.state.dateRange.to.year+"-"+this.state.dateRange.to.month+"-"+this.state.dateRange.to.day+" 06:00:00")
        }).then(res => {
            if (res.status === 200) {
            this.toggleModal()
            }
        }).catch(err => {
            
            console.log(err)
          
         })}
         if(this.state.isTraining){
            createTrainingReservation({
                carId: this.state.carId,
                loanFrom: new Date(this.state.dateRange.from.year+"-"+this.state.dateRange.from.month+"-"+this.state.dateRange.from.day+" 06:00:00"),
                loanTo: new Date(this.state.dateRange.to.year+"-"+this.state.dateRange.to.month+"-"+this.state.dateRange.to.day+" 06:00:00")
            }).then(res => {
                if (res.status === 200) {
                this.toggleModal()
                }
            }).catch(err => {
                
                console.log(err)
              
             })}
            
        
    }
     

    handleCalendar = (callback) => {
        console.log(callback)
        this.setState({
            dateRange: callback
        });
        
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
    getCarCalendar=(id,type)=>{
        if(!type){getCalendar(id).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    calendar:res.data,
                    isOpen:true,
                    carId:id,
                    isTraining:false
                    
                })
            }
          }).catch(err => {
            
             console.log(err)
           
          })}
          else{
            getCalendarTraining(id).then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    this.setState({
                        calendar:res.data,
                        isOpen:true,
                        carId:id,
                        isTraining:true
                        
                    })
                }
              }).catch(err => {
                
                 console.log(err)
               
              })
          }
    }

    render() {
        return (<>
            {this.state.loading?(<h1>Loading</h1>):(
            <div className="Rent">
                <div className="filters d-flex row justify-content-center py-5">

                    <div className="col-md-2  col-5">

                        <Form.Select aria-label="Default select example">
                            <option>Marka</option>
                            {this.state.brands.map((y)=>{
                                return(
                                    <option value ={y}>{y}</option>
                                )
                            })}
                           
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
                                <div className="col-md-5"><h3>Opis</h3>
                                    {x.description} </div>

                                <div className="col-md-2 d-flex flex-column text-end">
                                    
                                    {
                                        <div>
                                        <h2 className="price">{x.pricePerDay} zł</h2>
                                        </div>
                                    }
                                    
                                    <div className="mt-auto">
                                        <button className="btn btn-lg btn-block btn-outline-primary" disabled={!x.trainingAvailable} onClick={()=>{this.getCarCalendar(x.id,true)}}>Jazda doszkalająca</button>
                                        <button className="btn btn-lg btn-block btn-outline-primary" onClick={()=>{this.getCarCalendar(x.id,false)}}>Wynajmij</button>
                                    </div>

                                </div>

                            </div>

                        )
                    })}

                </div>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.toggleModal}
                    ariaHideApp={false}
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
                            width: '25rem',
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
                    <div className="modal-body">
                        <div className="col-md-12">
                            <div className="text-center">
                                {this.state.isTraining?(<>
                                <CalendarPicker2 disabledDays={this.state.calendar} onDateChange={this.handleCalendar}/>
                                </>):<>
                                <CalendarPicker disabledDays={this.state.calendar} onDateChange={this.handleCalendar}/>
                                </>}
                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-start">
                            <button className="mt-auto btn btn-lg btn-block btn-outline-danger"
                                onClick={() => { this.toggleModal() }}>
                                Anuluj
                            </button>
                        </div>
                        <div className="col-md-6 text-end">
                            <button className="mt-auto btn btn-lg btn-block btn-outline-success"
                                onClick={() => { this.handleSubmit() }}>
                                Wynajmij
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>)}</>
        );
    }
}

export default Rent
import { Component, useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import "./Rent.css";
import { getCalendarTraining } from "../../api/Api";
import Modal from "react-modal";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import CalendarPicker from '../calendar/Calendar';
import CalendarPicker2 from '../calendar/Calendar2';
import {CarList,getBrands,getCalendar, makeReservation,createTrainingReservation,CarFilter} from "../../api/Api"

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
                price:null,
                priceTotal:0,
                filterBrand:"",
                filterDrive:"",
                filterGearbox:"",
                filterFuelType:""
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
    findCar(){
                CarFilter({
                    "brand": this.state.filterBrand,
                    "drive": this.state.filterDrive,
                    "gearbox": this.state.filterGearbox,
                    "fuelType": this.state.filterFuelType
                }).then(res=>{
                    if(res.status===200){
                        this.setState({
                            cars:res.data
                        })
                    }
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
        
        var numberOfDays=1;
        if(callback.from != null && callback.to!=null){
            var loanFrom= new Date(callback.from.year+"-"+callback.from.month+"-"+callback.from.day)
            var loanTo= new Date(callback.to.year+"-"+callback.to.month+"-"+callback.to.day)
             numberOfDays = (loanTo.getTime()-loanFrom.getTime()) / (1000*60*60*24) + 1
             
            
        }
        console.log(callback)
        this.setState({
            dateRange: callback,
            priceTotal:this.state.price * numberOfDays
            
        });
        
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }
    toggleModal = () =>{
        if(this.state.isOpen){
            this.setState({
                priceTotal:0,
                dateRange:null

            })
        }
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    getCarCalendar=(id,type,price)=>{
        if(!type){getCalendar(id).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                this.setState({
                    calendar:res.data,
                    isOpen:true,
                    carId:id,
                    isTraining:false,
                    price:price
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
                        isTraining:true,
                        price:price
                        
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

                        <Form.Select id="filterBrand" onChange={this.handleChange} aria-label="Default select example">
                            <option>Marka</option>
                            {this.state.brands.map((y)=>{
                                return(
                                    <option value ={y}>{y}</option>
                                )
                            })}
                           
                        </Form.Select>
                    </div>
                    <div className="col-md-2 col-5">
                        <Form.Select id="filterDrive" onChange={this.handleChange} aria-label="Default select example">
                           
                            <option key='s' hidden value >Napęd</option>
                            <option value="Napęd 4x4">Napęd 4x4</option>
                            <option value="Napęd na przednie koła">Napęd na przednie koła</option>
                            <option value="Napęd na tylnie koła">Napęd na tylnie koła</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-2  col-5">
                        <Form.Select  id="filterGearbox" onChange={this.handleChange} aria-label="Default select example">                         
                            <option key='Rodzaj paliwa' hidden value >Skrzynia biegów</option>
                            <option value="Automatyczna">Automatyczna</option>
                            <option value="Manualna">Manualna</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-2  col-5">
                        <Form.Select id="filterFuelType" onChange={this.handleChange} aria-label="Default select example">
                        <option key='Rodzaj paliwa' hidden value >Rodzaj paliwa</option>
                            <option value="Benzyna">Benzyna</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Elektryczny">Elektryczny</option>
                        </Form.Select>

                    </div>
                 <div className="col-md-2 text-center"><button className="btn btn-md btn-block btn-outline-primary my-1 mx-1" onClick={()=>{this.findCar()}}>Szukaj</button></div>
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
                                    <div className="col-md-12 text-wrap">
                                        {x.description}
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex flex-column text-end">
                                    {
                                        <div>
                                            <h2 className="price">{x.pricePerDay} zł</h2>
                                        </div>
                                    }
                                    <div className="mt-auto">
                                        <button className="btn btn-md btn-block btn-outline-success my-1 mx-1" hidden={!x.trainingAvailable} onClick={() => { this.getCarCalendar(x.id, true,x.pricePerDay) }}>Jazda doszkalająca</button>
                                        <button className="btn btn-md btn-block btn-outline-primary my-1 mx-1" onClick={() => { this.getCarCalendar(x.id, false,x.pricePerDay) }}>Wynajmij</button>
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
                    <div className="col-md-12 text-end">
                           <h3 style={{}}>Do zapłacenia: {this.state.priceTotal}</h3> 
                        </div>
                        <div className="col-md-6 text-start">
                            <button className="mt-auto btn btn-lg btn-block btn-outline-danger"
                                onClick={() => { this.toggleModal() }}>
                                Anuluj
                            </button>
                        </div>
                        <div className="col-md-6 text-end">
                            <button className="mt-auto btn btn-lg btn-block btn-outline-success"
                                onClick={() => { this.handleSubmit() }}>
                                Zapłać
                            </button>
                        </div>
                       
                    </div>
                </Modal>
            </div>)}</>
        );
    }
}

export default Rent
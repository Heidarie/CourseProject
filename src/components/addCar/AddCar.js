import { Component } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { login, getCurrentUser } from "../../api/Api";


class AddCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        PricePerDay:'',
        ShortDescription:"",
        Brand:"",
        Model:"",
        FuelType:"",
        Gearbox:"",
        Drive:"",
        Image:null
    }
  }

  validateForm() {
     return this.state.PricePerDay.length > 0 && this.state.ShortDescription.length > 0
       && this.state.Brand.length > 0 &&this.state.Model.length > 0 && this.state.FuelType.length > 0 
       && this.state.Gearbox.length > 0 && this.state.Drive.length > 0 && this.state.Image != null ;
  }

  handleSubmit(event) {
    event.preventDefault()
  

  }
  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value
    })
    

  }
  handleChangePhoto = (event) => {
    this.setState({
        Image: event.target.files[0]
    })
}

  render() {

    return (

      <div className="row d-flex justify-content-center">
          <div className="col-md-12 text-center py-4"  >  <h2>Dodaj samochód</h2></div>
       <div className="row d-flex justify-content-center">
        <Form onSubmit={this.handleSubmit.bind(this)}>
        <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Marka</Form.Label>
              <Form.Control
                id="Brand"
                type="text"
                value={this.state.Brand}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Model</Form.Label>
              <Form.Control
                id="Model"
                type="text"
                value={this.state.Model}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Opis</Form.Label>
              <Form.Control
                id="ShortDescription"
                as="textarea" rows={3}
                value={this.state.ShortDescription}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Cena za dzień</Form.Label>
              <Form.Control
                id="PricePerDay"
                type="Number"
                min="1"
                value={this.state.PricePerDay}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Rodzaj paliwa</Form.Label>
              <Form.Select aria-label="Default select example" id="FuelType" onChange={this.handleChange}>
                            <option key='Rodzaj paliwa' hidden value >Wybierz</option>
                            <option value="Benzyna">Benzyna</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Elektryczny">Elektryczny</option>
                        </Form.Select>
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Skrzynia biegów</Form.Label>
              <Form.Select aria-label="Default select example" id="Gearbox" onChange={this.handleChange}>
                            <option key='Rodzaj paliwa' hidden value >Wybierz</option>
                            <option value="Automatyczna">Automatyczna</option>
                            <option value="Manualna">Manualna</option>
                        </Form.Select>
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Napęd</Form.Label>
              <Form.Select aria-label="Default select example" id="Drive" onChange={this.handleChange}>
                            <option key='s' hidden value >Wybierz</option>
                            <option value="Napęd 4x4">Napęd 4x4</option>
                            <option value="Napęd na przednie koła">Napęd na przednie koła</option>
                            <option value="Napęd na tylnie koła">Napęd na tylnie koła</option>
                        </Form.Select>
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Form.Group>
              <Form.Label>Zdjęcie</Form.Label>
              <Form.Control
                  required
                  id="Photo"
                  type="file"
                  accept=".jpg"
                  onChange={this.handleChangePhoto}
                />
            </Form.Group>
            <div className="validationMessage"></div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 col-10">
            <Button size="lg" className="submit" type="submit" disabled={!this.validateForm()}>
                Dodaj
              </Button>
            </div>
          </div>
        </Form>
        </div>
      </div>

    );
  }
}

export default AddCar
import "./Home.css"
import BG from "./../../bg.png"
import car from "./../../car.png"
import { NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
const Home = () => {
    return (
        <div className="Home">
            <img src={BG} width="100%"></img>
            <div className="homeBoxes row">
                <div className="row">
                    <div className="col-md-4 ">
                        <p className="homeBoxTitle text-primary h4">Wypożyczaj auta</p>
                    </div>
                    <div className="col-md-4">
                        <p className="homeBoxTitle text-primary h4">Zarejestruj się</p>
                    </div>
                    <div className=" col-md-4">
                        <p className="homeBoxTitle text-primary h4">Kontakt</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="homeBoxContent text-center">Przeglądaj, wybierz, zapłać. Dzięki nam wypożyczanie aut jest dziecinnie proste.
                            Skorzystaj z naszej strony, by móc cieszyć się jazdą twoim wymarzonym samochodem lub znaleźć auto zastępczę jeśli twój pojazd uległ awarii.</div>
                    </div>
                    <div className="col-md-4">
                        <div className="homeBoxContent text-center">Aby w pełnii korzystać z naszych usług zarejestruj się. Dzięki rejestracji szybciej i łatwiej będziesz mógł
                            wynajmować auta, oraz korzystać z promocji.</div>
                    </div>
                    <div className="col-md-4">
                        <div className="homeBoxContent text-center">Znajdź nas na Google!</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <p className="homeBoxLink"><Link as={NavLink} className="homeBoxLink" to="/Rent">Przeglądaj</Link></p>
                    </div>
                    <div className="col-md-4">
                        <p className="homeBoxLink"><Link as={NavLink} className="homeBoxLink" to="/Register">Stwórz konto</Link></p>
                    </div>
                    <div className="col-md-4">
                        <p className="homeBoxLink "><a className="homeBoxLink" href="https://www.google.pl/maps/place/Ratajczaka+3a,+61-813+Pozna%C5%84/@52.4029272,16.9227969,17.54z/data=!4m5!3m4!1s0x47045b3a11f8dda3:0x7dc2aaabaa05aee4!8m2!3d52.403227!4d16.9234883">Zobacz na mapie</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
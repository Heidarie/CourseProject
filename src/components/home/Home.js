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
                <div className="homeBox  col-md-4 ">
                    <p className="homeBoxTitle">Wypożyczaj auta</p>
                    <div className="homeBoxContent">Przeglądaj, wybierz, zapłać. Dzięki nam wypożyczanie aut jest dziecinnie proste.
                        Skorzystaj z naszej strony, by móc cieszyć się jazdą twoim wymarzonym samochoed lub znaleźć auto zastępczę jeśli twój pojazd uległ awarii.</div>
                    <p className="homeBoxLink"><Link as={NavLink} className="homeBoxLink" to="/rent">Przeglądaj➔</Link></p>
                </div>
                <div className="homeBox col-md-4">
                    <p className="homeBoxTitle">Zarejestruj się</p>
                    <div className="homeBoxContent">Aby w pełnii korzystać z naszych usług zarejestruj się. Dzięki rejestracji szybciej i łatwiej będziesz mógł
                        wynajmować auta, oraz korzystać z promocji.</div>
                    <p className="homeBoxLink"><Link as={NavLink} className="homeBoxLink" to="/rent">Stwórz konto</Link></p>
                </div>
                <div className="homeBox  col-md-4">
                    <p className="homeBoxTitle">Kontakt</p>
                    <div className="homeBoxContent">content</div>
                    <p className="homeBoxLink"><a  className="homeBoxLink" href="https://www.google.pl/maps/place/Ratajczaka+3a,+61-813+Pozna%C5%84/@52.4029272,16.9227969,17.54z/data=!4m5!3m4!1s0x47045b3a11f8dda3:0x7dc2aaabaa05aee4!8m2!3d52.403227!4d16.9234883">Zobacz na mapie</a></p>
                </div>
            </div>
           
        </div>
    )
}

export default Home
import "./Home.css"
import BG from "./../../bg.png"
import car from "./../../car.png"
const Home = () => {
    return (
        <div className="Home">
        <img src={BG} width="100%"></img>
        <div className="homeBoxes row">
            <div className="homeBox  col-md-4 ">
                <p className="homeBoxTitle">Wypożyczaj auta</p>
                <div className="homeBoxContent">Przeglądaj, wybierz, zapłać. Dzięki nam wypożyczanie aut jest dziecinnie proste.
                Skorzystaj z naszej strony, by móc cieszyć się jazdą twoim wymarzonym samochoed lub znaleźć auto zastępczę jeśli twój pojazd uległ awarii.</div>
                <p className="homeBoxLink"><a>Przeglądaj➔</a></p>
            </div>
            <div className="homeBox col-md-4">
                <p className="homeBoxTitle">Zarejestruj się</p>
                <div className="homeBoxContent">Aby w pełnii korzystać z naszych usług zarejestruj się. Dzięki rejestracji szybciej i łatwiej będziesz mógł
                wynajmować auta, oraz korzystać z promocji.</div>
                <p className="homeBoxLink"><a>Stwórz konto➔</a></p>
            </div>
            <div className="homeBox  col-md-4">
                <p className="homeBoxTitle">title</p>
                <div className="homeBoxContent">content</div>
                <p className="homeBoxLink">➔</p>
            </div>
            </div>
            <div className="row">
                   <img className="photoLeft col-md-4" style={{padding:"0",marginTop:"2%"}} src={car}/>
              
                <div className="textRight col-md-6" style={{marginTop:"2%"}}>
                <p className="homeBoxTitle">title</p>
                <div className="homeBoxContent">content</div>
                </div>
            </div>
        </div>
    )
}

export default Home
import './App.css';
import Footer from './components/footer/Footer';
import ChangePassword from './components/changePassword/ChangePassword';
import  Nav  from './components/nav/Nav';
import { Routes,Route } from 'react-router-dom';
import Login from "./components/login/Login";
import Register from './components/register/Register';
import { Row,Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NotAuthorized from './components/NotAuthorized';
import Home from './components/home/Home';
import Profil from './components/Profil/Profil';
import Rent from './components/rent/rent';
import AddCar from './components/addCar/AddCar';
import InstructorCars from './components/InstructorCars/InstructorCars';
import AddInstructor from './components/addInstructor/AddInstructor';
import InstructorTrainings from './components/InstructorTrainings/InstructorTrainings';
import BuyTokens from './components/buyTokens/BuyTokens';

function App() {

  const history = useNavigate();
  return (
    <>
    <div className='appCon'>
    <Nav />
    <Row>
    <Col sm style={{ paddingRight: 0 }}>
    <div className="appBox">
    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login history={history}/>}/>
          <Route path="/Register" element={<Register history={history}/>}/>
          <Route path="/ChangePassword" element={<ChangePassword history={history}/>}/>
          <Route path="/NotAuthorized/" element={<NotAuthorized/>} />         
          <Route path="/Profil/" element={<Profil history={history}/>} />
          <Route path="/Rent/" element={<Rent history={history}/>} />
          <Route path="/AddCar/" element={<AddCar history={history}/>} />
          <Route path="/InstructorCars/" element={<InstructorCars history={history}/>} />
          <Route path="/AddInstructor/" element={<AddInstructor history={history}/>} />
          <Route path="/InstructorTrainings/" element={<InstructorTrainings history={history}/>} />
          <Route path="/BuyTokens/" element={<BuyTokens history={history}/>} />
          
    </Routes>
    
    </div>
    <Footer/>
    </Col>
    </Row>
   
    </div>
    
    </>
  );
}

export default App;

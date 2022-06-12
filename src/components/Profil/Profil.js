import { Col, Row } from "react-bootstrap"
import "./Profil.css"
import React, { useState, useEffect } from "react";
import { getProfil, getCurrentUser,CheckTokens ,GetUserReservations} from "../../api/Api";

const Profil = () => {


    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [profil, setProfil] = useState();
    const [tokens, setTokens] = useState(0);
    const [reservations, setReservations] = useState();

    useEffect(() => {
        GetUserReservations().then(res=>{
            if(res.status===200){
                console.log(res.data)
                setLoading2(false)
                setReservations(res.data)
            }})
        CheckTokens().then(res=>{
            if(res.status===200){
                setTokens(res.data)
            }})
        getProfil().then(res => {

            if (res.status === 200) {
                console.log(res.data)
                setProfil(res.data)
                setLoading(false)
            }
        })
    }, [])
    var roles = getCurrentUser()

    return (
        loading || loading2 ? (<div style={{ textAlign: "center" }}>Loading ...</div>) : (
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 Profile">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12" style={{textAlign:"center",backgroundColor:"lightblue"}}><h1>Witaj {profil.givenName}</h1></div>
                   
                </div>
                <div className="row d-flex justify-content-center py-2">
                    <div className="col-md-12 text-center">Zostało ci {tokens} kursów do zrealizowania</div>
                    <div className="col-md-12 text-center"><a href="/BuyTokens" className="btn btn-lg btn-block btn-outline-primary">Kup więcej</a></div>
                </div>
                
                
                    <div className="col-md-12 text-center my-4"><h2> Twoje rezerwacje</h2>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-4">Auto</div>
                        <div className="col-md-4">Data</div>
                        <div className="col-md-2">Typ</div>
                        <div className="col-md-2">Cena</div>
                    </div>
                    {reservations.map((x=>{
                        return(
                           <div className="row d-flex justify-content-center my-2 border-bottom">
                            <div className="col-md-4">{x.car.brand+" "+x.car.model}</div>
                            <div className="col-md-4">{x.from.toString().split("T")[0]+" - "+x.to.toString().split("T")[0]}</div>
                            <div className="col-md-2">{x.summaryPrice===0?("Szkolenie"):("Wynajem")}</div>
                            <div className="col-md-2">{x.summaryPrice}</div>
                            </div>
                            
                        )
                    }))}
                    </div>
                    </div>
                </div> ))
}
export default Profil
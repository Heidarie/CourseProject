import { Col, Row } from "react-bootstrap"
import "./Profil.css"
import React, { useState, useEffect } from "react";
import { getProfil, getCurrentUser } from "../../api/Api";

const Profil = () => {


    const [loading, setLoading] = useState(true);
    const [profil, setProfil] = useState();

    useEffect(() => {
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
        loading ? (<div style={{ textAlign: "center" }}>Loading ...</div>) : (
            <div style={{ width: "50%", margin: "auto" }}>
                <h1 style={{ textAlign: "center" }}>Twój profil</h1>
                <div className="informatins">
                    <Row>
                        <Col sm>Imię:{profil.givenName} </Col><Col sm>Nazwisko:{profil.familyName} </Col>
                    </Row>
                    <hr></hr>
                    <Row><Col>Email: {profil.email}</Col></Row>
                    <hr></hr>
                    <Row><Col>Rola: {profil.role}</Col></Row>
                    <hr></hr>
                    {getCurrentUser().includes("Teacher") ? ("Abonament: Posiadasz ważny abonament") : (<Row><Col>Abonament: {profil.premiumExpiryDate ? (profil.premiumExpiryDate.split("T")[0]) : ("Brak ważnego abonamentu")}</Col></Row>)}
                </div>
            </div>))
}
export default Profil
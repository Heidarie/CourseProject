import { Col, Row } from "react-bootstrap"
import "./Profil.css"
import React, { useState, useEffect } from "react";
import { getProfil, getCurrentUser,CheckTokens } from "../../api/Api";

const Profil = () => {


    const [loading, setLoading] = useState(true);
    const [profil, setProfil] = useState();
    const [tokens, setTokens] = useState();

    useEffect(() => {

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
        loading ? (<div style={{ textAlign: "center" }}>Loading ...</div>) : (
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 Profile">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12" style={{textAlign:"center",backgroundColor:"lightblue"}}><h1>Witaj {profil.givenName}</h1></div>
                   
                </div>
                <div className="row d-flex justify-content-center py-2">
                    <div className="col-md-12 text-center">Zostały ci {tokens} kursy do zrealizowania</div>
                    <div className="col-md-12 text-center"><a className="btn btn-lg btn-block btn-outline-primary">Kup więcej</a></div>
                </div></div>
                
                
                </div> ))
}
export default Profil
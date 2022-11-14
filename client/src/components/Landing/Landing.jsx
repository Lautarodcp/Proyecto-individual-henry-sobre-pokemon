import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"

const LandingPage = () => {
    return (
        <div className="landingPage">
            
            <Link className="button" to= "/home" >
                <button className="boton">Vamos</button>
             </Link>
        </div>
    )
};

export default LandingPage;
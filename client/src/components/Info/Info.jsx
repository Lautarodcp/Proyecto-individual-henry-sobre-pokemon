import React from "react";
import "./Info";

const Info = (props) =>{
    return (
        <div className="info">
            <h1>PI Pokemon Lautaro Dalla Costa, corte 31C</h1>
            <p>
                Proyecto individual final. Es una aplicacion en la cual consultamos datos a una API externa y esto nos permite mostrar toda la informacion relacionada con los pokemons, ademas podemos crear nuevos pokemon y almacenarlos en nuestra base de datos.
                <br />
                El proyecto fue realizado con las siguientes tecnologias:
                Frontend: React y Redux.
                <br />
                Backend: Node.js y Express.js. 
                <br />
                Base de datos: PostgresSQL y Sequelize.
            </p>
        </div>
        );
    };

export default Info;
import React from 'react'
import imagen from "../../../src/img/crypto.png";

const HeaderLogin = () => {
    return (
        <div className="row">
            <h2 className="col-12 align-items-center">Bienvenidos a CryptoTransact</h2>

            <div className="d-flex justify-content-center align-items-center" id="imgLogo" >
                <img src={imagen} width={180}
                    alt="login form" className="img-fluid" styles="border-radius: 1rem"/>
            </div>
            <h5 className="fw-normal mb-3 pb-3" styles="letter-spacing: 1px;">Iniciar Sesión</h5>
        </div>
    )
}

export default HeaderLogin
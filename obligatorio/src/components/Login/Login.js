import HeaderLogin from '../Login/HeaderLogin';
import FooterLogin from '../Login/FooterLogin.js';
import React, { useRef, useState } from "react";
import background from "../../img/6807.webp";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const user = useRef(null);
    const pass = useRef(null);

    const [userDisable, setUserDisable] = useState(false);
    const [passDisable, setPassDisable] = useState(false);

    let navigate = useNavigate();


    const iniciarSesion = () => {
        const usuario = user.current.value
        const contrasenia = pass.current.value
        sessionStorage.setItem("nombre", usuario);

        fetch("https://crypto.develotion.com/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "usuario": usuario,
                "password": contrasenia,
            })
        })
            .then(r => r.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    console.log(datos);
                    sessionStorage.setItem("apiKey", datos.apiKey);
                    sessionStorage.setItem("id", datos.id);
                    navigate("/dashboard");
                }
                else {
                    toast.error("Por favor complete todos los campos");
                }
            })
    }

    return (
        <div>
            <ToastContainer/>
            <div style={{ backgroundImage: `url(${background})` }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-6">
                            <div className="card" id="cardLogin" styles="border-radius: 1rem;">
                                <div className="row g-0">
                                    <div className="col-12 d-flex align-items-center">
                                        <div className="card-body p-8 p-lg-5 text-black">
                                            <HeaderLogin />
                                            
                                            <form>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="loginUsername">Usuario</label>
                                                    <input ref={user} type="text" className="form-control form-control-lg" onChange={() => setUserDisable(true)} />

                                                    <label className="form-label" htmlFor="loginPassword">Contarseña</label>
                                                    <input ref={pass} type="password" className="form-control form-control-lg" onChange={() => setPassDisable(true)} />
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="button" disabled={!userDisable || !passDisable} onClick={iniciarSesion} >Iniciar Sesión</button>
                                                </div>
                                            </form>
                                            <FooterLogin />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
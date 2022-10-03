import imagen from "../../../src/img/crypto.png";
import { useNavigate } from "react-router-dom";
import '../../App.css'

const HeaderDashboard = () => {

    let navigate = useNavigate();
    let nombre = sessionStorage.getItem("nombre");

    const cerrarSesion = () => {
        sessionStorage.removeItem("apiKey");
        sessionStorage.removeItem("nombre");
        console.log("Sesion cerrada");
        navigate("/");
    }

    

    return (
        <div>
            <nav className="navbar navbar-light bg-light p-3" >
                <div className="d-flex">
                    <img src={imagen} width={100}
                        alt="dash form" />
                </div>
                <div>
                    <h2 className="col-12">Hola {nombre}, Bienvenido a CryptoTransact</h2>
                </div>
                <div className="col-2">
                    <button className="btn btn-secondary" type="button" onClick={cerrarSesion}>
                        Cerrar Sesión
                    </button>

                </div>
            </nav>
        </div>
    )
}

export default HeaderDashboard
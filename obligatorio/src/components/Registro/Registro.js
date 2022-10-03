import React, { useRef, useState, useEffect } from "react";
import background from "../../img/6807.webp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Registro = () => {

  let navigate = useNavigate();

  const user = useRef(null);
  const pass = useRef(null);
  const depto = useRef(null);
  const ciud = useRef(null);
  const [dptos, SetDptos] = useState([]);
  const [ciu, SetCiu] = useState([]);


  useEffect(() => {
    fetch("https://crypto.develotion.com/departamentos.php", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(r => r.json())
      .then(datos => {
        SetDptos(datos.departamentos)
      })
  }, [])

  const obtenerCiudad = e => {
    const departamento = depto.current.value;
    fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${departamento}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"//,
      }
    })
      .then(r => r.json())
      .then(datos => {
        SetCiu(datos.ciudades)
      })

  }

  const registrar = () => {
    const usuario = user.current.value
    const contrasenia = pass.current.value
    const departamento = depto.current.value
    const ciudad = ciud.current.value

    fetch("https://crypto.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "usuario": usuario,
        "password": contrasenia,
        "idDepartamento": departamento,
        "idCiudad": ciudad
      })
    })
      .then(r => r.json())
      .then(datos => {
        if (datos.codigo === 200) {
          sessionStorage.setItem("nombre", usuario);
          sessionStorage.setItem("apiKey", datos.apiKey);
          sessionStorage.setItem("id", datos.id);
          navigate("/dashboard");
        }
        else {
          toast.error("Usuario existente");
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
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-12">
                    <div className="card-body p-md-5 text-black">

                      <h3 className="mb-5 text-uppercase">Registrese</h3>
                        
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="form-outline">
                            <label className="form-label" htmlFor="registroUsername">Usuario</label>
                            <input ref={user} type="text" className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="registroPassword">Contraseña</label>
                            <input ref={pass} type="password" className="form-control form-control-lg" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <select className="form-select mb-4" aria-label="Default select example" ref={depto} onChange={obtenerCiudad}>
                          <option value="-1">Seleccione un Departamento...</option>
                          {dptos.map(e => (
                            <option key={e.id} value={e.id} >{e.nombre}</option>
                          ))}
                        </select>
                        <select className="form-select mb-4" aria-label="Default select example" ref={ciud}>
                          <option value="-1">Seleccione una Ciudad...</option>
                          {ciu.map(e => (
                            <option key={e.id} value={e.id}>{e.nombre}</option>
                          ))}
                        </select>
                      </div>

                      <div className="d-flex justify-content-center pt-3">
                        <button type="button" className="btn btn-warning btn-lg ms-2" onClick={registrar}>Registrarse</button>
                      </div>

                      <p className="mb-5 pb-lg-2" styles="color: #393f81;">¿Ya tiene cuenta? <Link to="/">Inicia Sesión</Link></p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p><em><strong>By Guillermo Cardozo</strong></em></p>
    </div>
  )
}

export default Registro
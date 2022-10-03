import React from 'react'
import {Link} from "react-router-dom";

const FooterLogin = () => {
  return (
    <div>
        <a className="small text-muted" href="#!">¿Olvido su contraseña?</a>
        <p className="mb-5 pb-lg-2" styles="color: #393f81">¿Aún no tiene una cuenta? <Link to="/registro">Regístrese aquí</Link></p>
        <a href="#!" className="small text-muted">Términos y Condiciones</a>
        <a href="#!" className="small text-muted"> Política de Privacidad</a>
        <p><em><strong>By Guillermo Cardozo</strong></em></p>
    </div>
  )
}

export default FooterLogin
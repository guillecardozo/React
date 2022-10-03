import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AgregarTransaccion = () => {
    const [monedas, SetMonedas] = useState([]);
    const [cotizaciones, SetCotizaciones] = useState(null);

    const moneda = useRef(null);
    const operacion = useRef(null);
    const amount = useRef(null);
    let valor = useRef(null);

    let apiKey = sessionStorage.getItem("apiKey");
    const idUsuario = sessionStorage.getItem("id");

    useEffect(() => {
        fetch(`https://crypto.develotion.com/monedas.php`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            }
        })
            .then(r => r.json())
            .then(datos => {
                SetMonedas(datos.monedas)
            })
    }, [])


    const ObtenerCotizaciones = () => {
        const m = moneda.current.value;
        fetch(`https://crypto.develotion.com/monedas.php`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            }
        })
            .then(r => r.json())
            .then(datos => {
                const o = datos.monedas.find(mo => mo.id == m)//Si pongo === no me los compara
                SetCotizaciones(o.cotizacion);
            })
    }


    const RealizarTransaccion = () => {

        const mon = moneda.current.value
        const tipoOperacion = operacion.current.value
        const cantidad = amount.current.value


        fetch("https://crypto.develotion.com/transacciones.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            },
            body: JSON.stringify({
                "idUsuario": idUsuario,
                "tipoOperacion": tipoOperacion,
                "moneda": mon,
                "cantidad": cantidad,
                "valorActual": cotizaciones
            })
        })
            .then(r => r.json())
            .then(datos => {
                if (datos.codigo === 200) {
                    toast.success("Transacción ingresada con éxito", { theme: 'light' })
                }
                else {
                    toast.error("La transacción no ha sido ingresada");
                }
            })
    }

    return (
        <div>
            <ToastContainer />
            <h5 className="card-header">Agregar una Transacción</h5>

            <div className="card-body">
                <select className="form-select mb-4" aria-label="Default select example" ref={operacion}>
                    <option value="-1">Seleccione una Operación...</option>
                    <option value="1" >Compra</option>
                    <option value="2" >Venta</option>
                </select>

                <select className="form-select mb-4" aria-label="Default select example" onChange={ObtenerCotizaciones} ref={moneda}>
                    <option value="-1">Seleccione una Moneda...</option>
                    {monedas.map(e => (
                        <option key={e.id} value={e.id} >{e.nombre}</option>
                    ))}
                </select>

                <div>
                    <label className="form-label" htmlFor="cantidad">Cantidad</label>
                    <input ref={amount} type="number" className="form-control form-control-lg" />
                </div>

                <div>
                    <label className="form-label" ref={valor} htmlFor="valorActual">Valor Actual: U${cotizaciones}</label>
                </div>

                <div className="d-flex justify-content-center pt-3">
                    <button type="button" className="btn btn-warning btn-lg ms-2" onClick={RealizarTransaccion}>Agregar Transacción</button>
                </div>
            </div>
        </div>
    )
}

export default AgregarTransaccion
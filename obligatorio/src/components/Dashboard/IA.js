import React, { useRef, useState, useEffect } from "react";
import '../../App.css'


const IA = () => {

    let apiKey = sessionStorage.getItem("apiKey");
    const idUsuario = sessionStorage.getItem("id");

    const [mensaje, SetMensaje] = useState("");
    const [sugerencia, SetSugerencia] = useState("");
    const [monedas, SetMonedas] = useState([]);
    const [ultimaOperacion, SetUltimaOperacion] = useState([]);
    const [cotizaciones, SetCotizaciones] = useState(null);
    const [cotizacionesActuales, SetCotizacionesActuales] = useState(null);

    const moneda = useRef(null);
    let valor = useRef(null);


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


    const ObtenerCotizacionesActuales = () => {
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
                const o = datos.monedas.find(mo => mo.id == m)
                SetCotizacionesActuales(o.cotizacion);

            })
    }


    const ObtenerUltimaTransaccion = () => {

        const m = moneda.current.value;

        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${idUsuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            }
        })
            .then(r => r.json())
            .then(datos => {
                let o = datos.transacciones.reverse()
                o = datos.transacciones.find(mo => mo.moneda == m)
                console.log(o);
                if (o !== undefined) {

                    SetUltimaOperacion(o.tipo_operacion)
                    SetCotizaciones(o.valor_actual)
                    console.log("Cotizacion de ese momento :" + o.valor_actual);
                    ObtenerCotizacionesActuales();
                    console.log("Cotizaciones actuales de la moneda: " + cotizacionesActuales);

                    if (o.tipo_operacion === 1) {//SI ES COMPRA

                        if (cotizaciones < cotizacionesActuales) {
                            SetSugerencia("Es un buen momento para vender!");
                        } else if (cotizaciones === cotizacionesActuales) {
                            SetSugerencia("Recomendamos no realizar transacciones");
                        } else {
                            SetSugerencia("Es un buen momento para comprar!");
                        }

                    } else if (o.tipo_operacion === 2) {//SI ES VENTA

                        if (cotizaciones < cotizacionesActuales) {
                            SetSugerencia("Es un buen momento para vender!");
                        } else if (cotizaciones === cotizacionesActuales) {
                            SetSugerencia("Recomendamos no realizar transacciones");
                        } else {
                            SetSugerencia("Es un buen momento para comprar!");
                        }
                    }

                } else {
                    SetMensaje("No se registran transacciones para esta moneda");
                }
            })

        SetMensaje("")
        SetCotizaciones(0);
        SetCotizacionesActuales(0);
        SetSugerencia("");
    }


    return (
        <div>
            <div className="col-12">
                <div className="card-body">
                    <div >

                        <h5 className="card-header">Aumenta tus ganancias! </h5>
                        <p id="sugerencia"><strong>{mensaje}</strong></p>
                        <select className="form-select mb-4" aria-label="Default select example" ref={moneda} onChange={ObtenerUltimaTransaccion}>
                            <option value="-1">Seleccione una Moneda...</option>
                            {monedas.map(e => (
                                <option key={e.id} value={e.id} >{e.nombre}</option>
                            ))}
                        </select>

                        <div>
                            <p className="form-label" ref={valor} htmlFor="valorActual">Usted {ultimaOperacion === 1 ? "compró" : "vendió"} con esta moneda a: ${cotizaciones} c/u</p>
                            <p className="form-label">La cotización actual es de: ${cotizacionesActuales} c/u</p>
                        </div>

                        <h5>Sugerencia: {sugerencia}</h5>
                        <p onChange={ObtenerUltimaTransaccion}></p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default IA
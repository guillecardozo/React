import React, { useState } from "react";

const ObtenerTransacciones = () => {

    const [transacciones, SetTransacciones] = useState([]);
    let apiKey = sessionStorage.getItem("apiKey");
    const idUsuario = sessionStorage.getItem("id");

    const Transacciones = () => {
        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${idUsuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            }
        })
            .then(r => r.json())
            .then(datos => {
                if (datos.codigo >= 200) {
                    SetTransacciones(datos.transacciones)
                }
            })
    }

    return (
        <div>
            <div className="col-12">
                <div className="card">
                    <h5 className="card-header">Listar Transacciones</h5>
                    <div className="card-body">
                        <div>
                            {transacciones.map(e => (
                                <table className="table table-striped" key={e.id}>
                                    <thead>
                                        <tr>
                                            <th>Tipo de operación</th>
                                            <th>Moneda</th>
                                            <th>Cantidad</th>
                                            <th>Cotización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{e.tipo_operacion === 1 ? "Compra" : "Venta"}</td>
                                            <td>{e.moneda == 1 ? 'Vintereum' :
                                                e.moneda == 2 ? 'Pesocoin' :
                                                e.moneda == 3 ? 'Monereum' :
                                                e.moneda == 4 ? 'Finance URU' :
                                                e.moneda == 5 ? 'MvdCoin' :
                                                e.moneda == 6 ? 'Hexagon' :
                                                e.moneda == 7 ? 'Guitchain' :
                                                e.moneda == 8 ? 'Money Token' : 'MDG'}
                                            </td>
                                            <td>{e.cantidad}</td>
                                            <td>{e.valor_actual}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                            <div className="d-flex justify-content-center pt-3">
                                <button type="button" className="btn btn-warning btn-lg ms-2" onClick={Transacciones}>Obtener Transacciones</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ObtenerTransacciones
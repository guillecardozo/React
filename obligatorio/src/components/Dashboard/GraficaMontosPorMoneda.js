import React, { useState, useRef} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GraficaMontosPorMoneda = () => {

    let apiKey = sessionStorage.getItem("apiKey");
    let idUsuario = sessionStorage.getItem("id");

    const operacion = useRef(null);

    const [transacciones, SetTransacciones] = useState([]);
    const [monedas, SetMonedas] = useState([]);
    
    let transactions = [];

    const CrearGrafica = () => {
        const tipoOp = operacion.current.value;

        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${idUsuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "apikey": apiKey
            }
        })
            .then(r => r.json())
            .then(datos => {
                transactions = datos.transacciones.filter(p => p.tipo_operacion == tipoOp)
                SetTransacciones(transactions.map(e=> e.valor_actual * e.cantidad));
            })


            fetch(`https://crypto.develotion.com/monedas.php`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": apiKey
                }
            })
                .then(r => r.json())
                .then(datos => {
                    SetMonedas(datos.monedas);
                })
    }


    return (
        <div>
            <div className="card">
                <h5 className="card-header">Gráfico de totales por operación/moneda</h5>
                <div className="card-body">
                    <div>

                        <div className="d-flex justify-content-center pt-3">
                            <select className="form-select mb-4" aria-label="Default select example" ref={operacion}>
                                <option value="-1">Seleccione una Operación...</option>
                                <option value="1" >Compra</option>
                                <option value="2" >Venta</option>
                            </select>

                            <button type="button" className="btn btn-warning btn-lg ms-2" onClick={CrearGrafica}>Graficar</button>

                        </div>
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <Bar options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Montos',
                                },
                            },
                        }} data={{
                            labels: monedas.map(e => e.nombre),
                            datasets: [
                                {
                                    label: 'Totales',
                                    data: transacciones,
                                    backgroundColor: '#FFC107',
                                }
                            ],
                        }} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GraficaMontosPorMoneda
import React, { useState, useRef, useEffect } from "react";
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

const GraficaMoneda = () => {

    const [monedas, SetMonedas] = useState([]);
    let apiKey = sessionStorage.getItem("apiKey");
    let idUsuario = sessionStorage.getItem("id");
    const moneda = useRef(null);
    const graf = useRef(null);
    const [transacciones, SetTransacciones] = useState([]);
    let cotizaciones = [];

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

    const CrearGrafica = () => {
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
                cotizaciones = datos.transacciones.filter(p => p.moneda == m)
                
                SetTransacciones(cotizaciones.map(e => e.valor_actual));

            })
    }

    return (
        <div>
            <div className="card">
                <h5 className="card-header">Gráfico de cotizaciones por moneda</h5>
                <div className="card-body">
                    <div ref={graf}>
                        <div className="d-flex justify-content-center pt-3">
                            <select className="form-select mb-4" aria-label="Default select example" ref={moneda}>
                                <option value="-1">Seleccione una Moneda...</option>
                                {monedas.map(e => (
                                    <option key={e.id} value={e.id} >{e.nombre}</option>
                                ))}
                            </select>

                            <button type="button" className="btn btn-warning btn-lg ms-2" onClick={CrearGrafica}>Graficar</button>
                        </div>
                    </div>
                </div>
                <Bar options={{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Cotizaciones de las monedas',
                },
            },
        }} data={{
            labels: transacciones,
            datasets: [
                {
                    label: 'Cotizaciones',
                    data: transacciones,
                    backgroundColor: '#FFC107',
                }
            ],
        }} />
            </div>

        </div>
    )
}

export default GraficaMoneda
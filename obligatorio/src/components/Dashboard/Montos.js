import React, { useState, useEffect } from "react";

const Montos = () => {
    let apiKey = sessionStorage.getItem("apiKey");
    const idUsuario = sessionStorage.getItem("id");
    
    const [compras, SetCompras] = useState(0);
    const [ventas, SetVentas] = useState(0);
    const [transacciones, SetTransacciones] = useState([]);

    useEffect(() => {
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
                    let compras = datos.transacciones.filter(p => p.tipo_operacion == 1)
                    let ventas = datos.transacciones.filter(p => p.tipo_operacion == 2)
                    
                    let totalDeCompras = 0;
                    let totalDeVentas = 0;
                    
                    SetTransacciones(datos.transacciones);
                    for (let index = 0; index < compras.length; index++) {
                        const element = compras[index];
                        totalDeCompras = totalDeCompras + element.valor_actual * element.cantidad
                        SetCompras(totalDeCompras)
                    }

                    for (let index = 0; index < ventas.length; index++) {
                        const element = ventas[index];
                        totalDeVentas = totalDeVentas + element.valor_actual * element.cantidad
                        SetVentas(totalDeVentas)
                    }
                }
            })
    }, [transacciones])


    return (

        <div className="col-12">
            <div className="card-body">

                <p className="h1">Ganancias Totales U$ :</p>
                <p className="h2" id="montos">{ventas - compras}</p>
            </div>
        </div>
    )

}

export default Montos
import GraficaMoneda from "./GraficaMoneda";
import GraficaMontosPorMoneda from "./GraficaMontosPorMoneda";
import ObtenerTransacciones from "./ObtenerTransacciones";
import HeaderDashboard from "./HeaderDashboard";
import AgregarTransaccion from "./AgregarTransaccion";
import FooterDashboard from "./FooterDashboard";
import IA from "./IA";
import Montos from "./Montos";
import '../../App.css'


const Dashboard = () => {

    return (
        <div id="dash">
            <HeaderDashboard/>
            <Montos/>
            <ObtenerTransacciones/>
            
            <div className="row">
                <div className="col-6">
                    <div className="card" id="card1">
                        <div className="card-body">
                            <GraficaMoneda />
                        </div>
                    </div>
                </div>
                
                <div className="col-6">
                    <div className="card" id="card1">
                        <div className="card-body">
                            <GraficaMontosPorMoneda />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="card" id="card1">
                        <div className="card-body">
                            <AgregarTransaccion />
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <div className="card" id="card1">
                        <div className="card-body">
                            <IA />
                        </div>
                    </div>
                </div>
            </div>

            <FooterDashboard/>

        </div>
    )
}

export default Dashboard
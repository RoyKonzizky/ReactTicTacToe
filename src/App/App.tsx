import {Link} from "react-router-dom";

function App() {

    return (
        <div>
            <Link to="/pvpmenu">
                <button><img src={'.assets/rocklee_vs_garra.jpg'} alt="PvP"/></button>
            </Link>

            <Link to="/cpumenu">
                <button><img src={'.assets/humans-vs-robots.jpg'} alt="vs CPU"/></button>
            </Link>
        </div>
    );
}

export default App;

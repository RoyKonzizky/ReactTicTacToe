import {Link} from "react-router-dom";

function App() {

    return (
        <div>
            <Link to="/pvpmenu">
                <button className="pvpButton" type="button">
                    duel another human(fight to the death)
                </button>
            </Link>
            <Link to="/cpumenu">
                <button className="vsCpuButton" type="button">
                    duel the machine(screw skynet)
                </button>
            </Link>
        </div>
    );
}

export default App;

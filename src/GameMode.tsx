import {Link} from "react-router-dom";
import "./GameMode.css";

let playerCount = 0;
function GameMode() {
    return (
        <div>
            <div id={"buttonContainer"}>
                <Link to="/App">
                    <button className={"button"} id="pvpButton" type="button" onClick={() => {playerCount = 2}}>
                        play vs another human
                    </button>
                </Link>
                <Link to="/App">
                    <button className={"button"} id="vsCpuButton" type="button" onClick={() => {playerCount = 1}}>
                        play vs pc
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default GameMode;playerCount;

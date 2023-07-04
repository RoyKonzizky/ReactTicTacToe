import {Link} from "react-router-dom";

function GameMode() {

    return (
        <div>
            <Link to="/game">
                <button className="pvpButton" type="button">
                    Submit Player Sign and Name
                </button>
            </Link>
            <Link to="">
                <button className="vsCpuButton" type="button">
                    Submit Player Sign and Name
                </button>
            </Link>
        </div>
    );
}

export default GameMode;

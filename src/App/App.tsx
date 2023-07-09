import "./App.css";
import { Link } from "react-router-dom";
import rockleevsgaara from "../assets/rocklee_vs_gaara.jpg";
import humansvsrobots from "../assets/humans-vs-robots.jpg";

function App() {
  return (
    <div id={"main"}>
      <div id={"div1"}>
        <button className={"buttons"}>
          <Link className={"links"} to="/pvpmenu">
            <img className={"images"} src={rockleevsgaara} alt="PvP" />
          </Link>
        </button>
      </div>

      <div id={"div2"}>
        <button className={"buttons"}>
          <Link className={"links"} to="/cpumenu">
            <img className={"images"} src={humansvsrobots} alt="PvPC" />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default App;

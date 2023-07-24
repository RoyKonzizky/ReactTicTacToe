import "./LeaderBoard.css";
import "./LeaderBoard.Styled.ts";
import playersData from "./playersData.json";

function LeaderBoard() {

    function createTable() {
        return (
            <table>
                <thead>
                <tr>
                    <th className="contents">Player Name</th>
                    <th className="contents">Player Score</th>
                </tr>
                </thead>
                <tbody>
                {playersData.map((player, index) => (
                    <tr key={index}>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <div className={"headDiv"}>{createTable()}</div>
        </div>
    );
}

export default LeaderBoard;

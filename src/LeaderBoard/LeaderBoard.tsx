import "./LeaderBoard.css"
import "./LeaderBoard.Styled.ts"
import {player1, player2} from "../PlayableCharacters/Player.ts";

function LeaderBoard() {
    function createTable() {
        const listOfPlayers = [[player1.name, player1.score], [player2.name, player2.score]];
        return (
            <table>
                <thead>
                <tr>
                    <th className="contents">Player Name</th>
                    <th className="contents">Player Score</th>
                </tr>
                </thead>

                {listOfPlayers.map((player) => (
                    <tbody key={player[0]}>
                    <tr>
                        <th>{player[0]}</th>
                        <th>{player[1]}</th>
                    </tr>
                    </tbody>
                ))}
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

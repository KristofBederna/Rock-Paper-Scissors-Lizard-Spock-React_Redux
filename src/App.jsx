import { useSelector, useDispatch } from 'react-redux';
import { newGame, changeMode, aiRound } from './actions';
import './App.css';
import ChoiceList from './view/ChoiceList';
import main from '/main.png';
import { FIG, getGameResult } from './utils/utils';

function App() {
  let id = 0;
  const dispatch = useDispatch();
  const startNewGame = () => {
    dispatch(newGame());
  };
  const changeGameMode = () => {
    dispatch(changeMode());
  };
  const gameMode = useSelector((state) => state.isExtended)
  const selectAiAction = () => {
    let choices = [FIG.PAPER, FIG.ROCK, FIG.SCISSORS, FIG.SPOCK, FIG.LIZARD];
    let basicRandomNumber = Math.floor(Math.random() * 3);
    let extendedRandomNumber = Math.floor(Math.random() * 5);
    let choice;
    if (gameMode) {
      choice = choices[extendedRandomNumber];
    } else {
      choice = choices[basicRandomNumber];
    }
    dispatch(aiRound(choice));
  };
  const playerChose = useSelector((state) => state.round.player);

  const history = useSelector((state) => state.history);
  return (
    <>
      <h1>ROCK PAPER SCISSORS LIZARD SPOCK</h1>
      <div className='container full-width'>
        <img src={main} className="main-logo"></img>
        <button onClick={startNewGame}>New Game</button>

      </div>
      <div className='container left'>
        <div className="border">
          <ChoiceList isPlayer={false}></ChoiceList>
          <h2>AI</h2>
          <button disabled={!playerChose} onClick={selectAiAction}>AI</button>
        </div>
        <div className="border">
          <h2>PLAYER</h2>
          <ChoiceList isPlayer={true}></ChoiceList>
        </div>
        <button onClick={startNewGame}>New Game</button>

        <button onClick={changeGameMode}>Change Mode</button>
      </div>
      <div className='container right'>
        <table className='history-table'>
          <thead>
            <tr>
              <th>Winner</th>
              <th>Player</th>
              <th>AI</th>
            </tr>
          </thead>
          <tbody>
            {history.map(history =>
              <tr key={id++}>
                <td>{history.winner}</td>
                <td>{history.player}</td>
                <td>{history.ai}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div >
    </>
  )
}

export default App

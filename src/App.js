import Board from "./components/Board";
import Ships from "./components/ShipList";
import { toast } from "react-toastify";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useContext } from 'react';
import ShipContext from './ShipContext';

import { battleShipMapValidator } from "./battleShip";

function App() {
  const { rotateShip, shipType, shipsInfo } = useContext(ShipContext);
  var gameBoard;

  const onReady = () => {
    gameBoard = [...Array(10)].map(e => Array(10).fill("0"));
    console.log("Preaparing for the battle")
    for (let key in shipsInfo) {
      if (key != "0") {
        if (shipsInfo[key][0] == -1 && shipsInfo[key][1] == -1) {
          console.log("You should place all ships you have")
          return
        }
      }
    }

    for (let key in shipsInfo) {
      let x = shipsInfo[key][0] - 1;
      let y = shipsInfo[key][1] - 1;
      let direction = shipsInfo[key][2]
      let shipLen = shipsInfo[key][3]

      if (!direction || !shipLen) continue
      if (x < 0 || x > 9) continue
      if (y < 0 || y > 9) continue

      if (direction == "horizontal") {
        for (let i = 0; i < shipLen; i++) {
          gameBoard[y][x++] = "1"
        }
      }
      else if (direction == "vertical") {
        for (let i = 0; i < shipLen; i++) {
          gameBoard[y++][x] = "1"
        }
      }
    }
    console.log("ship placement is okey")
    if (!battleShipMapValidator(gameBoard)) {
      toast.error("Please create valid map.");
    } else {
      toast.success("Waiting for opponent.")
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Board key={"myboard"} enemyBoard={false} />
      <Ships />
      <div style={{ marginTop: "10px", display: "flex" }}>
        <button onClick={() => {
          rotateShip(shipType)
        }}> Rotate </button>
        <p style={{ marginLeft: "50px", fontSize: "30px" }}>{shipType}</p>
        <button onClick={onReady}>Ready</button>

      </div>
    </DndProvider>

  );
}

export default App;

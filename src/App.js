import Board from "./components/Board";
import Ships from "./components/ShipList";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useContext } from 'react';
import ShipContext from './ShipContext';

function App() {
  const { rotateShip, shipType } = useContext(ShipContext);


  return (
    <DndProvider backend={HTML5Backend}>
      <Board key={"myboard"} enemyBoard={false} />
      {/* <Board key={"enemyboard"} enemyBoard={true} /> */}
      <Ships />
      <div style={{ marginTop: "10px", display: "flex" }}>
        <button onClick={() => {
          rotateShip(shipType)
        }}> Rotate </button>
        <p style={{ marginLeft: "50px", fontSize: "30px" }}>{shipType}</p>
      </div>
    </DndProvider>

  );
}

export default App;

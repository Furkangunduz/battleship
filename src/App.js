import Board from "./components/Board";
import Ships from "./components/ShipList";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ShipProvider } from "./ShipContext"

function App() {
  return (
    <ShipProvider>
      <DndProvider backend={HTML5Backend}>
        <Board key={"myboard"} enemyBoard={false} />
        {/* <Board key={"enemyboard"} enemyBoard={true} /> */}
        <Ships />
      </DndProvider>
    </ShipProvider>
  );
}

export default App;

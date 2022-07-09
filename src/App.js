import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board key={"myboard"} enemyBoard={false} />
      {/* <Board key={"enemyboard"} enemyBoard={true} /> */}
      <Items />
    </DndProvider>)
}

export default App;

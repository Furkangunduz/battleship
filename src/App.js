import { Route, Routes } from "react-router-dom"

import CreateMap from "./pages/CreateMap";
import WaitingPage from "./pages/WaitingPage";
import Home from "./pages/Home";
import Battle from "./pages/Battle"
import { useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const navigate = useNavigate();

  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Home navigate={navigate} />} />
        <Route path="/waiting/:userName/:roomName" element={<WaitingPage navigate={navigate} />} />
        <Route path="/create-map/:userName/:roomName" element={<CreateMap navigate={navigate} />} />
        <Route path="/battle" element={<Battle navigate={navigate} />} />
      </Routes>
    </DndProvider>)
}

export default App;

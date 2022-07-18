import { Route, Routes } from "react-router-dom"

import CreateMap from "./pages/CreateMap";
import WaitingPage from "./pages/WaitingPage";
import Home from "./pages/Home";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home navigate={navigate} />} />
        <Route path="/waiting" element={<WaitingPage navigate={navigate} />} />
        <Route path="/create-map" element={<CreateMap navigate={navigate} />} />
      </Routes>
    </>)
}

export default App;

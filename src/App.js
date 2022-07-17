import { Route, Routes } from "react-router-dom"

import CreateMap from "./pages/CreateMap";
import WaitingPage from "./pages/WaitingPage";
import Home from "./pages/Home";

function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/create-map" element={<CreateMap />} />
    </Routes>
  </>)
}

export default App;

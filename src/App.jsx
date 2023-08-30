import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PagLogin from "./componentes/PagLogin";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Página Inicial</h1>}/>
      <Route path="/login" element={<PagLogin/>}/>
      <Route path="*" element={<h1>Página não encontrada</h1>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

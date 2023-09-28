import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PagLogin from "./pages/PagLogin";
import Dashboard from "./pages/Dashboard";

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<PagLogin/>}/>
          <Route path="/" element={<h1>Página Inicial</h1>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<h1>Página não encontrada</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

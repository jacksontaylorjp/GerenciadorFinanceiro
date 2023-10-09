import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PagLogin from "./pages/PagLogin";
import Dashboard from "./pages/Dashboard";
import PagInicial from "pages/PagInicial";
import RotaProtegida from "auth/RotaProtegida";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagInicial />} />
        <Route path="/login" element={<PagLogin />} />

        <Route path="/" element={<RotaProtegida />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teste" element={<h1>Teste</h1>} />
        </Route>

        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

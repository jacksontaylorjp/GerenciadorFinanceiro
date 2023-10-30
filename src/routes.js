import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PagLogin from "./pages/PagLogin";
import Dashboard from "./pages/Dashboard";
import PagInicial from "pages/PagInicial";
import RotaProtegida from "auth/RotaProtegida";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* Componente toast principal. Server para todas as páginas, pois está na raiz da aplicação.*/}
      < ToastContainer
        position='top-center'
      />
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
    </>
  );
}

export default App;

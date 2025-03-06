import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormViagem from "./components/viagens/formviagem/FormViagem";
import ListarViagens from "./components/viagens/listarviagens/ListarViagens";
import DeletarViagem from "./components/viagens/deletarviagem/DeletarViagem";


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <div className="min-h-[90vh] bg-gray-200">
            <Routes>
              <Route path="/viagens" element={<ListarViagens />} />
              <Route path="/cadastrarviagens" element={<FormViagem />} />
              <Route path="/atualizarviagens/:id" element={<FormViagem />} />
              <Route path="/deletarviagem/:id" element={<DeletarViagem />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

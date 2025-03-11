import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar/NavBar";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Perfil from "./pages/perfil/Perfil";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import ListarVeiculos from "./components/veiculos/listarveiculos/ListarVeiculos";
import DeletarVeiculo from "./components/veiculos/deletarveiculo/DeletarVeiculo";
import FormVeiculo from "./components/veiculos/formveiculo/FormVeiculo";
import Sobre from "./pages/sobre/Sobre";
import ListarViagens from "./components/viagens/listarviagens/ListarViagens";
import DeletarViagem from "./components/viagens/deletarviagem/DeletarViagem";
import FormViagem from "./components/viagens/formviagem/FormViagem";
import { CartProvider } from "./context/CardContext";
import Cart from "./components/carrinho/Cart";
import DictionaryProvider from "./context/DictionaryProvider";
import ThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <CartProvider>
            <AuthProvider>
              <ToastContainer />
              <DictionaryProvider>
                <NavBar />
                <div className="bg-app w-full min-h-screen pt-13">
                  <div className="bg-app-black w-full min-h-screen">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/perfil" element={<Perfil />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/cadastro" element={<Cadastro />} />
                      <Route path="/veiculos" element={<ListarVeiculos />} />
                      <Route
                        path="/veiculos/deletar/:id"
                        element={<DeletarVeiculo />}
                      />
                      <Route
                        path="/veiculos/cadastrar"
                        element={<FormVeiculo />}
                      />
                      <Route
                        path="/veiculos/editar/:id"
                        element={<FormVeiculo />}
                      />
                      <Route path="/sobre" element={<Sobre />} />
                      <Route path="/viagens" element={<ListarViagens />} />
                      <Route
                        path="/viagens/deletar/:id"
                        element={<DeletarViagem />}
                      />
                      <Route
                        path="/viagens/cadastrar"
                        element={<FormViagem />}
                      />
                      <Route
                        path="/viagens/editar/:id"
                        element={<FormViagem />}
                      />
                      <Route path="/carrinho" element={<Cart />} />
                    </Routes>
                  </div>
                </div>
                <Footer />
              </DictionaryProvider>
            </AuthProvider>
          </CartProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

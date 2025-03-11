/* eslint-disable @typescript-eslint/no-explicit-any */
// Cadastro.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../service/Service";
import { Eye, EyeClosed } from "phosphor-react";
import { RotatingLines } from "react-loader-spinner";
import "./Cadastro.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../util/ToastAlerta";
import { useTheme } from "../../context/ThemeContext";

function Cadastro() {
  const [usuario, setUsuario] = useState<Usuario>({
    cpf: "",
    nome: "",
    data_nascimento: "",
    tipo_usuario: "",
    telefone: "",
    usuario: "",
    senha: "",
    foto: "",
  });
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const atualizarEstado = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const cadastrar = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
      ToastAlerta("Usuário cadastrado com sucesso!", "sucesso", theme);
      navigate("/login");
      setUsuario({
        id: 0,
        cpf: "",
        nome: "",
        data_nascimento: "",
        tipo_usuario: "",
        telefone: "",
        usuario: "",
        senha: "",
        foto: "",
        viagem: "",
        criado_em: "",
        atualizado_em: "",
      });
    } catch (error: any) {
      console.log(error);
      ToastAlerta(
        "Erro ao cadastrar. Tente novamente! " + error.response.data.message,
        "erro",
        theme
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="background-container">
      <div className="form-container">
        <h2 className="text-3xl font-bold text-center mb-6">Cadastrar</h2>
        <form onSubmit={cadastrar}>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            className="form-input"
            value={usuario.cpf}
            onChange={atualizarEstado}
          />

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            className="form-input"
            value={usuario.nome}
            onChange={atualizarEstado}
          />

          <label htmlFor="data_nascimento">Data de Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            className="form-input"
            value={usuario.data_nascimento}
            onChange={atualizarEstado}
          />

          <label htmlFor="tipo_usuario">Tipo de Usuário</label>
          <select
            name="tipo_usuario"
            className="form-input"
            value={usuario.tipo_usuario}
            onChange={atualizarEstado}
          >
            <option value="">Selecione</option>
            <option value="Motorista">Motorista</option>
            <option value="Passageiro">Passageiro</option>
          </select>

          <label htmlFor="telefone">Telefone</label>
          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            className="form-input"
            value={usuario.telefone}
            onChange={atualizarEstado}
          />

          <label htmlFor="usuario">E-mail</label>
          <input
            type="email"
            name="usuario"
            placeholder="Usuário"
            className="form-input"
            value={usuario.usuario}
            onChange={atualizarEstado}
          />

          <label className="block text-gray-700">Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              name="senha"
              className="form-input pr-10"
              placeholder="Digite sua senha"
              value={usuario.senha}
              onChange={atualizarEstado}
            />
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
            </span>
          </div>

          <label htmlFor="foto" className="block text-gray-700 mb-2 mr-2">
            Foto
          </label>
          <input
            type="string"
            name="foto"
            className="form-input"
            onChange={atualizarEstado}
          />

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <button type="reset" className="form-button cancel">
              <Link to={"/login"}>Cancelar</Link>
            </button>
            <button type="submit" className="form-button submit">
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;

/* eslint-disable @typescript-eslint/no-explicit-any */
// Cadastro.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../service/Service";
import { Eye, EyeClosed } from "phosphor-react";
import { RotatingLines } from "react-loader-spinner";
import "./Cadastro.css";
import { Link } from "react-router-dom";

function Cadastro() {
  const [usuario, setUsuario] = useState<Usuario>({
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

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);

  const atualizarEstado = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const cadastrar = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErro(null);
    setSucesso(null);

    const formData = new FormData();
    Object.entries(usuario).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await cadastrarUsuario("/usuarios/cadastrar", formData, () => {});
      setSucesso("Usuário cadastrado com sucesso!");
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
      setErro("Erro ao cadastrar. Tente novamente!");
    } finally {
      setIsLoading(false);
    }
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
            type="file"
            name="foto"
            className="border-2 rounded p-2"
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                setUsuario({ ...usuario, foto: URL.createObjectURL(file) });
              }
            }}
          />

          {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}
          {sucesso && (
            <p className="text-green-500 text-center mb-4">{sucesso}</p>
          )}

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

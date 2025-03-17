/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Veiculo from "../../../models/Veiculo";
import Viagem from "../../../models/Viagens";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { formatarDataSubmit } from "../../../util/FormatarData";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { useDictionary } from "../../../context/DictionaryProvider";
import { useTheme } from "../../../context/ThemeContext";

function FormViagem() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const { translate } = useDictionary();
  const { theme } = useTheme();

  const [veiculo, setVeiculo] = useState<Veiculo>({
    id: 0,
    modelo: "",
    placa: "",
    foto: "",
    marca: "",
    ano: "",
    cor: "",
    categoria: "",
    combustivel: "",
    capacidade: 0,
    assentos_disponiveis: 0,
    criado_em: "",
    atualizado_em: "",
  });

  const [viagem, setViagem] = useState<Viagem>({} as Viagem);
  const [dataAlterada, setDataAlterada] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarViagemPorId(id: string) {
    try {
      await buscar(`/viagens/${id}`, setViagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Viagem não encontrada!", "erro", theme);
        retornar();
      }
    }
  }

  async function buscarVeiculoPorId(id: string) {
    try {
      await buscar(`/veiculos/${id}`, setVeiculo, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Veículo não Encontrado!", "erro", theme);
        retornar();
      }
    }
  }

  async function buscarVeiculos() {
    try {
      await buscar(`/veiculos`, setVeiculos, {
        headers: { Authorization: token },
      });
      console.log(veiculos);
    } catch (error: any) {
      console.log(error);
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "info", theme);
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    buscarVeiculos();
    if (id) {
      buscarViagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    if (veiculo.id !== 0) {
      setViagem((prevState) => ({
        ...prevState,
        veiculo: veiculo,
        usuario: usuario,
      }));
    }
  }, [veiculo]);

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const novaData = e.target.value;
    if (!novaData) {
      console.error("Data fornecida é inválida", novaData);
    }
    setViagem((prev) => ({ ...prev, data_hora_partida: novaData }));
    setDataAlterada(true);
  };

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    setViagem((prevState) => ({
      ...prevState,
      status_viagem: parseInt(e.target.value),
    }));
  }

  function handleVeiculoChange(e: ChangeEvent<HTMLSelectElement>) {
    const selectedId = e.target.value;
    if (selectedId) {
      buscarVeiculoPorId(selectedId);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { type, name, value } = e.target;

    let valor: string | number = value;

    switch (type) {
      case "number":
      case "range":
        valor = value === "" ? "" : parseFloat(Number(value).toFixed(2));
        break;
      case "date":
        valor = value;
        break;
      default:
        if (!isNaN(Number(value)) && value !== "") {
          valor = parseFloat(Number(value).toFixed(2));
        }
    }

    setViagem({
      ...viagem,
      [name]: valor,
    });
  }

  function retornar() {
    navigate("/viagens");
  }

  async function gerarNovaViagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const viagemParaEnvio = {
      ...viagem,
      data_hora_partida: formatarDataSubmit(
        viagem.data_hora_partida,
        dataAlterada
      ),
    };

    if (id !== undefined) {
      try {
        await atualizar(`/viagens`, viagemParaEnvio, setViagem, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Carona atualizada com sucesso", "sucesso", theme);
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a Carona!", "erro " + error.response.data.message, theme);
        }
      }
    } else {
      try {
        await cadastrar(`/viagens`, viagemParaEnvio, setViagem, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Carona cadastrada com sucesso", "sucesso", theme);
      } catch (error: any) {
        console.log(error);
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a Carona!", "erro" + error.response.data.message, theme);
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const viagemData = new Date(viagem.data_hora_partida);
  const formattedDate = `${viagemData.getFullYear()}-${(
    viagemData.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${viagemData
    .getDate()
    .toString()
    .padStart(2, "0")}T${viagemData
    .getHours()
    .toString()
    .padStart(2, "0")}:${viagemData.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <div className="container flex flex-col items-center bg-white-a rounded-lg shadow-lg max-w-3xl p-4">
        <h1 className="text-4xl text-center my-4">
          {id !== undefined ? "Editar Carona" : "Cadastrar Carona"}
        </h1>

        <form
          className="flex flex-col w-full gap-4 mb-8"
          onSubmit={gerarNovaViagem}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="Origem">{translate("origem")}</label>
            <input
              value={viagem.origem}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              type="text"
              placeholder={translate("localPartida")}
              name="origem"
              required
              className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="destino">{translate("destino")}</label>
            <input
              value={viagem.destino}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              type="text"
              placeholder={translate("localDestino")}
              name="destino"
              required
              className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="data_hora_partida">
              {translate("dataHorarioPartida")}
            </label>
            <input
              type="datetime-local"
              name="data_hora_partida"
              className="border-2 border-slate-700 rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-zinc-400"
              onChange={handleDataChange}
              value={formattedDate}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="preco">{translate("valorTrajeto")} (R$)</label>
            <input
              value={viagem.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              type="number"
              step=".01"
              placeholder={translate("valorServico")}
              name="preco"
              required
              className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p>{translate("status")}</p>
            <select
              name="status_viagem"
              id="status_viagem"
              className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
              onChange={handleStatusChange}
              required
              value={viagem?.status_viagem}
            >
              <option value="" selected disabled>{translate("selecioneEstado")}</option>
              <option value="1">{translate("agendada")}</option>
              <option value="2">{translate("emAndamento")}</option>
              <option value="3">{translate("concluida")}</option>
              <option value="4">{translate("cancelada")}</option>
            </select>
          </div>

          <div className="flex justify-between flex-nowrap">
            <div className="flex flex-col gap-1 w-1/2 px-1">
              <label htmlFor="distancia">{translate("distancia")} (Km)</label>
              <input
                value={viagem.distancia}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                type="number"
                step=".01"
                placeholder={translate("distancia")}
                name="distancia"
                required
                className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>

            <div className="flex flex-col gap-1 w-1/2 px-1">
              <label htmlFor="velocidade_media">
                {translate("velocidade")} (Km²)
              </label>
              <input
                value={viagem.velocidade_media}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
                type="number"
                step=".01"
                placeholder={translate("velocidadeMedia")}
                name="velocidade_media"
                required
                className="border-2 border-slate-700 rounded p-1 focus:outline-none focus:ring-2 focus:ring-zinc-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p>{translate("veiculo")}</p>
            <select
              name="veiculo"
              id="veiculo"
              className="border p-2 border-slate-800 rounded focus:outline-none focus:ring-2 focus:ring-zinc-400"
              onChange={handleVeiculoChange}
              required
              value={viagem.veiculo?.id}
            >
              <option value="" selected disabled>
                {translate("selecioneVeiculo")}
              </option>

              {veiculos.map((veiculo) => (
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.modelo}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex gap-4">
            <button
              onClick={retornar}
              className="rounded text-slate-100 bg-red-400 hover:bg-red-900 text-center cursor-pointer transition-all shadow-md p-2 w-full"
            >
              Cancelar
            </button>
            <button
              className="rounded text-slate-100 bg-emerald-600 hover:bg-emerald-900 text-center cursor-pointer transition-all shadow-md p-2 w-full flex justify-center items-center"
              type="submit"
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormViagem;

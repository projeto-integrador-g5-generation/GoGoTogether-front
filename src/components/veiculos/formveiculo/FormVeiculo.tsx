/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Veiculo from "../../../models/Veiculo";
import { RotatingLines } from "react-loader-spinner";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { AuthContext } from "../../../context/AuthContext";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { useDictionary } from "../../../context/DictionaryProvider";
import { useTheme } from "../../../context/ThemeContext";

function FormVeiculo() {
  const navigate = useNavigate();

  const { translate } = useDictionary();
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/veiculos/${id}`, setVeiculo, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.log(error);
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info", theme);
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setVeiculo({
      ...veiculo,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoVeiculo(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/veiculos`, veiculo, setVeiculo, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Veículo atualizado com sucesso", "sucesso", theme);
      } catch (error: any) {
        console.log(error);
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Veículo!", "erro", theme);
        }
      }
    } else {
      try {
        console.log(veiculo);
        await cadastrar(`/veiculos`, veiculo, setVeiculo, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Veículo cadastrado com sucesso", "sucesso", theme);
      } catch (error: any) {
        console.log(error);
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Veículo!", "erro", theme);
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/veiculos");
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <div className="container flex flex-col items-center bg-white-a rounded-lg shadow-lg max-w-3xl p-4">
        <h1 className="text-4xl text-center my-4">
          {id === undefined ? "Cadastrar Veículo" : "Editar Veículo"}
        </h1>

        <form
          className="flex flex-col w-full gap-4 mb-8"
          onSubmit={gerarNovoVeiculo}
        >
          <div className="flex flex-col gap-1 ">
            <label htmlFor="modelo">{translate("modelo")}</label>
            <input
              type="text"
              placeholder={translate("fraseModelo")}
              name="modelo"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.modelo}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-1 ">
            <label htmlFor="marca">{translate("marca")}</label>
            <input
              type="text"
              placeholder={translate("fraseMarca")}
              name="marca"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.marca}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex justify-between w-full flex-wrap">
            <div className="flex flex-col gap-1 w-1/2 pr-1 ">
              <label htmlFor="ano">{translate("ano")}</label>
              <input
                type="number"
                placeholder={translate("fraseAno")}
                name="ano"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.ano}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2 pl-1 ">
              <label htmlFor="cor">{translate("cor")}</label>
              <input
                type="text"
                placeholder={translate("fraseCor")}
                name="cor"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.cor}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <div className="flex flex-col py-2 gap-1 w-1/2 pr-1">
              <label htmlFor="categoria">{translate("categoria")}</label>
              <select
                name="categoria"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.categoria}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  atualizarEstado(e)
                }
              >
                <option value="" disabled selected>
                  {translate("seletorCategoria")}
                </option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 py-2 w-1/2 pr-1">
              <label htmlFor="placa">{translate("placa")} </label>
              <input
                type="text"
                placeholder={translate("frasePlaca")}
                name="placa"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.placa}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <div className="flex flex-col py-2 gap-1 w-1/2 pr-1">
              <label htmlFor="foto">{translate("foto")} </label>
              <input
                type="text"
                placeholder={translate("fraseFoto")}
                name="foto"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <div className="flex flex-col py-2 gap-1 w-1/2 pl-1">
              <label htmlFor="combustivel">{translate("combustivel")} </label>
              <select
                name="combustivel"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.combustivel}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  atualizarEstado(e)
                }
              >
                <option value="" disabled selected>
                  {translate("seletorCombustivel")}
                </option>
                <option value="gasolina">{translate("gasolina")}</option>
                <option value="etanol">{translate("etanol")}</option>
                <option value="diesel">{translate("diesel")}</option>
                <option value="flex">{translate("flex")}</option>
                <option value="hibrido">{translate("hibrido")}</option>
                <option value="eletrico">{translate("eletrico")}</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 py-2 w-1/2 pr-1 ">
              <label htmlFor="capacidade">{translate("capacidade")} </label>
              <input
                type="number"
                placeholder={translate("fraseCapacidade")}
                name="capacidade"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.capacidade}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>

            <div className="flex flex-col py-2 gap-1 w-1/2 pl-1">
              <label htmlFor="asseentos_disponiveis">
                {" "}
                {translate("assentosDisponiveis")}{" "}
              </label>
              <input
                type="number"
                placeholder={translate("fraseAssentosDisponiveis")}
                name="assentos_disponiveis"
                className="border-2 border-slate-700 rounded p-2 utral-800"
                required
                value={veiculo.assentos_disponiveis}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
          </div>

          <div className="w-full flex gap-4">
            <button
              onClick={retornar}
              className="rounded text-slate-100 bg-red-400 hover:bg-red-900 text-center cursor-pointer transition-all shadow-md p-2 w-full"
            >
              Cancelar
            </button>
            <button
              className="rounded text-slate-100 bg-emerald-600 hover:bg-emerald-900 text-center cursor-pointer transition-all shadow-md p-2 w-full"
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

export default FormVeiculo;

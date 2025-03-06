/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Veiculo from "../../../models/Veiculo";
import { RotatingLines } from "react-loader-spinner";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { AuthContext } from "../../../context/AuthContext";
import { ToastAlerta } from "../../../util/ToastAlerta";

function FormVeiculo() {
  const navigate = useNavigate();

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
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
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

        ToastAlerta("Veículo atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Veículo!", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/veiculos`, veiculo, setVeiculo, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Veículo cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Veículo!", "erro");
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
    <div className="container flex flex-col mx-auto items-center p-4">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Veículo" : "Editar Veículo"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoVeiculo}>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="modelo">Modelo </label>
          <input
            type="text"
            placeholder="Adicione o modelo do veiculo"
            name="modelo"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={veiculo.modelo || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="marca">Marca</label>
          <input
            type="text"
            placeholder="Adicione a marca do veiculo"
            name="marca"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={veiculo.marca || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="ano">Ano</label>
          <input
            type="text"
            placeholder="Adicione o ano do veiculo"
            name="ano"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={veiculo.ano || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="cor">Cor</label>
          <input
            type="text"
            placeholder="Adicione a cor do veiculo"
            name="cor"
            className="border-2 border-slate-700 rounded p-2 utral-800"
            required
            value={veiculo.cor || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex flex-col gap-1 w-1/2 pr-1">
            <label htmlFor="categoria">Categoria</label>
            <input
              type="text"
              placeholder="Adicione a categoria do veiculo"
              name="categoria"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.categoria || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2 pl-1 ">
            <label htmlFor="placa">Placa </label>
            <input
              type="text"
              placeholder="Adicione a placa do Veículo"
              name="placa"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.placa || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2 pr-1">
            <label htmlFor="foto">Foto </label>
            <input
              type="text"
              placeholder="Adicione a foto do Veiculo"
              name="foto"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.foto || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2 pl-1">
            <label htmlFor="combustivel">Combustível </label>
            <input
              type="text"
              placeholder="Adicione o combustível do Veículo"
              name="combustivel"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.combustivel || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2 pr-1 ">
            <label htmlFor="capacidade">Capacidade </label>
            <input
              type="number"
              placeholder="Adicione a capacidade do Veículo"
              name="capacidade"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.capacidade || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="flex flex-col gap-1 w-1/2 pl-1">
            <label htmlFor="asseentos_disponiveis">Assentos Disponíveis </label>
            <input
              type="number"
              placeholder="Adicione a quantidade de assentos disponíveis"
              name="assentos_disponiveis"
              className="border-2 border-slate-700 rounded p-2 utral-800"
              required
              value={veiculo.assentos_disponiveis || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
        </div>

        <button
          className="rounded text-slate-100 bg-cyan-600 
          hover:bg-cyan-900 w-1/2 py-2 mx-auto flex justify-center"
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
      </form>
    </div>
  );
}

export default FormVeiculo;

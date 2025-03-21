/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Viagem from "../../../models/Viagens";
import { buscar, deletar } from "../../../service/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { useDictionary } from "../../../context/DictionaryProvider";
import { useTheme } from "../../../context/ThemeContext";

function DeletarViagem() {
  const navigate = useNavigate();
  const { translate } = useDictionary();
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viagem, setViagem] = useState<Viagem>({} as Viagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
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
        ToastAlerta("Erro ao localizar a Carona!", "erro", theme);
        retornar();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info", theme);
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarViagem() {
    setIsLoading(true);

    try {
      await deletar(`/viagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Carona Excluída com Sucesso!", "sucesso", theme);
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao Excluir a Carona!", "erro", theme);
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/viagens");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <h1 className="text-4xl text-center py-4 text-white font-semibold">
        {translate("deletarViagem")}
      </h1>
      <p className="text-center text-2xl mb-4 text-white font-semibold">
        {translate("confirmacaoDeletar")}
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between w-full max-w-100 bg-white mt-5 shadow-lg">
        <header className="py-2 px-6 bg-cyan-900 text-white font-bold text-2xl">
          {translate("carona")}
        </header>
        <p className="p-4 text-2xl bg-white h-full">
          {translate("origem")}: {viagem.origem}
        </p>
        <p className="px-4 py-2 text-2xl bg-white h-full">
          {translate("destino")}: {viagem.destino}
        </p>
        <p className="p-4 text-2xl bg-white h-full">
          {translate("criadoPor")}: {viagem.usuario?.nome}
        </p>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 cursor-pointer transition-all"
            onClick={retornar}
          >
            {translate("nao")}
          </button>
          <button
            className="w-full text-slate-100 bg-teal-500 hover:bg-teal-700 flex items-center justify-center cursor-pointer transition-all"
            onClick={deletarViagem}
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
              <span>{translate("sim")}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletarViagem;

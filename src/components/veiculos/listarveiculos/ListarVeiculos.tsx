/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Veiculo from "../../../models/Veiculo";
import CardVeiculos from "../cardveiculos/CardVeiculos";
import { buscar } from "../../../service/Service";
import { AuthContext } from "../../../context/AuthContext";
import { ToastAlerta } from "../../../util/ToastAlerta";
import { ClipLoader } from "react-spinners";
import { useDictionary } from "../../../context/DictionaryProvider";
import { useTheme } from "../../../context/ThemeContext";

function ListarVeiculos() {
  const { translate } = useDictionary();
  const {theme} = useTheme();

  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState(false);

  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [listaVeiculo, setListaVeiculo] = useState(veiculos);
  const [nomeVeiculo, setNomeVeiculo] = useState("");

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarVeiculos() {
    setIsloading(true);

    try {
      await buscar("/veiculos", setVeiculos, {
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

    setIsloading(false);
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    buscarVeiculos();
  }, []);

  useEffect(() => {
    const veiculosEncontrados = veiculos.filter((c: Veiculo) =>
      c.modelo.toLocaleLowerCase().includes(nomeVeiculo.toLocaleLowerCase())
    );
    setListaVeiculo(veiculosEncontrados);
  }, [veiculos, nomeVeiculo]);

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      {isLoading ? (
        <ClipLoader
          size={200}
          color={"#fff"}
          loading={true}
          cssOverride={{ margin: "auto" }}
        />
      ) : (
        <>
          <div className={` ${theme === 'claro' ? 'bg-white-a' : "bg-gray-300"} flex justify-center p-4 w-full`}>
            <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center gap-4">
              <div className={`flex-1 flex items-center bg-white rounded-lg shadow-lg border border-gray-400 w-full sm:w-auto`}>
                <input
                  className="w-full px-4 py-2 h-9 focus:outline-none"
                  type="search"
                  placeholder={translate("pesquisar")}
                  id="busca"
                  name="busca"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNomeVeiculo(e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-lg focus:outline-none"
                >
                  🔍
                </button>
              </div>

              <button
                className="cursor-pointer px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-800 focus:outline-none font-bold w-full sm:w-auto transition-all shadow-md"
                onClick={() => navigate("/veiculos/cadastrar")}
              >
                {translate("cadastrarVeiculo")}
              </button>
            </div>
          </div>

          {listaVeiculo.length === 0 ? (
            <div className="flex justify-center items-center p-4 w-full min-h-[90vh]">
              <p className="text-3xl text-white font-semibold text-center">
              {translate("veiculoNaoEncontrado")}
              </p>
            </div>
          ) : (
            <div className="container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listaVeiculo.map((veiculo) => (
                <CardVeiculos key={veiculo.id} veiculo={veiculo} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ListarVeiculos;

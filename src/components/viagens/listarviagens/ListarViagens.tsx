/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Viagem from "../../../models/Viagens";
import { AuthContext } from "../../../context/AuthContext";
import { buscar } from "../../../service/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import CardViagens from "../cardviagens/CardViagens";
import { useDictionary } from "../../../context/DictionaryProvider";
import { ClipLoader } from "react-spinners";

function ListarViagens() {
  const navigate = useNavigate();
  const { translate } = useDictionary();

  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [isLoading, setIsloading] = useState(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarViagems() {
    setIsloading(true);

    try {
      await buscar("/viagens", setViagens, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }

    setIsloading(false);
  }

  useEffect(() => {
    if (token === null) {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    } else {
      buscarViagems();
    }
  }, [token]);

  const [listaViagem, setListaViagem] = useState(viagens);
  const [partidaViagem, setPartidaViagem] = useState("");

  useEffect(() => {
    const viagensEncontradas = viagens.filter((v: Viagem) =>
      v.origem.toLocaleLowerCase().includes(partidaViagem.toLocaleLowerCase())
    );
    setListaViagem(viagensEncontradas);
  }, [viagens, partidaViagem]);

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
          <div className="bg-white-a flex justify-center p-4 w-full">
            <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 flex items-center bg-white rounded-lg shadow-lg border border-gray-400 w-full sm:w-auto">
                <input
                  className="w-full px-4 py-2 h-9 focus:outline-none"
                  type="search"
                  placeholder={translate("pesquisar")}
                  id="busca"
                  name="busca"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPartidaViagem(e.target.value)
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
                className="cursor-pointer px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-800 focus:outline-none font-bold w-full sm:w-auto transition-all"
                onClick={() => navigate("/viagens/cadastrar")}
              >
                {translate("cadastrarViagem")}
              </button>
            </div>
          </div>

          {listaViagem.length === 0 ? (
            <div className="flex justify-center items-center p-4 w-full min-h-[90vh]">
              <p className="text-3xl text-black text-center">
                {translate("veiculoNaoEncontrado")}
              </p>
            </div>
          ) : (
            <div className="container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listaViagem.map((viagem) => (
                <CardViagens key={viagem.id} viagem={viagem} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ListarViagens;

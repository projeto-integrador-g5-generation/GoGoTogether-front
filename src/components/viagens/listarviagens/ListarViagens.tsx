/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import Viagem from "../../../models/Viagens";
import { AuthContext } from "../../../context/AuthContext";
import { buscar } from "../../../service/Service";
import { ToastAlerta } from "../../../util/ToastAlerta";
import CardViagens from "../cardviagens/CardViagens";

function ListarViagens() {
  const navigate = useNavigate();

  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [isLoading, setIsloading ] = useState(false)

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarViagems() {
	setIsloading(true)

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

	setIsloading(false)
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
    <>
      {isLoading && (
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      )}

      <div className="bg-gray-200 flex justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center gap-4">
          {/* Barra de pesquisa com botão de lupa */}
          <div className="flex-1 flex items-center bg-white rounded-lg shadow-lg border border-gray-400 w-full sm:w-auto">
            <input
              className="w-full px-4 py-2 h-9 focus:outline-none"
              type="search"
              placeholder="Pesquisar"
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

          {/* Botão de cadastrar veículo */}
          <button
            className="cursor-pointer px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-800 focus:outline-none font-bold w-full sm:w-auto"
            onClick={() => navigate("/viagens/cadastrar")}
          >
            Cadastrar Viagem
          </button>
        </div>
      </div>

	  {listaViagem.length === 0 ? (
                <div className="flex justify-center items-center p-4 w-full min-h-[90vh]">
                    <p className="text-3xl text-black text-center">
                        Veículo não encontrado.
                    </p>
                </div>
            ) : (
                <div className="container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listaViagem.map((viagem) => (
                        <CardViagens key={viagem.id} viagem={viagem} />
                    ))}
                </div>
            )}



      {/* <div
        className="
        bg-gray-200 
          flex 
          justify-center"
      >
        <div className="container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(listaViagem) && listaViagem.length > 0 ? (
            listaViagem.map((viagem) => (
              <CardViagens key={viagem.id} viagem={viagem} />
            ))
          ) : (
            <p className="w-full min-h-screen text-center text-6xl">Não há viagens disponíveis.</p>
          )}
        </div>
		
      </div> */}
    </>
  );
}

export default ListarViagens;

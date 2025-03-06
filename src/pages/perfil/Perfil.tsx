import {  Moon, SunDim } from "@phosphor-icons/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastAlerta } from "./../../util/ToastAlerta";
import { AuthContext } from "../../context/AuthContext";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado.", "info");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="m-4 mx-auto container">
      <div className="mx-2 rounded-2xl overflow-hidden">
        <img
          className="border-white border-b-20 w-full h-72 object-cover"
          src="https://ik.imagekit.io/ajt99blle/Rectangle%2041%20(1).png?updatedAt=1741186686389"
          alt="Capa do Perfil"
        />

        <img
          className="relative z-10 border-8 border-white mx-auto mt-[-8rem] rounded-full w-56"
          src={usuario.foto && usuario.foto.trim() ? usuario.foto : "https://ik.imagekit.io/ajt99blle/9815472-Photoroom.png?updatedAt=1740150724984"}
          alt={`Foto de perfil de ${usuario.nome}`}
        />

            <div className="relative  flex-col md:flex-row flex items-center justify-between bg-teal-700 mt-[-6rem] text-2xl text-black p- py-10 pt-30 gap-10">
           
            <div className="flex flex-col w-full justify-center items-center">
                <p className="w-full text-center">Nome: {usuario.nome}</p>
                <p className="w-full text-center">Email: {usuario.usuario}</p>
            </div>
                
            <div className="w-full flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-4 mt-[-1rem]">
                <button className="text-white hover:scale-125">
                <SunDim size={40} />
                </button>

                <button className="text-white hover:scale-125">
                <Moon size={39} />
                </button>
                
            </div>

                <select
                    id="language-select"
                    className="w-45 h-10 p-1 bg-white text-black rounded-md cursor-pointer text-sm"
                >
                    <option value="0">🇧🇷 Português</option>
                    <option value="1">🇺🇸 English</option>
                    <option value="2">🇪🇸 Español</option>
                </select>
            

            <a 
                href="/login" 
                className="text-white text-lg hover:text-red-500 transition-colors duration-300 mt-4"
                >
                Sair
            </a>
                </div>                
            

         </div>
        </div>
      </div>
  );
}

export default Perfil;
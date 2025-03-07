import { Link } from "react-router-dom";
import NavBarMobile from "./navbarmobile/NavBarMobile";
import { useContext } from "react";
import { CartContext } from "../../context/CardContext";
import { useDictionary } from "../../context/DictionaryProvider";
import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const { usuario } = useContext(AuthContext);
  const { translate } = useDictionary();
  const { quantidadeItems } = useContext(CartContext);

  return (
    <div
      id="Pai"
      className="w-full bg-emerald-700 flex items-center justify-center"
    >
      <div className="w-full flex items-center justify-between max-w-8xl px-8">
        <div
          id="logoNomeMarca"
          className="p-2 flex items-center hover:scale-110 transition-all"
        >
          <img
            src="https://ik.imagekit.io/50n5k5wmb/map-pin-line.svg?updatedAt=1741183492138"
            alt="Logo GoGotoghether"
            className="w-8"
          />

          <div>
            <h1 className="font-bold text-white text-1xl md:text-2xl p-1 cursor-pointer ">
              <Link to={"/home"}>GoGoTogether</Link>
            </h1>
          </div>
        </div>

        <div id="lista" className="items-center p-2 hidden md:flex">
          <ul className="flex gap-4 text-white items-center">
            <li className="cursor-pointer hover:underline hover:scale-110 transition-all">
              <Link to={"/viagens"}>{translate("viagens")}</Link>
            </li>
            <li className="cursor-pointer hover:underline hover:scale-110 transition-all">
              <Link to={"/veiculos"}>{translate("veiculos")}</Link>
            </li>

            <li>
              <Link to={"/sobre"}>Sobre</Link>
            </li>
            {usuario.token ? (
              <>
                <li>
                  <Link to={"/perfil"}>
                    <img
                      src="https://ik.imagekit.io/50n5k5wmb/default-image.jpg?updatedAt=1739541077770"
                      alt="foto do Perfil do Usuario"
                      className="w-8 h-8 rounded-full cursor-pointer hover:underline hover:scale-110 transition-all"
                    />
                  </Link>
                </li>
                <li>
                  <Link to={"/carrinho"}>
                    <img
                      src="https://ik.imagekit.io/50n5k5wmb/shopping-cart.svg?updatedAt=1739986833310"
                      alt="Carrinho de Compra"
                      className={`cursor-pointer hover:underline hover:scale-110 transition-all ${
                        quantidadeItems > 0 ? "pt-5" : ""
                      }`}
                    />
                    {quantidadeItems > 0 && (
                      <span className="relative -top-9 -right-5 bg-red-500  text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {quantidadeItems}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <li className="hover:underline hover:scale-110 transition-all">
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>

        {/*Botão nav para mobile a partir de uma certa largura*/}
        <div className="md:hidden ">
          <NavBarMobile />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

import { Link } from "react-router-dom";
import NavBarMobile from "./navbarmobile/NavBarMobile";
import { useContext } from "react";
import { CartContext } from "../../context/CardContext";

function NavBar() {
  const { quantidadeItems } = useContext(CartContext);

  return (
    <div
      id="Pai"
      className="w-full bg-emerald-700 min-h-20 flex items-center justify-between "
    >
      <div id="logoNomeMarca" className="p-2 flex items-center">
        <img
          src="https://ik.imagekit.io/50n5k5wmb/map-pin-line.svg?updatedAt=1741183492138"
          alt="Logo GoGotoghether"
          className="w-8"
        />

        <div>
          <h1 className="font-bold text-white text-1xl md:text-2xl p-1 cursor-pointer">
            <Link to={"/home"}>GoGoTogether</Link>
          </h1>
        </div>
      </div>

      <div id="lista" className="items-center p-2 hidden md:flex">
        {/* falta colocar o Link=to"" tirar a ul e as li e trocar po Link=to"" e ajustar div lista*/}
        <ul id="" className="flex gap-3 text-white items-center">
          <li className="cursor-pointer">
            <Link to={"/viagens"}>Viagens</Link>
          </li>
          <li className="cursor-pointer">
            <Link to={"/veiculos"}>Veículos</Link>
          </li>
          <li>
            <Link to={"/perfil"}>
              <img
                src="https://ik.imagekit.io/50n5k5wmb/default-image.jpg?updatedAt=1739541077770"
                alt="foto do Perfil do Usuario"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </Link>
          </li>
          <li>
            <Link to={"/sobre"}>
              Sobre
            </Link>
          </li>
          <li>
            <Link to={"/carrinho"}>
              <img
                src="https://ik.imagekit.io/50n5k5wmb/shopping-cart.svg?updatedAt=1739986833310"
                alt="Carrinho de Compra"
                className="cursor-pointer"
              />
              {quantidadeItems > 0 && (
                <span className="relative -top-9 -right-5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {quantidadeItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/*Botão nav para mobile a partir de uma certa largura*/}
      <div className="md:hidden ">
        <NavBarMobile />
      </div>
    </div>
  );
}

export default NavBar;

import { Link } from "react-router-dom";

function NavBar() {
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

      <div id="lista" className="flex items-center p-2">
        <ul id="" className="flex gap-3 text-white items-center">
          <li className="cursor-pointer"><Link to={"/viagens"}>Viagens</Link></li>
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
            <Link to={"/carrinho"}>
              <img
                src="https://ik.imagekit.io/50n5k5wmb/shopping-cart.svg?updatedAt=1739986833310"
                alt="Carrinho de Compra"
                className="cursor-pointer"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;

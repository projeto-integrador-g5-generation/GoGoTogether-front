import { useContext, useEffect } from "react";
import "./NavBar.css";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CardContext";
import { Link } from "react-router-dom";
import { useDictionary } from "../../context/DictionaryProvider";
import { useTheme } from "../../context/ThemeContext";

const NavBar = () => {
  const { usuario } = useContext(AuthContext);
  const { quantidadeItems } = useContext(CartContext);
  const { translate } = useDictionary();
  const { theme } = useTheme();

  useEffect(() => {
    let prevScrollPos2 = window.scrollY;
    const navbar = document.querySelector(".cont-navbar");
    const btnNavbar = document.querySelector(".btn-list-navbar");
    const secondNavbar = document.querySelector(".second-navbar");
    const secondBtns = document.querySelectorAll(".btn-second");

    const handleScroll = () => {
      if (!navbar || !btnNavbar || !secondNavbar) return;

      if (prevScrollPos2 > window.scrollY) {
        navbar.classList.add("height-navbar");
      } else {
        navbar.classList.remove("height-navbar");
        secondNavbar.classList.remove("height-second-navbar");
        btnNavbar.classList.add("bi-list");
        btnNavbar.classList.remove("bi-x-lg", "icon-rotate");
      }

      if (window.scrollY === 0) navbar.classList.add("height-navbar");

      prevScrollPos2 = window.scrollY;
    };

    const toggleMenu = () => {
      if (!secondNavbar || !btnNavbar) return;
      secondNavbar.classList.toggle("height-second-navbar");
      btnNavbar.classList.toggle("bi-list");
      btnNavbar.classList.toggle("bi-x-lg");
      btnNavbar.classList.toggle("icon-rotate");
    };

    secondBtns.forEach((btn) =>
      btn.addEventListener("click", () => toggleMenu())
    );
    window.addEventListener("scroll", handleScroll);
    btnNavbar?.addEventListener("click", toggleMenu);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      btnNavbar?.removeEventListener("click", toggleMenu);
      secondBtns.forEach((btn) =>
        btn.addEventListener("click", () => toggleMenu())
      );
    };
  }, [usuario.token]);

  return (
    <>
      {/* Navbar - Mobile */}
      <div
        className={` ${
          theme === "light"
            ? "bg-gradient-to-r from-emerald-800 to-emerald-900"
            : "bg-black"
        }
        fixed md:hidden w-full z-20 top-0 second-navbar  text-white`}
      >
        <div className="w-full relative h-full shadow-md transition-all">
          <nav className="flex flex-col w-full items-center justify-center absolute bottom-0 p-1 gap-2 transition-all">
            <Link
              to={"/viagens"}
              className="btn-navbar btn-second relative p-4 w-full text-start"
            >
              {translate("viagens")}
            </Link>
            <Link
              to={"/veiculos"}
              className="btn-navbar btn-second relative p-4 w-full text-start"
            >
              {translate("veiculos")}
            </Link>
            <Link
              to={"/sobre"}
              className="btn-navbar btn-second relative p-4 w-full text-start"
            >
              {translate("sobre")}
            </Link>
            {usuario.token ? (
              <>
                <Link
                  to={"/carrinho"}
                  className="btn-navbar btn-second relative p-4 w-full text-start flex gap-4"
                >
                  {translate("carrinho")}{" "}
                  {quantidadeItems > 0 && `- ${quantidadeItems}`}
                </Link>
                <Link
                  to={"/perfil"}
                  className="btn-navbar btn-second relative p-4 w-full text-start"
                >
                  {translate("perfil")}
                </Link>
              </>
            ) : (
              <Link
                to={"/login"}
                className="btn-navbar btn-second relative p-4 w-full text-start"
              >
                {translate("login")}
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Navbar - Pc */}
      <div className="w-full fixed cont-navbar h-0 overflow-hidden transition-all top-0 z-20 height-navbar shadow-md">
        <div
          className={`${
            theme === "light"
              ? "bg-gradient-to-r from-emerald-800 to-emerald-900"
              : "bg-black"
          } w-full h-full relative text-white flex justify-center items-center`}
        >
          <nav className="flex w-full items-center justify-center absolute bottom-0 p-2 max-w-7xl">
            <button className="absolute left-1 btn-list-navbar bg-transparent md:hidden text-3xl cursor-pointer bi bi-list transition-all"></button>
            <div className="w-full flex justify-center md:justify-start items-center">
              <Link to={"/"} className="btn-navbar relative p-2 font-bold">
                GoGoTogether
              </Link>
            </div>

            <div className="hidden md:flex gap-2 justify-end items-center w-full">
              <Link to={"/viagens"} className="btn-navbar relative p-2">
                {translate("viagens")}
              </Link>
              <Link to={"/veiculos"} className="btn-navbar relative p-2">
                {translate("veiculos")}
              </Link>
              <Link to={"/sobre"} className="btn-navbar relative p-2">
                {translate("sobre")}
              </Link>

              {usuario.token ? (
                <>
                  <Link to={"/perfil"}>
                    <img
                      src={
                        usuario.foto ||
                        "https://ik.imagekit.io/ajt99blle/9815472-Photoroom.png?updatedAt=1740150724984"
                      }
                      alt="foto do Perfil do Usuario"
                      className="w-8 h-8 rounded-full cursor-pointer hover:underline hover:scale-110 transition-all"
                    />
                  </Link>
                  <Link to={"/carrinho"} className="relative">
                    <img
                      src="https://ik.imagekit.io/50n5k5wmb/shopping-cart.svg?updatedAt=1739986833310"
                      alt="Carrinho de Compra"
                      className={`w-8 h-8 cursor-pointer hover:underline hover:scale-110 transition-all`}
                    />
                    {quantidadeItems > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500  text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {quantidadeItems}
                      </span>
                    )}
                  </Link>
                </>
              ) : (
                <Link to={"/login"} className="btn-navbar relative p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;

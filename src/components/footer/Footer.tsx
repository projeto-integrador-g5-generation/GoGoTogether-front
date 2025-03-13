import { Taxi } from "phosphor-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const data = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer
      className={`flex flex-col w-full footer ${
        theme === "light"
          ? "bg-gradient-to-r from-emerald-800 to-emerald-900"
          : "bg-black"
      } text-white p-4 justify-center items-center`}
        data-animate="top"
    >
      <div className="flex flex-col gap-4 sm:flex-row w-full justify-between max-w-7xl p-4">
        <div className="flex flex-col sm:flex-row w-full justify-around">
          <div className="flex flex-col gap-2 p-2 justify-center items-center">
            <h1 className="flex items-center gap-4 text-2xl font-bold">
              <Taxi size={42} />
              GoGoTogether
            </h1>
            <p>Movendo Pessoas e Conectando Caminhos.</p>
            <div className="flex items-center gap-4 justify-start w-full pt-2">
              <FaLocationArrow />
              <p>Brasil, São Paulo</p>
            </div>
            <div className="flex items-center gap-4 justify-start w-full">
              <FaMobileAlt />
              <p>+55 4002-8922</p>
            </div>
            <div className="flex w-full gap-5 justify-center pt-2">
              <a href="#">
                <FaInstagram className="text-3xl hover:scale-105 duration-200" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl hover:scale-105 duration-200" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl hover:scale-105 duration-200" />
              </a>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-2 p-2">
            <h1 className="font-bold">Links</h1>
            <ul className="flex flex-col gap-3">
              <Link to="/" className="hover:underline">
                Inicio
              </Link>
              <Link to="/sobre" className="hover:underline">
                Sobre
              </Link>
              <Link to="/viagens" className="hover:underline">
                Viagens
              </Link>
              <Link to="/veiculos" className="hover:underline">
                Veículos
              </Link>
            </ul>
          </div>
        </div>

        <div className="flex w-full justify-around">
          <div className="flex flex-col gap-2 p-2">
            <h1 className="font-bold">Apoio</h1>
            <ul className="flex flex-col gap-3">
              <li className="cursor-pointer">Perguntas Frequentes</li>
              <li className="cursor-pointer">Segurança nas Caronas</li>
              <li className="cursor-pointer">Contato e Suporte</li>
              <li className="cursor-pointer">Nossos Motoristas</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 p-2">
            <h1 className="font-bold">Informações</h1>
            <ul className="flex flex-col gap-3">
              <li className="cursor-pointer">Rotas Disponíveis</li>
              <li className="cursor-pointer">Horários de Partida</li>
              <li className="cursor-pointer">Preços e Pagamentos</li>
              <li className="cursor-pointer">Como Funciona</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl flex justify-center border-white border-t-1 p-2">
        © {data} GoGoTogether
      </div>
    </footer>
  );
};

export default Footer;

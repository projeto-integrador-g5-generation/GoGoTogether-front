import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";

interface CardEquipeProps {
  foto: string;
  nome: string;
  linkedin?: string;
  github: string;
}

function CardEquipe({ foto, nome, linkedin, github }: CardEquipeProps) {

  const { theme } = useTheme();

  return (
    <div className="border border-gray-300 rounded-lg p-4 w-64 mx-auto my-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <img
          src={foto}
          alt={nome}
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />
        <h3 className="text-xl font-semibold mb-2">{nome}</h3>

        <div className="flex gap-4">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-teal-700 hover:text-teal-900 transition duration-300"
            >
              <FaLinkedin />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-teal-700 hover:text-teal-900 transition duration-300"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardEquipe;

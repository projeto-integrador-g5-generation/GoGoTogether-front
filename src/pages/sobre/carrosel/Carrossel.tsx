import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';


const membros = [
  {
    foto: "https://ik.imagekit.io/23lwgdahj/grupo/1729191555564.jpg?updatedAt=1740514503351",
    nome: "Alana Oliveira",
    linkedin: "https://www.linkedin.com/in/alanasanches/",
    github: "https://github.com/alanaoliv",
  },
  {
    foto: "https://ik.imagekit.io/23lwgdahj/grupo/1731616511157.jpg?updatedAt=1740514503183",
    nome: "Aline Anacleto",
    linkedin: "https://linkedin.com/in/aline-anacleto/",
    github: "https://github.com/alineanacletoo",
  },
  {
    foto: "https://ik.imagekit.io/23lwgdahj/grupo/IMG_20220803_130245_008.jpg?updatedAt=1740514503131",
    nome: "Loana Isabelly",
    linkedin: "https://www.linkedin.com/in/loana-isabelly/",
    github: "https://github.com/loanaisabelly",
  },
  {
    foto: "https://ik.imagekit.io/23lwgdahj/grupo/1683237753075.jpg?updatedAt=1740514503348",
    nome: "Vanessa Ribeiro",
    linkedin: "https://www.linkedin.com/in/vanessaribeiro-/",
    github: "https://github.com/vanessaribeiro03",
  },
  {
    foto: "https://ik.imagekit.io/23lwgdahj/grupo/1693922596317.jpg?updatedAt=1740514503399",
    nome: "Vinicius Oliveira",
    linkedin: "https://www.linkedin.com/in/vinicius-oliveira-dev-fullstack",
    github: "https://github.com/viniciusoliveira-27",
  },{
    foto: "https://ik.imagekit.io/23lwgdahj/grupo/1685297918578.jpg?updatedAt=1740514503489",
    nome: "Vinicus Rodrigues",
    linkedin: "https://www.linkedin.com/in/vinicius-rodrigues2004/",
    github: "https://github.com/Vinicius-Rodriguess",
  },
  {
    foto: "https://ik.imagekit.io/23lwgdahj/grupo/Wellerson_Pinheiros_2.webp?updatedAt=1740514503386",
    nome: "Wellerson Pinheiros",
    linkedin: "https://www.linkedin.com/in/wellerson-pinheiros/",
    github: "https://github.com/wellerson-pinheiros",
  },
];

const Carrossel = () => {
    const [index, setIndex] = useState(0);
  
    const handlePrevious = () => {
      setIndex((prevIndex) => (prevIndex - 1 + membros.length) % membros.length);
    };
  
    const handleNext = () => {
      setIndex((prevIndex) => (prevIndex + 1) % membros.length);
    };
  
    return (
      <div className="relative w-full">
        
        <button
          onClick={handlePrevious}
          className="absolute cursor-pointer left-3 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-500 active:scale-95 transition duration-200 ease-in-out flex items-center justify-center w-12 h-12"
            >
              <FaArrowLeft size={20} />
            </button>
  
       
        <div className="flex transition-transform duration-500 ease-in-out w-full gap-x-4 overflow-hidden">
          {membros
            .concat(membros) 
            .slice(index, index + 3) 
            .map((membro, idx) => (
              <div
                key={idx}
                className="border border-gray-300 rounded-lg p-6 w-90 h-72 mx-auto bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={membro.foto}
                    alt={membro.nome}
                    className="w-32 h-32 rounded-full mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{membro.nome}</h3>
                  <div className="flex gap-4">
                    {membro.linkedin && (
                      <a
                        href={membro.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-blue-700 hover:text-blue-500 transition duration-300"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {membro.github && (
                      <a
                        href={membro.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-gray-700 hover:text-gray-500 transition duration-300"
                      >
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
  

            <button
                onClick={handleNext}
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 bg-cyan-600 text-white p-2 rounded-full hover:bg-cyan-500 active:scale-95 transition duration-200 ease-in-out flex items-center justify-center w-12 h-12"
            >
             <FaArrowRight size={20} /> 
            </button>
      </div>
    );
  };
  
  export default Carrossel;
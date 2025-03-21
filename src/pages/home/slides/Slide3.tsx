import { Link } from "react-router-dom";
import { useDictionary } from "../../../context/DictionaryProvider";

function Slide3() {
  const { translate } = useDictionary();

  return (
    <div
      id="containerPai"
      className="w-full flex justify-center bg-black h-full bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/50n5k5wmb/close-up-friends-taking-selfie%201.jpg?updatedAt=1741195334196')",
      }}
    >
      <div className="w-full flex justify-center bg-slide h-full p-4">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-white text-2xl md:text-6xl font-bold drop-shadow-lg text-center max-w-8xl" >
            {translate("slide3BoasVindas")}
          </h1>
          <p className="text-white text-1xl md:text-4xl font-bold drop-shadow-lg text-center">
            {translate("slide3")}
          </p>

          <button className="p-2 cursor-pointer bg-white rounded drop-shadow-lg hover:scale-105 hover:bg-gray-100  transition-all text-md md:text-2xl mt-10">
            <Link to={"/viagens"}>{translate("slide1Botao")}</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slide3;

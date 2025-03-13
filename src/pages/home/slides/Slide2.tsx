import { Link } from "react-router-dom";
import { useDictionary } from "../../../context/DictionaryProvider";

function Slide2() {
  const { translate } = useDictionary();

  return (
    <div
      id="containerPai"
      className="w-full flex justify-center items-center bg-black h-full bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/50n5k5wmb/photo-1484353371297-d8cfd2895020.avif?updatedAt=1741195736580')",
      }}
    >
      <div className="w-full flex justify-center bg-slide h-full p-4">
        <div className="flex flex-col justify-center w-4/5 items-center gap-5 text-center">
          <h1 className="text-white text-2xl md:text-6xl font-bold drop-shadow-lg max-w-8xl">
            {translate("slide2")}
          </h1>

          <button className="p-2 cursor-pointer bg-white rounded drop-shadow-lg hover:scale-105 hover:bg-gray-100 transition-all text-md md:text-2xl mt-10">
            <Link to={"/viagens"}>{translate("slide1Botao")}</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slide2;

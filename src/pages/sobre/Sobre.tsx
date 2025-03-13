import { useDictionary } from "../../context/DictionaryProvider";
import Carrossel from "./carrosel/Carrossel";
import { useTheme } from "../../context/ThemeContext";

function Sobre() {
  const { translate } = useDictionary();
  const { theme } = useTheme();

  return (
    <>
      <section className="text-white font-semibold py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4"> {translate("sobre")}</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-center">
            {translate("texto1")}
          </p>
        </div>
      </section>

      <section
        className={`${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"} py-16`}
      >
        <h2 className="text-4xl font-bold text-center mb-8">
          {translate("equipe")}
        </h2>

        <Carrossel />
      </section>

      <section className="py-16 px-6 bg-gradient-to-r">
        <div className="text-center mb-7">
          <h2 className="text-4xl font-bold mb-4 text-white">
            {translate("conhecaEquipe")}
          </h2>
        </div>
        <div className="text-xl max-w-3xl mx-auto text-white font-semibold">
          <p className="leading-relaxed text-center">{translate("texto2")}</p>
        </div>
      </section>
    </>
  );
}

export default Sobre;

import { GithubLogo } from "@phosphor-icons/react";
import { useDictionary } from "../../context/DictionaryProvider";

function Footer() {
  const data = new Date().getFullYear();

  const {translate} = useDictionary();

  return (
    <div className="flex justify-center text-white bg-black text-center ">
      <div className="container flex flex-col items-center py-4 gap-4">
        <p className="text-xl font-bold">
        {translate('caronaCompartilhada')} | Copyright: {data}
        </p>
        <p className="text-lg">{translate('acessarRedes')}</p>
        <div className="flex gap-2">
          <a href="#" target="_blank">
            <GithubLogo
              size={48}
              weight="bold"
              className="hover:drop-shadow-[2px_2px_4px_blue]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;

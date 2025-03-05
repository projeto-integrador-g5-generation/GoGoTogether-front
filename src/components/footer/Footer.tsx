import { GithubLogo } from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <div className="flex justify-center text-white bg-black text-center ">
      <div className="container flex flex-col items-center py-4 gap-4">
        <p className="text-xl font-bold">
          Carona compartilhada GoGoTogether | Copyright: {data}
        </p>
        <p className="text-lg">Acesse nossas redes sociais</p>
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

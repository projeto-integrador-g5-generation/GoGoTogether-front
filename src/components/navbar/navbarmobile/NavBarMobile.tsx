import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function NavBarMobile() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  const listaAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Tempo entre as animações de cada filho
        delayChildren: 0.3, // Tempo antes de começar a animar os filhos
      },
    },
  };

  return (
    <>
      <motion.button
        className="cursor-pointer gap-4 p-4 "
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleOpen}
      >
        {open ? (
          <img
            src="https://ik.imagekit.io/50n5k5wmb/x-bold.svg?updatedAt=1741273156708"
            alt="Botão interativo menu"
            className="w-9"
          />
        ) : (
          <img
            src="https://ik.imagekit.io/50n5k5wmb/list-bold.svg?updatedAt=1741266187600"
            alt="Botão interativo menu"
            className="w-9"
          />
        )}
      </motion.button>
      <AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className=" text-white bg-emerald-700 py-4 rounded-lg  flex flex-col absolute right-0 w-1/2"
        >
          <motion.ul
            className="flex flex-col gap-10 p-2 text-2xl "
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            variants={listaAnimation}
          >
            <li className="cursor-pointer pl-4 font-bold">Viagens</li>
            <li className="cursor-pointer pl-4 font-bold">Veiculos</li>
            <li className="cursor-pointer pl-4 font-bold">Veiculos</li>
            <li className="cursor-pointer pl-4  font-bold ">Carrinho</li>
            <li className="cursor-pointer pl-4 font-bold">Usuario</li>
            <li className="cursor-pointer pl-4 font-bold">Sobre</li>

            <li className="cursor-pointer pl-4 font-bold"> Sair</li>
          </motion.ul>
        </motion.div>
      )}
      </AnimatePresence>

    </>
  );
}

export default NavBarMobile;

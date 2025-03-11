import { toast } from "react-toastify";

export function ToastAlerta(mensagem: string, tipo: string, theme: string) {
  switch (tipo) {
    case "sucesso":
      toast.success(mensagem, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: theme,
        progress: undefined,
      });
      break;

    case "erro":
      toast.error(mensagem, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: theme,
        progress: undefined,
      });
      break;

    case "info":
    default:
      toast.info(mensagem, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: theme,
        progress: undefined,
      });
      break;
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useState } from "react";
import { ToastAlerta } from "../util/ToastAlerta";
import { login } from "../service/Service";
import UsuarioLogin from "../models/UsuarioLogin";
import { useTheme } from "./ThemeContext";

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    usuario: "",
    senha: "",
    nome: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useTheme();

  async function handleLogin(usuariologin: UsuarioLogin) {
    setIsLoading(true);

    try {
      await login("/usuarios/logar", usuariologin, setUsuario);
      ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso", theme);
    } catch (error) {
      ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro", theme);
    }

    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      usuario: "",
      senha: "",
      nome: "",
      foto: "",
      token: "",
    });
  }
  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

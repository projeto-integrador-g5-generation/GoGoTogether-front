// login.tsx
import { ChangeEvent, useState } from "react";
import { Eye, EyeClosed } from "phosphor-react";
import UsuarioLogin from '../../models/UsuarioLogin';
import { login } from '../../service/Service';
import { RotatingLines } from "react-loader-spinner";
import './login.css';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
    const [usuarioResposta, setUsuarioResposta] = useState<UsuarioLogin | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null); 

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    async function handleLogin(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setErro(null);  

        try {
            await login('/usuarios/logar', usuarioLogin, setUsuarioResposta);
        } catch (error) {
            setErro("Usuário ou senha incorretos!");  
        } finally {
            setIsLoading(false);
        }
    }

    console.log("Usuário Logado:", usuarioResposta);

    return (
        <div className="background-container-login">
            <div className="form-container">
                <h2>Entrar</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="usuario">E-mail</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            className="form-input"
                            placeholder="Digite o e-mail de usuário"
                            value={usuarioLogin.usuario || ''}
                            onChange={atualizarEstado}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Senha</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="senha"
                                name="senha"
                                className="form-input pr-10"
                                placeholder="Digite sua senha"
                                value={usuarioLogin.senha || ''}
                                onChange={atualizarEstado}
                            />
                            <span
                                className="absolute right-2 top-2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                            </span>
                        </div>
                    </div>

                    {erro && <p className="text-red-500 text-center mb-4">{erro}</p>} 

                    <button
                        type="submit"
                        className="form-button submit w-full cursor-pointer"
                    >
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            "Entrar"
                        )}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p>Ou entre com:</p>
                    <button className="mt-2 flex items-center justify-center w-full border py-2 rounded hover:bg-gray-100 transition cursor-pointer">
                        <img src="https://ik.imagekit.io/alanaoliv/imagens_api-20250117T123121Z-001/imagens_api/gmail.png" className="w-6 h-6 mr-2" />
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p>
                        Ainda não tem uma conta? {' '}
                        <a href="/cadastro" className="text-teal-500 hover:underline">
                            Cadastre-se
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;

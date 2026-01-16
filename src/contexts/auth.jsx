import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { useLogin, useSignup } from "@/api/hooks/users";
import { UserService } from "@/api/services/user";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/localStorage";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  signOut: () => {},
  isInitializing: true,
});

export const useAuthContext = () => useContext(AuthContext);

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isInitializing, setIsInitializing] = useState(false);

  const signupMutation = useSignup();

  const loginMutation = useLogin();

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );
        if (!accessToken || !refreshToken) return;
        const response = await UserService.me();
        setUser(response);
      } catch (error) {
        setUser(null);
        console.error("Erro ao acessar o localStorage:", error);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data);
      setUser(createdUser);
      setTokens(createdUser.tokens);
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
      console.error(error);
    }
  };

  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data);
      setUser(loggedUser);
      setTokens(loggedUser.tokens);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
      console.error(error);
    }
  };

  const signOut = () => {
    setUser(null);
    removeTokens();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        signOut,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

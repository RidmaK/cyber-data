import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from 'js-cookie';

interface AuthContextProps {
  user: any;
  token: any;
  load: any;
  notification: any;
  setUser: (user: any) => void;
  setToken: (token: any) => void;
  setNotification: (message: any) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  load: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>({ name: "" });
  const [token, _setToken] = useState<any>(null);
  const [notification, _setNotification] = useState("");
  const [load, _setLoad] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = Cookies.get('ACCESS_TOKEN');
    if (storedToken) {
      _setToken(storedToken);
    }
  }, []);

  const setToken = (token: any) => {
    _setToken(token);
    if (token) {
      Cookies.set('ACCESS_TOKEN', token, { expires: 7 });
    } else {
      Cookies.remove('ACCESS_TOKEN');
    }
  };

  const setNotification = (message: any) => {
    _setNotification(message);
    _setLoad(!load);

    setTimeout(() => {
      _setNotification("");
    }, 5000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        load,
        setUser,
        setToken,
        notification,
        setNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

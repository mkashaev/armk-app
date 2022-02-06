import React from 'react';
import { IUser, ILoginDto, login } from 'api/auth';
import { message } from 'antd';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  signin: (user: ILoginDto, callback: VoidFunction) => Promise<void>;
  signout: (callback?: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(() => {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    }
    return null;
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const signin = async (userDto: ILoginDto, callback: VoidFunction) => {
    try {
      setLoading(true);
      const data = await login(userDto);
      localStorage.user = JSON.stringify(data);
      setUser(data);
    } catch (err) {
      console.log(err);
      if ((err as any)?.response?.status === 422) {
        message.error('Нерпавильный логин или пароль');
      } else {
        message.error('Ошибка!');
      }
    } finally {
      setLoading(false);
    }
    callback();
  };

  const signout = (callback?: VoidFunction) => {
    setUser(null);
    localStorage.user = null;
    if (callback) {
      callback();
    }
  };

  const value = { user, loading, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { Spin } from 'antd';

import { auth } from '../components/firebase/config';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid, photoURL, email } = user;
        setUser({
          displayName,
          uid,
          photoURL,
          email,
        });
        setIsLoading(false);
        navigate('/');
      } else {
        setIsLoading(false);
        navigate('/login');
      }
    });

    return () => {
      unsubscribed();
    };
  }, [navigate]);

  return <AuthContext.Provider value={{ user }}>{isLoading ? <Spin></Spin> : children}</AuthContext.Provider>;
}

export default AuthProvider;

import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/logout', {});
      const data = await res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem('auth-user');
      setAuthUser(null);
    } catch (e) {
      toast.error(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;

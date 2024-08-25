import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    try {
      const success = handleInputErrors(email, password);
      if (!success) return;
      setLoading(true);

      const res = await axios.post('/api/auth/login', { email, password });

      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('auth-user', JSON.stringify(data));
      setAuthUser(data);
    } catch (e) {
      toast.error(e.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  return true;
}

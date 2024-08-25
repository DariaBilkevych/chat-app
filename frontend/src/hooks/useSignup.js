import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ firstname, lastname, email, password }) => {
    const success = handleInputErrors({ firstname, lastname, email, password });
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/auth/signup', {
        firstname,
        lastname,
        email,
        password,
      });

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

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ firstname, lastname, email, password }) {
  if (!firstname || !lastname || !email || !password) {
    toast.error('Please fill in all fields!');
    return false;
  }

  if (password.length < 8) {
    toast.error('Password must have at least 8 characters!');
    return false;
  }

  return true;
}

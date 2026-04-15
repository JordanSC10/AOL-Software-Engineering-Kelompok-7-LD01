import { useState, useContext } from 'react'; 
import axios from '../api/axios';
import AuthContext from '../context/AuthContext'; 

export default function Login() {
  const { setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const submit = async () => {
    const res = await axios.post('/auth/login', form);
    setUser(res.data.user);
  };

  return (
    <div className="verify-container">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input type="password" placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />

      <button className="btn-full" onClick={submit}>
        Login
      </button>
    </div>
  );
}
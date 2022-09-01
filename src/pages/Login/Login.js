import styles from './Login.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication( );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password
    }

    const response = await login(user);

    console.log(response);
  }

  useEffect(() => {
    if(authError){
      setError(authError);
    }
  }, [authError]);

  return (
    <div className='blog-container'>
      <div className={styles.login}>
        <h1>Bem-vindo novamente!</h1>
        <p>Faça login para ter acesso à sua conta.</p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>E-mail:</span>
            <input type="email" name="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            <span>Senha:</span>
            <input type="password" name="password" placeholder="Escolha uma senha forte" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          {!loading && <button className='btn'>Entrar!</button>}
          {loading && <button className='btn'>Aguarde...</button>}

          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
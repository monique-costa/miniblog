import styles from './Navbar.module.css';

import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../../hooks/useAuthentication';

import { useAuthValue } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  console.log(user)

  return (
    <nav className={styles.navbar}>
      <NavLink to="/miniblog/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>

      <ul className={styles.list}>
        <li>
          <NavLink to="/miniblog/" className={({isActive}) => (isActive ? styles.active : "")}>
            Home
          </NavLink> 
        </li>

        {!user && (
          <>
            <li>
              <NavLink to="/miniblog/login" className={({isActive}) => (isActive ? styles.active : "")}>
                Entre
              </NavLink> 
            </li>
            <li>
              <NavLink to="/miniblog/register" className={({isActive}) => (isActive ? styles.active : "")}>
                Cadastre-se
              </NavLink> 
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink to="/miniblog/posts/create" className={({isActive}) => (isActive ? styles.active : "")}>
                Criar post
              </NavLink> 
            </li>
            <li>
              <NavLink to="/miniblog/dashboard" className={({isActive}) => (isActive ? styles.active : "")}>
                Dashboard
              </NavLink> 
            </li>
          </>
        )}

        <li>
          <NavLink to="/miniblog/about" className={({isActive}) => (isActive ? styles.active : "")}>
            Sobre
          </NavLink> 
        </li>

        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
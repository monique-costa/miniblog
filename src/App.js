import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// pages
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import ShowPost from './pages/ShowPost/ShowPost';
import EditPost from './pages/EditPost/EditPost';

// components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// contexts
import { AuthProvider } from './context/AuthContext';


function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      
      <AuthProvider value={{user}}>

        <BrowserRouter>

          <Navbar />

          <div className="container">
            <Routes>
              <Route path="/miniblog/" element={ <Home /> } />
              <Route path="/miniblog/about" element={ <About /> } />
              <Route path="/miniblog/search" element={ <Search /> } />
              <Route path="/miniblog/posts/:id" element={ <ShowPost /> } />
              <Route path="/miniblog/login" element={ !user ? <Login /> : <Navigate to="/miniblog/" /> } />
              <Route path="/miniblog/register" element={ !user ? <Register /> : <Navigate to="/miniblog/" /> } />
              <Route path="/miniblog/posts/create" element={ user ? <CreatePost /> : <Navigate to="/miniblog/login" /> } />
              <Route path="/miniblog/posts/edit/:id" element={ user ? <EditPost /> : <Navigate to="/miniblog/login" /> } />
              <Route path="/miniblog/dashboard" element={ user ? <Dashboard /> : <Navigate to="/miniblog/login" /> } />
            </Routes>
          </div>

          <Footer />

        </BrowserRouter>

      </AuthProvider>

    </div>
  );
}

export default App;

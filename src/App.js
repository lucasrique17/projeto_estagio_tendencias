import './App.css';

import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

// HOOKS
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// CONTEXT
import { AuthProvider } from './context/AuthContext';

// PAGES
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Preview from './pages/Preview/Preview';


// COMPONENTES
import NavBar from './components/Navbar'
import Footer from './components/Footer'


function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  //Fazer Login
  const loadingUser = user === undefined

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

  }, [auth])
  
  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
     <AuthProvider value={{user}}>
      <BrowserRouter>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
          <Route path='/preview' element={user ? <Preview /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
     </AuthProvider>
    </div>
  );
}

export default App;

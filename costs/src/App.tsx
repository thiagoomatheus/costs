import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NewProject from './pages/NewProject';
import Container from "./components/layout/Container";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { SetUserContext, UserContext } from './components/contexts/Contexts';
import ProjectsContextProviver from './components/contexts/ProjectsContextProvider.tsx';
import MessageContextProvider from './components/contexts/MessageContextProvider.tsx';

const app = initializeApp({
  apiKey: "AIzaSyCyGIgTSkafFGsVTBJCqbNFQVjpXJtw9Fg",
  authDomain: "costs-eb4d9.firebaseapp.com",
  projectId: "costs-eb4d9",
  storageBucket: "costs-eb4d9.appspot.com",
  messagingSenderId: "82177748204",
  appId: "1:82177748204:web:bc5d4252fdbde71ebe49c9"
})

export const db = getFirestore(app)

export default function App() {
  
  const [uid, setUid] = useState<string | undefined>()

  return ( 
    <UserContext.Provider value={uid}>
      <SetUserContext.Provider value={setUid}>
        <ProjectsContextProviver>
          <MessageContextProvider>
            <Router>
              <Header />
              <Container>
                  <Routes>
                      <Route path='/' element={ <Home />} />
                      <Route path='/projects' element={ <Projects />} />
                      <Route path='/projects/:id' element={ <ProjectId />} />
                      <Route path='/login' element={ <Login />} />
                      <Route path='/newproject' element={ <NewProject />} />
                      <Route path='/register' element={ <Register />} />
                  </Routes>
              </Container>
              <Footer />
            </Router>
          </MessageContextProvider>
        </ProjectsContextProviver>
      </SetUserContext.Provider>  
    </UserContext.Provider>  
  )
}

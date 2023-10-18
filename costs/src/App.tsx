import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NewProject from './pages/NewProject';
import Container from "./components/layout/Container";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { CategoriesContext, MessageContext, ProjectsContext, SetMessageContext, SetProjectsContext, SetUserContext, UserContext } from './components/contexts/Contexts';
import { Message } from './components/hooks/useMessage';
import { ProjectType } from './components/types/types';

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

  const [projects, setProjects] = useState<ProjectType[]>()
  const [categories, setCategories] = useState()
  const [uid, setUid] = useState<string | undefined>()
  const [message, setMessage] = useState<{
    message: Message | undefined,
    type: "error" | "success" | undefined
  }>()

  useEffect(() => {  // Usando coleção com o id do usuário
    const data: any = [];
    const getData = async () => {
        try {
          const r = await getDocs(collection(db, (uid ? uid : "")))
          r.forEach((doc) => {
            data?.push(doc.data())
          })
          setProjects(data)
        } catch (error) {
          setProjects(undefined)
          console.log(error);
        } 
    }
    const getCategories = async () => {
      const r = await getDoc(doc(db, 'content', 'categories'))
      try {
        if (r.exists()) {
          setCategories(r.data().categories)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCategories()
    getData()
  },[uid])

  return (
    <UserContext.Provider value={uid}>
      <SetUserContext.Provider value={setUid}>
        <MessageContext.Provider value={message}>
          <SetMessageContext.Provider value={setMessage}>
            <Router>
              <Header />
              <Container>
                <ProjectsContext.Provider value={projects}>
                  <SetProjectsContext.Provider value={setProjects}>
                    <CategoriesContext.Provider value={categories}>
                      <Routes>
                          <Route path='/' element={ <Home />} />
                          <Route path='/projects' element={ <Projects />} />
                          <Route path='/projects/:id' element={ <ProjectId />} />
                          <Route path='/login' element={ <Login />} />
                          <Route path='/newproject' element={ <NewProject />} />
                          <Route path='/register' element={ <Register />} />
                      </Routes>
                    </CategoriesContext.Provider>
                  </SetProjectsContext.Provider>
                </ProjectsContext.Provider>
              </Container>
              <Footer />
            </Router>
          </SetMessageContext.Provider>
        </MessageContext.Provider>
      </SetUserContext.Provider>  
    </UserContext.Provider>  
  )
}

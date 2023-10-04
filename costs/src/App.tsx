import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Contato from './pages/Contato'
import Empresa from './pages/Empresa'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NewProject from './pages/NewProject';
import Container from "./components/layout/Container";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";
import { createContext, useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

const app = initializeApp({
  apiKey: "AIzaSyCyGIgTSkafFGsVTBJCqbNFQVjpXJtw9Fg",
  authDomain: "costs-eb4d9.firebaseapp.com",
  projectId: "costs-eb4d9",
  storageBucket: "costs-eb4d9.appspot.com",
  messagingSenderId: "82177748204",
  appId: "1:82177748204:web:bc5d4252fdbde71ebe49c9"
})

export const db = getFirestore(app)

export type ServiceType = {
  id: string,
  title: string,
  cost: number,
  description: string
}
export type ProjectType = {
  id: string,
  name: string | undefined,
  budget: number | undefined,
  cost: number | undefined,
  category: string | undefined,
  services: ServiceType[] |
   undefined
}
export type ProjectsData = Array<ProjectType> | undefined
export type Categories = {
  id: number,
  name: string
}[]

export const CategoriesContext = createContext<Categories | undefined>(undefined)
export const ProjectsContext = createContext<ProjectType[] | undefined>(undefined)
export const SetProjectsContext = createContext<React.Dispatch<React.SetStateAction<ProjectType[] | undefined>>>(() => {})
export const UserContext = createContext<string | undefined>(undefined)
export const SetUserContext = createContext<React.Dispatch<React.SetStateAction<string | undefined>>>(() => {})

export default function App() {

  const [projects, setProjects] = useState<ProjectType[]>()
  const [categories, setCategories] = useState()
  const [uid, setUid] = useState<string | undefined>()

  function getUserId(uid: string) {
    setUid(uid)
  }

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
                      <Route path='/company' element={ <Empresa />} />
                      <Route path='/contact' element={ <Contato />} />
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
      </SetUserContext.Provider>  
    </UserContext.Provider>  
  )
}

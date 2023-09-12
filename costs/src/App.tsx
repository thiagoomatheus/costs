import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Contato from './pages/Contato'
import Empresa from './pages/Empresa'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NewProject from './pages/NewProject';
import Container from "./components/layout/Container";
import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query } from "firebase/firestore";
import Projects from "./pages/Projects";
import ProjectId from "./pages/ProjectId";
import { createContext, useState, useEffect } from "react";
import { ProjectType } from "./components/form/ProjectForm";

const app = initializeApp({
  apiKey: "AIzaSyCyGIgTSkafFGsVTBJCqbNFQVjpXJtw9Fg",
  authDomain: "costs-eb4d9.firebaseapp.com",
  projectId: "costs-eb4d9",
  storageBucket: "costs-eb4d9.appspot.com",
  messagingSenderId: "82177748204",
  appId: "1:82177748204:web:bc5d4252fdbde71ebe49c9"
})

export const db = getFirestore(app)

export type ProjectsData = Array<ProjectType>| undefined

export const ProjectsContext = createContext<ProjectsData>(undefined)
export const SetProjectsContext = createContext<React.Dispatch<React.SetStateAction<ProjectsData>>>(() => {})

export default function App() {

  const [projects, setProjects] = useState<ProjectsData>()

  useEffect(() => {
    const docRef = doc(db, "projects", "3lMligpcZ07hUbWgKvrD")
    const getData = async () => {
        const r = await getDoc(docRef)
        if (!r.exists()) {
            console.log("erro");
            return
        }
        setProjects(r.data().projects);
    }
    getData()
  },[])

  useEffect(() => {
    // const docRef = doc(db, "user", "6bbQnvJI1fevlS17kF7aJVgb4UU2")
    // const getData = async () => {
    //     const r = await getDoc(docRef)
    //     if (!r.exists()) {
    //         console.log("erro");
    //         return
    //     }
    //     console.log(r.data());
        
    // }
    // getData()

    const querySnapshot = async () => {
      const r = await getDocs(collection(db, "users", "6bbQnvJI1fevlS17kF7aJVgb4UU2", "projects"))
      r.forEach((doc) => {
        console.log(doc.id, doc.data());
      })
    }
    querySnapshot()
  },[])


  return (
    <Router>
      <Header />
      <Container>
        <ProjectsContext.Provider value={projects}>
          <SetProjectsContext.Provider value={setProjects}>
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/projects' element={ <Projects />} />
                <Route path='/projects/:id' element={ <ProjectId />} />
                <Route path='/company' element={ <Empresa />} />
                <Route path='/contact' element={ <Contato />} />
                <Route path='/newproject' element={ <NewProject />} />
            </Routes>
          </SetProjectsContext.Provider>
        </ProjectsContext.Provider>
      </Container>
      <Footer />
    </Router>
  )
}

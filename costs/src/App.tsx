import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export type ProjectsData = Array<ProjectType> | undefined
export type Categories = {
  id: number,
  name: string
}[]

export const CategoriesContext = createContext<Categories | undefined>(undefined)
export const ProjectsContext = createContext<ProjectsData>(undefined)
export const SetProjectsContext = createContext<React.Dispatch<React.SetStateAction<ProjectsData>>>(() => {})

export default function App() {

  const [projects, setProjects] = useState<ProjectsData>()
  const [categories, setCategories] = useState()

  useEffect(() => {  // Usando coleção com o id do usuário
    const data: any = [];
    const getData = async () => {
        const r = await getDocs(collection(db, 'userId'))
        try {
          r.forEach((doc) => {
            data?.push(doc.data())
          })
          setProjects(data)
        } catch (error) {
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
  },[])

  // useEffect(() => {
  //   const data: any = []
  //   const querySnapshot = async () => { // Usando subcoleção 
  //     const response = await getDocs(collection(db, "users", "6bbQnvJI1fevlS17kF7aJVgb4UU2", "projects"))
  //     try {
  //       response.forEach((doc) => {
  //         data?.push(doc.data())
  //       })
  //       setProjects(data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   querySnapshot()
  // },[])

  return (
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
                  <Route path='/newproject' element={ <NewProject />} />
              </Routes>
            </CategoriesContext.Provider>
          </SetProjectsContext.Provider>
        </ProjectsContext.Provider>
      </Container>
      <Footer />
    </Router>
  )
}

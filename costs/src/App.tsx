import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Projetos from './pages/Projeto'
import Contato from './pages/Contato'
import Empresa from './pages/Empresa'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NewProject from './pages/NewProject';
import Projeto from "./pages/Projeto";
import Container from "./components/layout/Container";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Projects from "./pages/Projects";

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

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/projects' element={ <Projects />} />
            <Route path='/company' element={ <Empresa />} />
            <Route path='/contact' element={ <Contato />} />
            <Route path='/newproject' element={ <NewProject />} />
            {/* <Route path='/projects/:id' element={ <Projeto />} /> */}
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

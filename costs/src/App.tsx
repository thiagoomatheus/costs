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

function App() {

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/projects' element={ <Projetos />} />
            <Route path='/company' element={ <Empresa />} />
            <Route path='/contact' element={ <Contato />} />
            <Route path='/newproject' element={ <NewProject />} />
            <Route path='/projects/:id' element={ <Projeto />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;

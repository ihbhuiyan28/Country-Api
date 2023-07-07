import './App.css';
import FooterLayout from './layouts/FooterLayout';
import NavbarLayout from './layouts/NavbarLayout';
import HomePage from './pages/HomePage';

import { Container } from 'react-bootstrap';

function App() {

  return (
    <div className="App">
      <Container>
        <NavbarLayout />
        <HomePage />
        <FooterLayout />
      </Container>
    </div>
  );
}

export default App;

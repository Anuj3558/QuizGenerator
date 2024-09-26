import logo from './logo.svg';
import './App.css';
import LandingPage from './Compnents/LandingPage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <LandingPage />
  </BrowserRouter>
  );
}

export default App;

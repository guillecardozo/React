import './App.css';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import Dashboard from './components/Dashboard/Dashboard';
import NoEncontrado from './components/NoEncontrado';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/registro" element={<Registro/>}  />
            <Route path="/dashboard" element={<Dashboard/>}   />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

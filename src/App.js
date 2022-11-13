import { Login } from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Cadastrar } from './pages/Cadastrar';
import { Dashboard } from './pages/Dashboard';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={< Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cadastrar" element={<Cadastrar />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

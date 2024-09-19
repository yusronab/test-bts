import Protected from './components/Protected';
import Home from './pages/Home';
import Login from './pages/Login';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Protected />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
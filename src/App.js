import './App.css';
import Login from './Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
function App() {
  return (
    <Router>
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login />} />
    </Routes>
    </>
    </Router>
  );
}

export default App;

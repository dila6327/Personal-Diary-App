import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/LogIn";
import Diary from "./components/Diary";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
    </Router>
  );
}

export default App;

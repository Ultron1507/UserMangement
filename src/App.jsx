import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login"; 
import User from "./Pages/User"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App; 



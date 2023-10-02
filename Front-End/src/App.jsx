import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIN from "./pages/SignIn";
import User from "./pages/User";

const App = () => {

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIN/>} />
        <Route path="/profile" element={<User />} />
      </Routes>
    </Router>

  )
}

export default App

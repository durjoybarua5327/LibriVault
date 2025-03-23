import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Premium from "./Premium/Premium";4
import Contact from "./Contact/Contact";
import About from "./About/About";
import SignUp from "./components/SignUp";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Premium" element={<Premium />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/SignUp" element={<SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Premium from "./Premium/Premium";4
import Contact from "./Contact/Contact";
import About from "./About/About";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Premium" element={<Premium />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

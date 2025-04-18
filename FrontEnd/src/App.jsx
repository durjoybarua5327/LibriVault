import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Premium from "./Premium/Premium";4
import Contact from "./Contact/Contact";
import About from "./About/About";
import SignUp from "./components/SignUp";
import CategoryBooks_premium from "./Books/CategoryBooks_premium";
import CategoryBooks_free from "./Books/CategoryBooks_free";
import { useAuth } from "./Context/Authprovider";
import { Toaster } from 'react-hot-toast';

function App() {
  const [authUser ] = useAuth()
    console.log(authUser)
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Premium" element={authUser?<Premium />: <Navigate to="/SignUp"/>} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/premium/:categoryName" element={<CategoryBooks_premium source="premium" />} />
        <Route path="/free/:categoryName" element={<CategoryBooks_free source="free" />} />


      </Routes>
    </Router>
  );
}

export default App;

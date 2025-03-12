import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './assets/Components/Navbar.jsx';
import Body from './assets/components/Body.jsx';
import Footer from './assets/components/Footer.jsx';
import About from './assets/components/About.jsx';
import Contact from './assets/components/Contact.jsx';
import Signin from './assets/components/Signin.jsx';
import FAQ from './assets/components/FAQ.jsx';
import Terms from './assets/components/Terms.jsx';
import Privacy from './assets/components/Privacy.jsx';
import Browse from './assets/components/Browse.jsx';
import Sell from './assets/components/Sell.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/FAQ" element={<FAQ/>}/>
        <Route path="/Terms" element={<Terms/>}/>
        <Route path="/Privacy" element={<Privacy/>}/>
        <Route path="/Browse" element={<Browse/>}/>
        <Route path="/Sell" element={<Sell/>}/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './assets/Components/Navbar';
import Body from './assets/components/Body';
import Footer from './assets/components/Footer';
import About from './assets/components/About';
import Contact from './assets/components/Contact';
import Signin from './assets/components/Signin';
import FAQ from './assets/components/FAQ';
import Terms from './assets/components/Terms';
import Privacy from './assets/components/Privacy';
import Browse from './assets/components/Browse';
import Sell from './assets/components/Sell';

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

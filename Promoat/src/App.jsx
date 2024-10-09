import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import  Promotions from "./components/promotion"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promotions" element={<Promotions />} />

      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Messages from './pages/Messages';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home (Expenses)</Link> | <Link to="/messages">Messages</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
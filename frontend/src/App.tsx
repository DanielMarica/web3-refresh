import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Messages from './pages/Messages';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout = route parent (pas de path) */}
        <Route element={<Layout />}>
          {/* Routes enfants qui s'affichent dans <Outlet /> */}
          <Route index element={<Welcome />} />
          <Route path="/expenses" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Routes>
    </Router>
  );
}
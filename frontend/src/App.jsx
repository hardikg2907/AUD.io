import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Sidebar from './components/Sidebar';
import Layout from './Layout';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes> */}
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;

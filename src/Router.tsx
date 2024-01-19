import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import List from './pages/List';
import Detail from './pages/Detail';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import User from './pages/User';
import Footer from './components/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

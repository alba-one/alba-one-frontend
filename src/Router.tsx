import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import List from './pages/List';
import Detail from './pages/Detail';
import UserForm from './pages/UserForm';
import User from './pages/User';
import Footer from './components/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<List />} />
        <Route path="/shops/:shop_id/notices/:notice_id" element={<Detail />} />
        <Route path="/signin" element={<UserForm />} />
        <Route path="/signup" element={<UserForm />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

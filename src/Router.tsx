import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import List from './pages/List';
import Detail from './pages/Detail';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import User from './pages/User';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

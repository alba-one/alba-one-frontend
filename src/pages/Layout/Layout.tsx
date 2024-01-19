import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import css from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Nav />
      <main className={css.container}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

import { useLocation } from 'react-router-dom';
import Icon from '@_icon/Icon';
import DoNotLog from './DoNotLog';
import Logined from './Logined';
import css from './Nav.module.scss';

const Nav = () => {
  const location = useLocation();
  const isLogined = localStorage.getItem('token');

  if (location.pathname === '/signin' || location.pathname === '/signup')
    return null;

  return (
    <nav className={css.nav}>
      <Icon title="logo" />
      <div className={css.searchBox}>
        <Icon title="search" />
        <input
          className={css.searchInput}
          placeholder="가게 이름으로 찾아보세요"
        />
      </div>
      <div className={css.actionBox}>
        {isLogined ? <Logined /> : <DoNotLog />}
      </div>
    </nav>
  );
};

export default Nav;

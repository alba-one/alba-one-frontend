import { Link, useNavigate } from 'react-router-dom';
import Icon from '@_components/Icon';
import css from './Logined.module.scss';

const Logined = () => {
  const navigate = useNavigate();
  const isemployee = localStorage.getItem('type') === 'employee';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    navigate('/');
  };

  return (
    <>
      <Link className={css.cta} to="/user">
        {isemployee ? '내 프로필' : '내 가게'}
      </Link>
      <button className={css.cta} onClick={handleLogout}>
        로그아웃
      </button>
      <Icon title="notiEmpty" />
    </>
  );
};

export default Logined;

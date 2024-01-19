import { Link } from 'react-router-dom';
import css from './DoNotLog.module.scss';

const DoNotLog = () => {
  return (
    <>
      <Link className={css.cta} to={'/signin'}>
        로그인
      </Link>
      <Link className={css.cta} to={'/signup'}>
        회원가입
      </Link>
    </>
  );
};

export default DoNotLog;

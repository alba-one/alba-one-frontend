import Icon from '@_icon/Icon';
import css from './Logined.module.scss';

const Logined = () => {
  return (
    <>
      <button className={css.cta}>내 가게</button>
      <button className={css.cta}>로그아웃</button>
      <Icon title="notiEmpty" />
    </>
  );
};

export default Logined;

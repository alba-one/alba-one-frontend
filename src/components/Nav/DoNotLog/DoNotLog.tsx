import css from './DoNotLog.module.scss';

const DoNotLog = () => {
  return (
    <>
      <button className={css.cta}>로그인</button>
      <button className={css.cta}>회원가입</button>
    </>
  );
};

export default DoNotLog;

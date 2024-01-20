import css from './None.module.scss';

const None = () => {
  return (
    <section className={css.none}>
      <div className={css.title}>내 프로필</div>
      <div className={css.noCard}>
        <div className={css.comment}>
          내 프로필을 등록하고 원하는 가게에 지원해 보세요.
        </div>
        <button className={css.makeProfileBtn}>내 프로필 등록하기</button>
      </div>
    </section>
  );
};

export default None;

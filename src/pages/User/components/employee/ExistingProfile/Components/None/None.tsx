import { useNavigate } from 'react-router-dom';
import css from './None.module.scss';

const None = () => {
  const navigate = useNavigate();

  return (
    <section className={css.none}>
      <div className={css.comment}>아직 신청 내역이 없어요.</div>
      <button className={css.showListBtn} onClick={() => navigate('/')}>
        공고 보러가기
      </button>
    </section>
  );
};

export default None;

import css from './Detail.module.scss';
import LargeCard from '../../components/LargeCard/LargeCard';
import Card from '@_components/Card';

const Detail = () => {
  return (
    <section className={css.container}>
      <div className={css.topOfDetail}>
        <div className={css.title}>
          <div className={css.category}>카페</div>
          <div className={css.storeName}>지연이 카페</div>
        </div>
        <LargeCard type="alba" />
        <div className={css.storeDescription}>
          <div className={css.descriptionTitle}>공고 설명</div>
          <div className={css.descriptionWords}>
            이벤트를 진행하게 되어 이벤트 시간동안 일손이 부족해요! <br />
            급하게 구하게되어 시급도 높였습니다.
          </div>
        </div>
      </div>

      <div className={css.showRecent}>
        <div className={css.recentTitle}>최근에 본 공고</div>
        <div className={css.recentGrid}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
};

export default Detail;

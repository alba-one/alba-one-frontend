import Icon from '@_components/Icon';
import css from './Card.module.scss';

const Card = () => {
  return (
    <div className={css.storeCard}>
      <div className={css.storeImg} />
      <div className={css.storeInfo}>
        <div className={css.innerTitle}>시급</div>
        <div className={css.hourlyWage}>
          15,000원
          <div className={css.percentBadge}>
            기존 시급보다 50%
            <Icon title="arrowUp" />
          </div>
        </div>

        <div className={css.when}>
          <Icon title="clock" />
          <div className={css.timeTable}>2023.01.19 14:00 ~ 18:00</div>
        </div>
        <div className={css.where}>
          <Icon title="location" />
          <div className={css.location}>서울시 중구</div>
        </div>
        <div className={css.greeting}>편안한 분위기의 동네 카페 !</div>
        <button className={css.applyBtn}>신청하기</button>
      </div>
    </div>
  );
};

export default Card;

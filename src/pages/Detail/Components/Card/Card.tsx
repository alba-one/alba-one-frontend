import Icon from 'src/components/Icon';
import css from './Card.module.scss';

const Card = () => {
  return (
    <div className={css.storeCard}>
      <div className={css.storeImg} />
      <div className={css.storeInfo}>
        <div className={css.innerTitle}>시급</div>
        <div className={css.hourlyWage}>15,000원</div>
        <div className={css.percentBadge}>
          기존 시급보다 50%<div className={css.arrowUp}></div>
        </div>
        <div className={css.time}>
            <Icon 
        </div>
        <div className={css.location}></div>
        <div className={css.greeting}></div>
      </div>
    </div>
  );
};

export default Card;

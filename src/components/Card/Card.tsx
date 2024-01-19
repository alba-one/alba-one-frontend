import Icon from '@_components/Icon';
import { ShopType } from 'src/types/cardType';

import css from './Card.module.scss';

const Card = ({ name, imageUrl, address1 }: ShopType) => {
  return (
    <div className={css.card}>
      <div className={css.cardImageBox}>
        <img
          className={css.cardImage}
          src={imageUrl}
          //   src="https://velog.velcdn.com/images%2Fjyyoun1022%2Fpost%2F1c640590-42d9-4be7-94fa-e6f5e30b51a0%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-24%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.52.59.png"
          alt={`${name} image`}
        />
      </div>
      <div className={css.infoBox}>
        <h3 className={css.storeTitle}>{name}</h3>
        <div className={css.descBox}>
          <Icon title="clock" />
          <span className={css.desc}>2023-02-31 15:00~18:00 (3시간)</span>
        </div>
        <div className={css.descBox}>
          <Icon title="location" />
          <span className={css.desc}>{address1}</span>
        </div>
      </div>
      <div className={css.payBox}>
        <span className={css.pay}>15,000원</span>
        <label className={css.comparePay}>
          기존 시급보다 10% <Icon title="arrowUp" />
        </label>
      </div>
    </div>
  );
};

export default Card;

import Icon from '@_components/Icon';
import { NotiType, ShopType } from 'src/types/cardType';

import { useNavigate } from 'react-router-dom';

import css from './Card.module.scss';

interface Props {
  announcement: {
    item: NotiType;
  };
  shopInfo: ShopType;
}

const Card = ({ announcement, shopInfo }: Props) => {
  const navigate = useNavigate();

  const { hourlyPay, workhour, startsAt } = announcement.item;

  const { id, name, address1, imageUrl, originalHourlyPay } = shopInfo;

  const noticeId = announcement.item.id;
  console.log(noticeId);

  const hourlyPayForm = () => {
    return hourlyPay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  const startsAtForm = () => {
    const date = startsAt.substring(0, 10);
    const time = startsAt.substring(11, 16);

    return `${date} ${time}`;
  };

  const checkPercent = () => {
    const percent = (hourlyPay / originalHourlyPay) * 100;

    return Math.floor(percent);
  };

  const goToDetail = () => {
    const url = `/shops/${id}/notices/${noticeId}`;

    navigate(url);
    window.location.href = window.location.href;
  };

  return (
    <div className={css.card} onClick={goToDetail}>
      <div className={css.cardImageBox}>
        <img className={css.cardImage} src={imageUrl} alt={`${name} image`} />
      </div>
      <div className={css.infoBox}>
        <h3 className={css.storeTitle}>{name}</h3>
        <div className={css.descBox}>
          <Icon title="clock" />
          <span className={css.desc}>
            {startsAtForm()} ({workhour}시간)
          </span>
        </div>
        <div className={css.descBox}>
          <Icon title="location" />
          <span className={css.desc}>{address1}</span>
        </div>
      </div>
      <div className={css.payBox}>
        <span className={css.pay}>{hourlyPayForm()}원</span>
        <label className={css.comparePay}>
          기존 시급보다 {checkPercent()}% <Icon title="arrowUp" />
        </label>
      </div>
    </div>
  );
};

export default Card;

import moment from 'moment';
import Icon from '@_components/Icon';
import { NoticeDetail, ShopInfo } from '@_types/noticeTypes';
import css from './LargeCard.module.scss';

interface Props {
  isEmployee: boolean;
  notice: NoticeDetail;
  shop: ShopInfo;
}

const LaregeCard = ({ isEmployee, notice, shop }: Props) => {
  const { hourlyPay, startsAt, workhour } = notice;

  return (
    <div className={`${css.storeCard} ${isEmployee ? '' : css.redCard}`}>
      <img src={shop.imageUrl} className={css.storeImg} />
      <div className={css.storeInfo}>
        <div className={css.innerTitle}>{isEmployee ? '시급' : '식당'}</div>
        <div className={css.mainText}>
          {isEmployee
            ? Number(hourlyPay).toLocaleString() + '원'
            : '도토리 식당'}
          {isEmployee ? (
            <div className={css.percentBadge}>
              기존 시급보다 50%
              <Icon title="arrowUp" />
            </div>
          ) : (
            ''
          )}
        </div>

        {isEmployee ? (
          <div className={css.when}>
            <Icon title="clock" />
            <div className={css.timeTable}>
              {`${moment(startsAt).format('YYYY.MM.DD hh.mm')} ~ ${moment(
                startsAt
              )
                .add(workhour, 'hour')
                .format('hh.mm')}`}
            </div>
          </div>
        ) : (
          ''
        )}

        <div className={css.where}>
          <Icon title="location" />
          <div className={css.location}>{shop.address1}</div>
        </div>
        <div className={css.greeting}>{shop.description}</div>
        {isEmployee ? (
          <button className={css.applyBtn}>신청하기</button>
        ) : (
          <div className={css.storeBtnBox}>
            <button className={css.editBtn}>편집하기</button>
            <button className={css.registerBtn}>공고 등록하기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaregeCard;

import Icon from '@_components/Icon';
import css from './LargeCard.module.scss';

interface LargeCardProps {
  type: string;
}

const largeCard = ({ type }: LargeCardProps) => {
  return (
    <div className={`${css.storeCard} ${type === 'store' ? css.redCard : ''}`}>
      <div className={css.storeImg} />
      <div className={css.storeInfo}>
        <div className={css.innerTitle}>
          {type === 'store' ? '식당' : '시급'}
        </div>
        <div className={css.mainText}>
          {type === 'store' ? '도토리식당' : '15,000원'}
          {type === 'store' ? (
            ''
          ) : (
            <div className={css.percentBadge}>
              기존 시급보다 50%
              <Icon title="arrowUp" />
            </div>
          )}
        </div>

        {type === 'store' ? (
          ''
        ) : (
          <div className={css.when}>
            <Icon title="clock" />
            <div className={css.timeTable}>2023.01.19 14:00 ~ 18:00</div>
          </div>
        )}

        <div className={css.where}>
          <Icon title="location" />
          <div className={css.location}>서울시 중구</div>
        </div>
        <div className={css.greeting}>
          편안한 분위기의 동네 카페 ! 동네 단골 손님들 위주의 카페라 많이 바쁘지
          않고 편안하게 일할 수 있습니다😊
        </div>
        {type === 'store' ? (
          <div className={css.storeBtnBox}>
            <button className={css.editBtn}>편집하기</button>
            <button className={css.registerBtn}>공고 등록하기</button>
          </div>
        ) : (
          <button className={css.applyBtn}>신청하기</button>
        )}
      </div>
    </div>
  );
};

export default largeCard;

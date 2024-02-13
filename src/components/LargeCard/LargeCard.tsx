import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import moment from 'moment';
import Icon from '@_components/Icon';
import { NoticeDetail, ShopInfo } from '@_types/noticeTypes';
import { getAxios, postAxios, putAxios } from '@_lib/axios';
import css from './LargeCard.module.scss';

interface Props {
  isEmployee: boolean;
  notice: NoticeDetail;
  shop: ShopInfo;
  setIsOpenShopInfo: Dispatch<SetStateAction<boolean>>;
}

const LaregeCard = ({
  isEmployee,
  notice,
  shop,
  setIsOpenShopInfo = () => {},
}: Props) => {
  const [applicationList, setApplicationList] = useState({});
  const [refetch, setRefetch] = useState(false);

  const { hourlyPay, startsAt, workhour, id } = notice;

  useEffect(() => {
    if (isEmployee === true) {
      getAxios(`/users/${localStorage.getItem('userId')}/applications`).then(
        res => setApplicationList(res.data)
      );
    }
  }, [refetch]);

  const handleApplication = () => {
    if (isEmployee === true) {
      getAxios(`/users/${localStorage.getItem('userId')}`).then(res => {
        if (res.data.item.name) {
          postAxios(`/shops/${shop.id}/notices/${id}/applications`, {}).then(
            res => setRefetch(prev => !prev)
          );
        } else {
          alert('프로필을 먼저 등록해주세요');
        }
      });
    }
  };

  if (!applicationList?.items) return null;

  const userApplicationIds = applicationList?.items.filter(
    el => el.item.notice.item.id === id && el.item.status !== 'canceled'
  );

  const handleCancleApply = () => {
    putAxios(
      `/shops/${shop.id}/notices/${id}/applications/${userApplicationIds[0].item.id}`,
      {
        status: 'canceled',
      }
    ).then(res => setRefetch(prev => !prev));
  };

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
          userApplicationIds.length !== 0 ? (
            <button className={css.applyBtn} onClick={handleCancleApply}>
              취소하기
            </button>
          ) : (
            <button className={css.applyBtn} onClick={handleApplication}>
              신청하기
            </button>
          )
        ) : (
          <div className={css.storeBtnBox}>
            <button
              className={css.editBtn}
              onClick={() => {
                setIsOpenShopInfo(prev => !prev);
              }}
            >
              편집하기
            </button>
            <button className={css.registerBtn}>공고 등록하기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaregeCard;

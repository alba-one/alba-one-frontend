import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserType } from '@_hooks/useGetUserType';
import { getAxios } from '@_lib/axios';

import Card from '@_components/Card';
import { ShopType } from '@_types/cardType';

import css from './ApplyList.module.scss';

interface Props {
  userId: string;
  handleNotice: () => void;
  shopInfo: ShopType;
}

const ApplyList = ({ userId, handleNotice, shopInfo }: Props) => {
  const [notice, setNotice] = useState<{
    offset: number;
    limit: number;
    count: number;
    hasNext: boolean;
    items: [];
  }>();

  const navigate = useNavigate();
  const { isEmployee } = useGetUserType();

  useEffect(() => {
    const checkNoticeUrl = isEmployee
      ? `/users/${userId}/applications`
      : `/shops/${userId}/notices`;

    getAxios(checkNoticeUrl).then(res => {
      setNotice(res.data);
    });
  }, [userId]);

  const noticeItems = notice?.items;

  if (!notice) return null;
  if (!noticeItems) return null;

  return (
    <div>
      {notice?.count === 0 ? (
        <div className={css.newApplyBox}>
          <span className={css.notice}>
            {isEmployee ? '아직 신청 내역이 없어요' : '공고를 등록해보세요'}
          </span>
          <button
            className={css.applyBtn}
            onClick={isEmployee ? () => navigate('/') : handleNotice}
          >
            {isEmployee ? '공고 보러가기' : '공고 등록하기'}
          </button>
        </div>
      ) : (
        <div className={css.noticeItemsGrid}>
          {noticeItems?.map((el, idx) => (
            <Card key={idx} announcement={el} shopInfo={shopInfo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplyList;

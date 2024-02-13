import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserType } from '@_hooks/useGetUserType';
import { getAxios } from '@_lib/axios';

import Card from '@_components/Card';
import { ShopType } from '@_types/cardType';

import css from './ApplyList.module.scss';
import Pagination from '@_components/Pagination/Pagination';

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

  const [totalCount, setTotalCount] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const limit = 6;

  const navigate = useNavigate();
  const { isEmployee } = useGetUserType();

  useEffect(() => {
    const checkNoticeUrl = isEmployee
      ? `/users/${userId}/applications`
      : `/shops/${userId}/notices?offset=${offset}&limit=${limit}`;

    getAxios(checkNoticeUrl).then(res => {
      setNotice(res.data);
      setTotalCount(res.data.count);
    });
  }, [userId, offset]);

  const noticeItems = notice?.items;

  if (!notice) return null;
  if (!noticeItems) return null;
  if (!totalCount) return null;

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

      <Pagination
        totalCount={totalCount}
        limit={limit}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  );
};

export default ApplyList;

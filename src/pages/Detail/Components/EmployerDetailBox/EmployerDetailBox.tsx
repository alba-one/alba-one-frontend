import Icon from '@_components/Icon';
import AnnouncedInfo from '../AnnouncedInfo/AnnouncedInfo';

import css from './EmployerDetailBox.module.scss';
import { useEffect, useState } from 'react';
import { getAxios } from '@_lib/axios.ts';
import { useParams } from 'react-router-dom';

const EmployerDetailBox = () => {
  const [applyUserList, setApplyUserList] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const handleRefetch = () => {
    setRefetch(prev => !prev);
  };

  let total = 30;
  let limit = 5;

  let pageNum = total / limit;

  let pageNumArr = new Array(pageNum).fill(1);

  const params = useParams();

  useEffect(() => {
    getAxios(`/shops/c9412e6d-a49d-4e19-9144-5f0dc958db9f/notices/${params.id}/applications
    `).then(res => {
      setApplyUserList(
        res.data.items.map((el: any) => ({
          ...el.item.user,
          id: el.item.id,
          shopId: el.item.shop.item.id,
          noticeId: el.item.notice.item.id,
          status: el.item.status,
        }))
      );
    });
  }, [refetch]);

  // console.log(applyUserList);

  return (
    <section className={css.annouceBox}>
      <div className={css.titleColumnBox}>
        <div className={css.titleColumn}>신청자</div>
        <div className={css.titleColumn}>소개</div>
        <div className={css.titleColumn}>전화번호</div>
        <div className={css.titleColumn}>상태</div>
      </div>
      {applyUserList.map((list, idx) => {
        return (
          <AnnouncedInfo
            key={list?.item.id + idx}
            applyList={list}
            handleRefetch={handleRefetch}
          />
        );
      })}

      <div className={`${css.announceInfo} ${css.pagination}`}>
        <div className={css.pageNum}>
          <Icon title="chevronLeft" />
        </div>
        {pageNumArr.map((el, idx) => {
          return (
            <div key={idx} className={css.pageNum}>
              {el + idx}
            </div>
          );
        })}

        <div className={css.pageNum}>
          <Icon title="chevronRight" />
        </div>
      </div>
    </section>
  );
};

export default EmployerDetailBox;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserType } from '@_hooks/useGetUserType.ts';

import LargeCard from '../../components/LargeCard/LargeCard';
import EmployerDetailBox from './Components/EmployerDetailBox/EmployerDetailBox.tsx';
import EmployeeDetailBox from './Components/EmployeeDetailBox/EmployeeDetailBox.tsx';

import { getAxios } from '@_lib/axios.ts';
import { Notice } from '@_types/noticeTypes.ts';
import css from './Detail.module.scss';

const Detail = () => {
  const [noticeDetail, setNoticeDetail] = useState<Notice>({});
  const { isEmployee } = useGetUserType();
  const params = useParams();

  useEffect(() => {
    getAxios(
      `/shops/790cd517-d6c4-4f21-88cd-9d394d379674/notices/${params.id}`
    ).then(({ data }) => {
      setNoticeDetail(data.item);
    });
  }, []);

  if (!noticeDetail.description) return null;

  const { shop, ...rest } = noticeDetail;
  const shopInfo = shop.item;
  const notice = { ...rest };

  return (
    <section className={css.container}>
      <div className={css.topOfDetail}>
        <div className={css.title}>
          <div className={css.category}>{shopInfo.category}</div>
          <div className={css.storeName}>{shopInfo.name}</div>
        </div>
        <LargeCard isEmployee={isEmployee} notice={notice} shop={shopInfo} />
        <div className={css.storeDescription}>
          <div className={css.descriptionTitle}>공고 설명</div>
          <div className={css.descriptionWords}>{noticeDetail.description}</div>
        </div>
      </div>

      {isEmployee ? <EmployeeDetailBox /> : <EmployerDetailBox />}
    </section>
  );
};

export default Detail;

import { useEffect, useState } from 'react';

import Card from '../../components/Card';
import DetailedFilter from './components/DetailedFilter/DetailedFilter';

import { NotiType } from 'src/types/cardType';

import css from './List.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getAxios } from '@_lib/axios';

const List = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [announcements, setAnnouncements] = useState<[]>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    const url = '/notices';
    getAxios(`${url}${location.search}`).then(res =>
      setAnnouncements(res.data.items)
    );
  }, [location.search]);

  const handleFilterBtn = () => {
    setIsFiltered(prev => !prev);
  };

  if (!announcements) return;

  return (
    <article className={css.container}>
      <section className={css.customNotiBg}>
        <div className={css.listBox}>
          <h2 className={css.listTitle}>맞춤 공고</h2>
          <div className={css.cardWrap}>
            {announcements?.map((el, idx: number) => {
              return <Card key={idx} announcement={el} />;
            })}
          </div>
        </div>
      </section>
      <section className={css.listBox}>
        <div className={css.headerBox}>
          <h2 className={css.listTitle}>전체 공고</h2>
          <div className={css.filterBox}>
            <div className={`${css.btn} ${css.sort}`}>마감임박순 ▼</div>
            <div
              className={`${css.btn} ${css.filter}`}
              onClick={handleFilterBtn}
            >
              상세 필터
              {isFiltered && <DetailedFilter setIsFiltered={setIsFiltered} />}
            </div>
          </div>
        </div>
        <div className={css.cardWrap}>
          {announcements?.map((el, idx: number) => {
            return <Card key={idx} announcement={el} />;
          })}
        </div>
        <div className={css.paginationBox}>pagination</div>
      </section>
    </article>
  );
};

export default List;

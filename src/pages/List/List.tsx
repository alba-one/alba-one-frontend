import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAxios } from '@_lib/axios';

import Card from '../../components/Card';
import DetailedFilter from './components/DetailedFilter';

import css from './List.module.scss';

const List = () => {
  const location = useLocation();

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
              {isFiltered && (
                <DetailedFilter
                  location={location.search}
                  setIsFiltered={setIsFiltered}
                />
              )}
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

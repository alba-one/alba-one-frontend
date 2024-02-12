import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAxios } from '@_lib/axios';

import Card from '../../components/Card';
import DetailedFilter from './components/DetailedFilter';
import Pagination from '@_components/Pagination/Pagination';

import css from './List.module.scss';

const List = () => {
  const location = useLocation();
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(6);
  const limitNum = 6;

  const [announcements, setAnnouncements] = useState<[]>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  // const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    const url = '/notices';
    getAxios(`${url}?offset=${offset}&limit=${limit}${location.search}`).then(
      res => (setAnnouncements(res.data.items), setTotalCount(res.data.count))
    );
  }, [location.search, limit, offset]);

  const handleFilterBtn = () => {
    setIsFiltered(prev => !prev);
  };

  // ** page num array

  // ** announcement for each page
  // 1. offset = idx of 'the start'  / former last idx + 1
  // 2. limit = idx of 'the last'
  // 3. next page's offset = 'the last' idx + 1

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
                  isFiltered={isFiltered}
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

        <Pagination
          totalCount={totalCount}
          limit={limit}
          setLimit={setLimit}
          offset={offset}
          setOffset={setOffset}
          limitNum={limitNum}
        />
      </section>
    </article>
  );
};

export default List;

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAxios } from '@_lib/axios';

import Card from '../../components/Card';
import DetailedFilter from './components/DetailedFilter';
import Pagination from '@_components/Pagination/Pagination';

import css from './List.module.scss';
import { NotiType, ShopType } from '@_types/cardType';

const List = () => {
  const location = useLocation();
  const [offset, setOffset] = useState<number>(0);
  const limit = 6;

  const [announcements, setAnnouncements] = useState<[]>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const url = '/notices';
    getAxios(`${url}?offset=${offset}&limit=${limit}${location.search}`).then(
      res => (setAnnouncements(res.data.items), setTotalCount(res.data.count))
    );
  }, [location.search, offset]);

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
              const shopInfo = el.item.shop.item;
              return <Card key={idx} announcement={el} shopInfo={shopInfo} />;
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
            const shopInfo = el.item.shop.item;
            return <Card key={idx} announcement={el} shopInfo={shopInfo} />;
          })}
        </div>

        <Pagination
          totalCount={totalCount}
          limit={limit}
          offset={offset}
          setOffset={setOffset}
        />
      </section>
    </article>
  );
};

export default List;

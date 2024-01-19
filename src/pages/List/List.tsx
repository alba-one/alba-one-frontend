import Icon from '@_icon/Icon';
import css from './List.module.scss';

const List = () => {
  return (
    <article className={css.container}>
      <section className={css.customNotiBg}>
        <div className={css.listBox}>
          <h2 className={css.listTitle}>맞춤 공고</h2>
          <div className={css.cardWrap}>
            <div className={css.card}>
              <div className={css.cardImageBox}>
                <img
                  className={css.cardImage}
                  src="https://velog.velcdn.com/images%2Fjyyoun1022%2Fpost%2F1c640590-42d9-4be7-94fa-e6f5e30b51a0%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-24%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.52.59.png"
                  alt=""
                />
              </div>
              <div className={css.infoBox}>
                <h3 className={css.storeTitle}>지연이네 밥집</h3>
                <div className={css.descBox}>
                  <Icon title="clock" />
                  <span className={css.desc}>
                    2023-02-31 15:00~18:00 (3시간)
                  </span>
                </div>
                <div className={css.descBox}>
                  <Icon title="location" />
                  <span className={css.desc}>서울시 강남구</span>
                </div>
              </div>
              <div className={css.payBox}>
                <span className={css.pay}>15,000원</span>
                <label className={css.comparePay}>
                  기존 시급보다 10% <Icon title="arrowUp" />
                </label>
              </div>
            </div>
            <div className={css.card}>card</div>
            <div className={css.card}>card</div>
          </div>
        </div>
      </section>
      <section className={css.listBox}>
        <div className={css.headerBox}>
          <h2 className={css.listTitle}>전체 공고</h2>
          <div className={css.filterBox}>
            <div className={`${css.btn} ${css.sort}`}>마감임박순 ▼</div>
            <div className={`${css.btn} ${css.filter}`}>상세 필터</div>
          </div>
        </div>
        <div className={css.cardWrap}>
          <div className={css.card}>
            <div className={css.cardImageBox}>
              <img
                className={css.cardImage}
                src="https://velog.velcdn.com/images%2Fjyyoun1022%2Fpost%2F1c640590-42d9-4be7-94fa-e6f5e30b51a0%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-01-24%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.52.59.png"
                alt=""
              />
            </div>
            <div className={css.infoBox}>
              <h3 className={css.storeTitle}>지연이네 밥집</h3>
              <div className={css.descBox}>
                <Icon title="clock" />
                <span className={css.desc}>2023-02-31 15:00~18:00 (3시간)</span>
              </div>
              <div className={css.descBox}>
                <Icon title="location" />
                <span className={css.desc}>서울시 강남구</span>
              </div>
            </div>
            <div className={css.payBox}>
              <span className={css.pay}>15,000원</span>
              <label className={css.comparePay}>
                기존 시급보다 10% <Icon title="arrowUp" />
              </label>
            </div>
          </div>
          <div className={css.card}>card</div>
          <div className={css.card}>card</div>
          <div className={css.card}>card</div>
          <div className={css.card}>card</div>
          <div className={css.card}>card</div>
        </div>
        <div className={css.paginationBox}>pagination</div>
      </section>
    </article>
  );
};

export default List;

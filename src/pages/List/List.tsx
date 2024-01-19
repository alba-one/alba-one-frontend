import Card from '@_icon/Card';
import css from './List.module.scss';

const List = () => {
  return (
    <article className={css.container}>
      <section className={css.customNotiBg}>
        <div className={css.listBox}>
          <h2 className={css.listTitle}>맞춤 공고</h2>
          <div className={css.cardWrap}>
            <Card />
            <Card />
            <Card />
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className={css.paginationBox}>pagination</div>
      </section>
    </article>
  );
};

export default List;

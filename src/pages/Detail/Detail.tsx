import css from './Detail.module.scss';
import Card from './Components/Card/Card.tsx';

const Detail = () => {
  return (
    <section className={css.container}>
      <div className={css.topOfDetail}>
        <div className={css.title}>
          <div className={css.category}>카페</div>
          <div className={css.storeName}>지연이 카페</div>
        </div>
        <Card />
        <div className={css.storeDescription}></div>
      </div>
    </section>
  );
};

export default Detail;

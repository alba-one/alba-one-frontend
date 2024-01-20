import Card from '@_components/Card/Card.tsx';

import css from './AnnouncedBox.module.scss';

const AnnouncedBox = () => {
  return (
    <section className={css.announcedBox}>
      <div className={css.announced}>
        <div className={css.grid}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
};

export default AnnouncedBox;

import LargeCard from '../../../../../components/LargeCard/LargeCard.tsx';

import css from './ExistingStore.module.scss';

const ExistingStore = () => {
  return (
    <section className={css.existingStore}>
      <LargeCard type="store" />

      <div className={css.greyBgc}>
        <div className={css.title}>등록한 공고</div>
      </div>
    </section>
  );
};

export default ExistingStore;

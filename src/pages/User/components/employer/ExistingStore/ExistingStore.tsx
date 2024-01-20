import LargeCard from '../../../../../components/LargeCard/LargeCard.tsx';
import AnnouncedBox from './components/AnnouncedBox/AnnouncedBox.tsx';
import None from '../../employee/ExistingProfile/Components/None/None.tsx';

import css from './ExistingStore.module.scss';

const ExistingStore = () => {
  let isAnnounced = true;
  return (
    <section className={css.existingStore}>
      <div className={css.container}>
        <LargeCard type="employer" />
      </div>
      <div className={css.lowerBox}>
        <div className={css.lowerContainer}>
          <div className={css.lowerTitle}>내가 등록한 공고</div>

          {isAnnounced ? <AnnouncedBox /> : <None />}
        </div>
      </div>
    </section>
  );
};

export default ExistingStore;

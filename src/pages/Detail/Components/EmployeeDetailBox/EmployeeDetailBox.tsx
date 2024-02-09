import Card from '@_components/Card';

import css from './EmployeeDetailBox.module.scss';

const EmployeeDetailBox = () => {
  return (
    <div className={css.showRecent}>
      <div className={css.recentTitle}>최근에 본 공고</div>
      <div className={css.recentGrid}>
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
      </div>
    </div>
  );
};

export default EmployeeDetailBox;

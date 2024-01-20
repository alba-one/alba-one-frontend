import css from './ApplyInfo.module.scss';

const ApplyInfo = () => {
  return (
    <div className={css.applyInfo}>
      <div className={css.columnItems}>name</div>
      <div className={css.columnItems}>workhour</div>
      <div className={css.columnItems}>HourlyPay</div>
      <div className={css.columnItems}>
        <span className={css.badge}>status</span>
      </div>
    </div>
  );
};

export default ApplyInfo;

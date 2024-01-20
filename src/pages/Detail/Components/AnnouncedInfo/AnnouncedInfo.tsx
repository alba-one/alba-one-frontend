import css from './AnnouncedInfo.module.scss';

const AnnouncedInfo = () => {
  return (
    <div className={css.announcedInfo}>
      <div className={css.columnItems}>name</div>
      <div className={css.columnItems}>description</div>
      <div className={css.columnItems}>contact</div>
      <div className={css.columnItems}>
        <span className={css.badge}>status</span>
      </div>
    </div>
  );
};

export default AnnouncedInfo;

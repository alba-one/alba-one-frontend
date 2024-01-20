import Icon from '@_components/Icon';
import AnnouncedInfo from '../AnnouncedInfo/AnnouncedInfo.tsx';

import css from './EmployerDetailBox.module.scss';

const EmployerDetailBox = () => {
  let total = 30;
  let limit = 5;

  let pageNum = total / limit;

  let pageNumArr = new Array(pageNum).fill(1);

  return (
    <section className={css.annouceBox}>
      <div className={css.titleColumnBox}>
        <div className={css.titleColumn}>신청자</div>
        <div className={css.titleColumn}>소개</div>
        <div className={css.titleColumn}>전화번호</div>
        <div className={css.titleColumn}>상태</div>
      </div>

      <AnnouncedInfo />
      <AnnouncedInfo />
      <AnnouncedInfo />
      <AnnouncedInfo />
      <AnnouncedInfo />
      <AnnouncedInfo />

      <div className={`${css.announceInfo} ${css.pagination}`}>
        <div className={css.pageNum}>
          <Icon title="chevronLeft" />
        </div>
        {pageNumArr.map((el, idx) => {
          return (
            <div key={idx} className={css.pageNum}>
              {el + idx}
            </div>
          );
        })}

        <div className={css.pageNum}>
          <Icon title="chevronRight" />
        </div>
      </div>
    </section>
  );
};

export default EmployerDetailBox;

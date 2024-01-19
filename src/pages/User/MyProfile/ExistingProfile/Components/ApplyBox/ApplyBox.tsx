import ApplyInfo from './Components/ApplyInfo/ApplyInfo';

import css from './ApplyBox.module.scss';
import Icon from '@_icon/Icon';

const ApplyBox = () => {
  let total = 30;
  let limit = 5;

  let pageNum = total / limit;

  let pageNumArr = new Array(pageNum).fill(1);

  return (
    <section className={css.applyBox}>
      <div className={css.titleColumnBox}>
        <div className={css.titleColumn}>가게</div>
        <div className={css.titleColumn}>일자</div>
        <div className={css.titleColumn}>시급</div>
        <div className={css.titleColumn}>상태</div>
      </div>

      <ApplyInfo />
      <ApplyInfo />
      <ApplyInfo />
      <ApplyInfo />
      <ApplyInfo />

      <div className={`${css.applyInfo} ${css.pagination}`}>
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

export default ApplyBox;

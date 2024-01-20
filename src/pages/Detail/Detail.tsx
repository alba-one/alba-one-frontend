import LargeCard from '../../components/LargeCard/LargeCard';
import EmployerDetailBox from './Components/EmployerDetailBox/EmployerDetailBox.tsx';
import EmployeeDetailBox from './Components/EmployeeDetailBox/EmployeeDetailBox.tsx';

import css from './Detail.module.scss';

const Detail = () => {
  const isEmployee = false;
  return (
    <section className={css.container}>
      <div className={css.topOfDetail}>
        <div className={css.title}>
          <div className={css.category}>카페</div>
          <div className={css.storeName}>지연이 카페</div>
        </div>
        <LargeCard type="employee" />
        <div className={css.storeDescription}>
          <div className={css.descriptionTitle}>공고 설명</div>
          <div className={css.descriptionWords}>
            이벤트를 진행하게 되어 이벤트 시간동안 일손이 부족해요! <br />
            급하게 구하게되어 시급도 높였습니다.
          </div>
        </div>
      </div>

      {isEmployee ? <EmployeeDetailBox /> : <EmployerDetailBox />}
    </section>
  );
};

export default Detail;

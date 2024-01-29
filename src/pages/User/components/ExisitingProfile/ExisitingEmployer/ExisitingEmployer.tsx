import Icon from '@_components/Icon';
import { EmployerType } from '@_types/userType';

import css from './ExisitingEmployer.module.scss';

const ExisitingEmployer = ({ userData }: EmployerType) => {
  const { imageUrl, name, address1, description } = userData;

  return (
    <div className={css.container}>
      <img className={css.storeImage} src={imageUrl} alt="store image" />
      <div className={css.infoWrap}>
        <div className={css.infoBox}>
          <h3 className={css.category}>식당</h3>
          <h2 className={css.title}>{name}</h2>
          <div className={css.locationBox}>
            <Icon title="location" />
            <span>{address1}</span>
          </div>
          <p className={css.comment}>{description}</p>
        </div>
        <div className={css.buttonBox}>
          <button className={`${css.buttonLayout} ${css.edit}`}>
            편집하기
          </button>
          <button className={`${css.buttonLayout} ${css.regist}`}>
            공고 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExisitingEmployer;

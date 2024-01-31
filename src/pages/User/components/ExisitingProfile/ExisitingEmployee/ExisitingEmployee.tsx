import { Dispatch } from 'react';
import { EmployeeType } from '@_types/userType';
import css from './ExisitingEmployee.module.scss';
import Icon from '@_components/Icon';
import { changePhoneNumFormat } from '@_utils/formatPhoneNum';

interface Props {
  userData: EmployeeType;
  setIsOpenMakeProfile: Dispatch<React.SetStateAction<boolean>>;
}

const ExisitingEmployee = ({ userData, setIsOpenMakeProfile }: Props) => {
  const { name, phone, address, bio } = userData;

  return (
    <div className={css.container}>
      <div className={css.infoWrap}>
        <div className={css.infoBox}>
          <h3 className={css.category}>이름</h3>
          <h2 className={css.title}>{name}</h2>
          <div className={css.locationBox}>
            <Icon title="phone" />
            <span>{changePhoneNumFormat(phone)}</span>
          </div>
          <div className={css.locationBox}>
            <Icon title="location" />
            <span>{address}</span>
          </div>
          <p className={css.comment}>{bio}</p>
        </div>
        <button
          className={css.buttonLayout}
          onClick={() => setIsOpenMakeProfile(true)}
        >
          편집하기
        </button>
      </div>
    </div>
  );
};

export default ExisitingEmployee;

import Icon from '@_components/Icon';
import None from './Components/None/None.tsx';
import ApplyBox from './Components/ApplyBox/ApplyBox.tsx';
import { UserInfo } from '@_types/userType';

import css from './ExistingProfile.module.scss';
import { useGetUserType } from '@_hooks/useGetUserType.ts';

interface Props {
  userInfo: UserInfo;
}

const ExistingProfile = ({ userInfo }: Props) => {
  const { isEmployee } = useGetUserType();

  let phoneNum = '';

  const makePhoneNumForm = () => {
    if (userInfo.phone) {
      phoneNum = `${userInfo.phone.slice(0, 3)}-${userInfo.phone.slice(
        3,
        7
      )}-${userInfo.phone.slice(-4)}`;
    }
  };

  makePhoneNumForm();

  const goToEdit = () => {};

  return (
    <section className={css.existingProfile}>
      <div className={css.container}>
        <div className={css.title}>{isEmployee ? '내 프로필' : '내 가게'}</div>
        <div className={css.userCard}>
          <div className={css.userInfo}>
            <div className={css.user}>
              <div className={css.subTitle}>{isEmployee ? '이름' : '식당'}</div>
              <div className={css.userName}>{userInfo.name}</div>
            </div>
            {isEmployee && (
              <div className={css.detailInfo}>
                <Icon title="phone" />
                <span className={css.number}>{phoneNum}</span>
              </div>
            )}
            <div className={css.detailInfo}>
              <Icon title="location" />
              <span className={css.location}>
                {isEmployee && '선호지역: '}
                {userInfo.address}
              </span>
            </div>
            <div className={css.comment}>{userInfo.bio}</div>
          </div>
          <button className={css.editBtn}>편집하기</button>
        </div>
      </div>
      <div className={css.lowerBox}>
        <div className={css.lowerContainer}>
          <div className={css.lowerTitle}>신청 내역</div>
          {userInfo.shop === null ? <None /> : <ApplyBox />}
        </div>
      </div>
    </section>
  );
};

export default ExistingProfile;

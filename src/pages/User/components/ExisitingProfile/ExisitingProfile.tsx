import { useGetUserType } from '@_hooks/useGetUserType';
import ExisitingEmployee from './ExisitingEmployee';
import ExisitingEmployer from './ExisitingEmployer';
import ApplyList from './ApplyList';

import css from './ExisitingProfile.module.scss';

const ExisitingProfile = ({ userInfo }: any) => {
  const { isEmployee } = useGetUserType();
  const userData = userInfo.name ? userInfo : userInfo.shop.item;

  return (
    <section className={css.container}>
      <article className={isEmployee ? css.employeeBox : css.employerBox}>
        <h2 className={css.title}>{isEmployee ? '내 프로필' : '내 가게'}</h2>
        <div className={css.cardBox}>
          {isEmployee ? (
            <ExisitingEmployee />
          ) : (
            <ExisitingEmployer userData={userData} />
          )}
        </div>
      </article>
      <article className={css.listBackround}>
        <div className={css.listBox}>
          <h2 className={css.title}>
            {isEmployee ? '신청 내역' : '등록한 공고'}
          </h2>
          <ApplyList userId={userData.id} />
        </div>
      </article>
    </section>
  );
};

export default ExisitingProfile;

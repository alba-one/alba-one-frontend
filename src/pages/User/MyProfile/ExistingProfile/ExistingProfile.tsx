import Icon from '@_icon/Icon';
import css from './ExistingProfile.module.scss';
import None from './Components/None/None.tsx';
import ApplyBox from './Components/ApplyBox/ApplyBox.tsx';

const ExistingProfile = () => {
  const isApply = false;
  return (
    <section className={css.existingProfile}>
      <div className={css.container}>
        <div className={css.title}>내 프로필</div>
        <div className={css.userCard}>
          <div className={css.userInfo}>
            <div className={css.user}>
              <div className={css.subTitle}>이름</div>
              <div className={css.userName}>김명성</div>
            </div>
            <div className={css.detailInfo}>
              <Icon title="phone" />
              <span className={css.number}>010-1234-5678</span>
            </div>
            <div className={css.detailInfo}>
              <Icon title="location" />
              <span className={css.location}>선호지역: 서울시 중랑구</span>
            </div>
            <div className={css.comment}>열심히 하겠습니다 !</div>
          </div>
          <button className={css.editBtn}>편집하기</button>
        </div>
      </div>
      <div className={css.lowerBox}>
        <div className={css.lowerContainer}>
          <div className={css.lowerTitle}>신청 내역</div>
          {isApply ? <None /> : <ApplyBox />}
        </div>
      </div>
    </section>
  );
};

export default ExistingProfile;

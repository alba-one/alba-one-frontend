import Icon from '@_components/Icon';
import Dropdown from '@_components/Dropdown/Dropdown';

import css from './MakeProfile.module.scss';

interface Props {
  setIsOpenMakeProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const MakeProfile = ({ setIsOpenMakeProfile }: Props) => {
  return (
    <section className={css.makeProfile}>
      <div className={css.title}>
        내 프로필{' '}
        <div onClick={() => setIsOpenMakeProfile(prev => !prev)}>
          <Icon title="close" />
        </div>
      </div>
      <div className={css.inputs}>
        <div className={css.userName}>
          <div className={css.subTitle}>이름*</div>
          <input className={css.miniInput} placeholder="입력해주세요." />
        </div>

        <div />

        <div className={css.userContact}>
          <div className={css.subTitle}>연락처*</div>
          <input className={css.miniInput} placeholder="입력해주세요." />
        </div>

        <div />

        <div className={css.userLocation}>
          <div className={css.subTitle}>선호 지역*</div>
          <div className={css.selectBox}>
            <Dropdown />
          </div>
        </div>

        <div className={css.lowerLine}>
          <div className={css.subTitle}>소개</div>
          <textarea
            className={css.comments}
            placeholder="입력해주세요."
          ></textarea>
        </div>
      </div>

      <button className={css.submitBtn}>등록하기</button>
    </section>
  );
};

export default MakeProfile;

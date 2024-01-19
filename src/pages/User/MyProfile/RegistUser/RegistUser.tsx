import { useGetUserType } from '@_hooks/useGetUserType';
import css from './RegistUser.module.scss';

interface Props {
  setIsOpenMakeProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const None = ({ setIsOpenMakeProfile }: Props) => {
  const { isEmployee } = useGetUserType();

  return (
    <section className={css.none}>
      <div className={css.title}>{isEmployee ? '내 프로필' : '내 가게'}</div>
      <div className={css.noCard}>
        <div className={css.comment}>
          {isEmployee
            ? '내 프로필을 등록하고 원하는 가게에 지원해 보세요'
            : '내 가게를 소개하고 공고도 등록해 보세요'}
        </div>
        <button
          className={css.makeProfileBtn}
          onClick={() => setIsOpenMakeProfile(prev => !prev)}
        >
          {isEmployee ? '내 프로필 등록하기' : '가게 등록하기'}
        </button>
      </div>
    </section>
  );
};

export default None;

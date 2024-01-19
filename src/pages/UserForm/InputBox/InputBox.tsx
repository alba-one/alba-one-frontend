import { UserInputType, ValidList, ErrorMessageList } from '../UserType';
import css from './InputBox.module.scss';

interface Props extends UserInputType {
  value: string;
  validList: ValidList;
  handleUserInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  title,
  type,
  name,
  placeholder,
  value,
  validList,
  handleUserInfo,
}: Props) => {
  const errorMessageList: ErrorMessageList = {
    email: '올바른 이메일 주소가 아닙니다.',
    password: '올바른 비밀번호 형식이 아닙니다',
    check: '비밀번호가 일치하지 않습니다',
  };

  return (
    <div className={css.inputBox}>
      <label className={css.inputTitle}>{title}</label>
      <input
        className={css.input}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleUserInfo}
      />
      <div className={css.errorBox}>
        {!validList[name] && value !== '' && (
          <span className={css.errorMsg}>{errorMessageList[name]}</span>
        )}
      </div>
    </div>
  );
};

export default InputBox;

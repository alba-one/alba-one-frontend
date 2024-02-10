import { UserInputType } from '@_types/userFormTypes';
import css from './InputBox.module.scss';

interface Props extends UserInputType {
  value: string;
  handleUserInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  title,
  type,
  name,
  placeholder,
  value,
  handleUserInfo,
}: Props) => {
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
    </div>
  );
};

export default InputBox;

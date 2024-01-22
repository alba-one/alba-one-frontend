import Dropdown from '@_components/Dropdown';
import Icon from '@_components/Icon';
import css from './InputBox.module.scss';

interface Props {
  title: string;
  name: string;
  value: string | number;
  placeholder?: string;
  required?: boolean;
  type: string;
  handleInput?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDropDown?: (type: string, value: string) => void;
}

const InputBox = ({
  title,
  name,
  value,
  placeholder,
  required,
  type,
  handleInput = () => {},
  handleDropDown = () => {},
}: Props) => {
  return (
    <div className={css.inputBox}>
      <div className={css.inputInfo}>{title}</div>
      {type === 'text' && (
        <input
          className={css.input}
          type={name === 'phone' ? 'number' : 'text'}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={handleInput}
        />
      )}
      {type === 'select' && (
        <div className={css.selectBox}>
          <Dropdown
            type={name}
            selectedValue={value}
            setSelectedValue={handleDropDown}
          />
        </div>
      )}
      {type === 'area' && (
        <textarea
          className={css.comments}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleInput}
        />
      )}
      {type === 'pay' && (
        <div className={css.payBox}>
          <input
            className={css.payInput}
            type="number"
            name={name}
            value={value}
            placeholder={placeholder}
            required={required}
            onChange={handleInput}
          />
          <span>원</span>
        </div>
      )}
      {type === 'image' && (
        <>
          <input
            className={css.imageInput}
            type="file"
            id="image"
            onChange={handleInput}
          />
          <label className={css.imageLabel} htmlFor="image">
            {value ? (
              <img
                src={String(value)}
                alt="미리보기 이미지"
                className={css.preview}
              />
            ) : (
              <div>
                <Icon title="camera" />
                <div className={css.message}>이미지 추가하기</div>
              </div>
            )}
          </label>
        </>
      )}
    </div>
  );
};

export default InputBox;

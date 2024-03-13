import css from './Button.module.scss';

interface Props {
  title: string;
  disabled: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ title, disabled, handleClick }: Props) => {
  return (
    <button
      className={`${css.cta} ${disabled ? css.disabled : ''}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;

import { useState } from 'react';
import css from './Dropdown.module.scss';

const Dropdown = () => {
  const arr = [1, 2, 3];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={css.dropdown} onClick={openDropdown}>
      <div className={css.closed}>
        <span>선택해주세요</span> <span>▼</span>
      </div>
      <div className={css.options}>
        {isOpen
          ? arr.map((el, idx) => {
              return (
                <div key={idx} className={css.option}>
                  {el}
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Dropdown;

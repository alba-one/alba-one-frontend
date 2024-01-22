import { useState } from 'react';
import { categoryList, addressList } from '@_constants/dropdownList';

import css from './Dropdown.module.scss';

interface Props {
  type: string;
  selectedValue: string | number;
  setSelectedValue: (type: string, value: string) => void;
}

interface List {
  [key: string]: string[];
}

const Dropdown = ({ type, selectedValue, setSelectedValue }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownList: List = {
    category: categoryList,
    address: addressList,
  };

  const openDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleUserValue = (
    e: React.MouseEvent<HTMLDivElement>,
    type: string,
    value: string
  ) => {
    e.stopPropagation();

    setSelectedValue(type, value);
    setIsOpen(prev => !prev);
  };

  return (
    <div className={css.dropdown} onClick={openDropdown}>
      <div className={css.selectValue}>
        <span>{selectedValue ? selectedValue : '선택해주세요'}</span>
        <span>▼</span>
      </div>

      {isOpen && (
        <div className={css.options}>
          {dropdownList[type]?.map((el, idx) => {
            return (
              <div
                key={idx}
                className={css.option}
                onClick={e => {
                  handleUserValue(e, type, el);
                }}
              >
                {el}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

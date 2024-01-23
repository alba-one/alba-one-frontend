import { useState } from 'react';
import { categoryList, addressList } from '@_constants/dropdownList';

import css from './Dropdown.module.scss';

interface Props {
  type: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<UserInfo>>;
}

interface UserInfo {
  name: string;
  phone: string;
  address: string;
  bio: string;
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
    value: string,
    type: string
  ) => {
    e.stopPropagation();

    // setSelectedValue(prev => ({ ...prev, address: value }));

    if (type === 'category') {
      setSelectedValue(prev => ({
        ...prev,
        category: value,
      }));
    }
    if (type === 'address') {
      setSelectedValue(prev => ({
        ...prev,
        address: value,
        address1: value,
      }));
    }
    setIsOpen(prev => !prev);
  };

  return (
    <div className={css.dropdown} onClick={openDropdown}>
      <div className={css.closed}>
        <div className={css.selectValue}>
          <span>{selectedValue ? selectedValue : '선택해주세요'}</span>
          <span>▼</span>
        </div>
      </div>
      <div className={`${css.options} ${isOpen ? '' : css.open}`}>
        {isOpen
          ? dropdownList[type]?.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className={css.option}
                  onClick={e => {
                    handleUserValue(e, el, type);
                  }}
                >
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

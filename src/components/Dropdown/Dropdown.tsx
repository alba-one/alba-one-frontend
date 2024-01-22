import { useEffect, useState } from 'react';
import css from './Dropdown.module.scss';

interface Props {
  type: string;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}
const Dropdown = ({ type, selectedValue, setSelectedValue }: Props) => {
  const addressArr = [
    '서울시 종로구',
    '서울시 중구',
    '서울시 용산구',
    '서울시 성동구',
    '서울시 광진구',
    '서울시 동대문구',
    '서울시 중랑구',
    '서울시 성북구',
    '서울시 강북구',
    '서울시 도봉구',
    '서울시 노원구',
    '서울시 은평구',
    '서울시 서대문구',
    '서울시 마포구',
    '서울시 양천구',
    '서울시 강서구',
    '서울시 구로구',
    '서울시 금천구',
    '서울시 영등포구',
    '서울시 동작구',
    '서울시 관악구',
    '서울시 서초구',
    '서울시 강남구',
    '서울시 송파구',
    '서울시 강동구',
  ];

  const categoryArr = [
    '한식',
    '중식',
    '일식',
    '양식',
    '분식',
    '카페',
    '편의점',
    '기타',
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownType, setDropdownType] = useState<string[]>([]);

  useEffect(() => {
    if (type === 'address') {
      setDropdownType(addressArr);
    }
    if (type === 'category') {
      setDropdownType(categoryArr);
    }
  }, []);

  const openDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleUserValue = (
    value: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const selectedOption = value.currentTarget.textContent;

    setSelectedValue(selectedOption);
    value.stopPropagation();

    setIsOpen(prev => !prev);
  };

  return (
    <div className={css.dropdown} onClick={openDropdown}>
      <div className={css.closed}>
        {selectedValue ? (
          <div className={css.selectValue}>
            <span>{selectedValue}</span> <span>▼</span>
          </div>
        ) : (
          <div className={css.selectValue}>
            <span>선택해주세요</span> <span>▼</span>
          </div>
        )}
      </div>
      <div className={`${css.options} ${isOpen === false ? css.open : ''}`}>
        {isOpen
          ? dropdownType.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className={css.option}
                  onClick={el => {
                    handleUserValue(el);
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

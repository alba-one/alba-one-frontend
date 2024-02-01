import Icon from '@_components/Icon';
import { addressList } from '@_constants/dropdownList';

import css from './DetailedFilter.module.scss';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetailedFilter = ({ setIsFiltered }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<{
    startsAtGte: string | undefined;
    hourlyPayGte: string | undefined;
  }>({ startsAtGte: undefined, hourlyPayGte: undefined });

  const closeFilter = () => {
    setIsFiltered(prev => !prev);
  };

  const handleSelectedOptions = (el: string) => {
    if (!selectedOptions.includes(el)) {
      setSelectedOptions(prev => [...prev, el]);
    }
  };

  const handleRemoveOptions = (el: string) => {
    setSelectedOptions(prev => prev.filter(item => item !== el));
  };

  const formatDate = (e: string) => {
    if (e.length < 8) {
      setUserInput(prev => ({ ...prev, startsAtGte: undefined }));
    } else {
      const year = e.substring(0, 4);
      const month = e.substring(4, 6);
      const date = e.substring(6, 8);

      const time = 'T00:00:00Z';

      const userDate = `${year}-${month}-${date}${time}`;

      setUserInput(prev => ({ ...prev, startsAtGte: userDate }));
    }
  };

  const getRightAnnouncement = () => {
    const addressString = selectedOptions.join(',');

    if (addressString) {
      if (searchParams.has('address')) {
        searchParams.delete('address');
      }
      searchParams.append('address', addressString);
    }
    if (!addressString) {
      searchParams.delete('address');
    }
    if (userInput.startsAtGte) {
      if (searchParams.has('startsAtGte')) {
        searchParams.delete('startsAtGte');
      }
      searchParams.append('startsAtGte', userInput.startsAtGte);
    }
    if (!userInput.startsAtGte) {
      searchParams.delete('startsAtGte');
    }
    if (userInput.hourlyPayGte) {
      if (searchParams.has('hourlyPayGte')) {
        searchParams.delete('hourlyPayGte');
      }
      searchParams.append('hourlyPayGte', userInput.hourlyPayGte);
    }
    if (!userInput.hourlyPayGte || userInput.hourlyPayGte === '0') {
      searchParams.delete('hourlyPayGte');
    }

    setSearchParams(searchParams);
  };

  const removeAllCondition = () => {
    searchParams.delete('address');
    searchParams.delete('startsAtGte');
    searchParams.delete('hourlyPayGte');
    setSearchParams(searchParams);
  };

  return (
    <section className={css.container} onClick={e => e.stopPropagation()}>
      <div className={css.title}>
        <span>상세 필터</span>
        <span onClick={closeFilter}>
          <Icon title="close" />
        </span>
      </div>

      <div className={css.selectBox}>
        <div className={css.locationBox}>
          <div className={css.subTitle}>위치</div>
          <div className={css.locationOptions}>
            {addressList.map((el, idx) => {
              return (
                <div
                  key={idx}
                  className={css.option}
                  onClick={() => handleSelectedOptions(el)}
                >
                  {el}
                </div>
              );
            })}
          </div>
          <div className={css.selectedBox}>
            {selectedOptions.map((el, idx) => {
              return (
                <div key={idx} className={css.selectedOption}>
                  <span>{el}</span>
                  <span
                    className={css.closeBtn}
                    onClick={() => {
                      handleRemoveOptions(el);
                    }}
                  >
                    <Icon title="redClose" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={css.divider} />

        <div className={css.dateBox}>
          <div className={css.subTitle}>시작일</div>
          <input
            className={css.dateInput}
            placeholder="연월일 순서로 8자리의 숫자를 입력"
            type="number"
            onBlur={e => {
              const { value } = e.target;
              formatDate(value);
            }}
          />
        </div>

        <div className={css.divider} />

        <div className={css.wageBox}>
          <div className={css.subTitle}>금액</div>
          <input
            className={css.wageInput}
            placeholder="입력"
            type="number"
            onBlur={e => {
              const { value } = e.target;
              setUserInput(prev => ({
                ...prev,
                hourlyPayGte: value || '0',
              }));
            }}
          />
          <span className={css.wageComment}>이상부터</span>
        </div>
      </div>

      <div className={css.btnBox}>
        <button className={css.resetBtn} onClick={removeAllCondition}>
          초기화
        </button>
        <button className={css.applyBtn} onClick={getRightAnnouncement}>
          적용하기
        </button>
      </div>
    </section>
  );
};

export default DetailedFilter;

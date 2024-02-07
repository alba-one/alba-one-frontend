import Icon from '@_components/Icon';
import { addressList } from '@_constants/dropdownList';

import css from './DetailedFilter.module.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Props {
  isFiltered: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
}

const DetailedFilter = ({ isFiltered, setIsFiltered, location }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateValue, setDateValue] = useState<string>('');
  const [userDate, setUserDate] = useState<string>('');

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const [userInput, setUserInput] = useState<{
    startsAtGte: string | undefined;
    hourlyPayGte: string | undefined;
  }>({ startsAtGte: undefined, hourlyPayGte: undefined });

<<<<<<< HEAD
  console.log(selectedOptions);

=======
  const [defaultDate, setDefaultDate] = useState<string>('');
>>>>>>> 1273c76 (🍳 FIX: startsAt 반영 에러 수정)
  const closeFilter = () => {
    setIsFiltered(prev => !prev);
  };

  console.log('userinput: ', userInput);
  const handleSelectedOptions = (el: string) => {
    if (!selectedOptions.includes(el) && selectedOptions.length < 4) {
      setSelectedOptions(prev => [...prev, el]);
    }
  };

  const handleRemoveOptions = (el: string) => {
    setSelectedOptions(prev => prev.filter(item => item !== el));
  };

  let formatted = '';
  const formatForNewDate = (dateString: string) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const date = dateString.substring(6, 8);

    formatted = `${year}-${month}-${date}`;
  };

  const formattedDate = async (d: string) => {
    try {
      formatForNewDate(d);
      const date = new Date(formatted);

      const saveDate = date.toISOString();

      setUserDate(saveDate);
    } catch (error) {
      console.error('error: ', error);
    }
  };

  useEffect(() => {
    formatDate();
  }, [userDate]);

  const formatDate = () => {
    if (dateValue) {
      formattedDate(dateValue);

      setUserInput(prev => ({
        ...prev,
        startsAtGte: userDate,
      }));
    }
    if (!dateValue && userInput.startsAtGte) {
      setUserInput(prev => ({
        ...prev,
        startsAtGte: userInput.startsAtGte,
      }));
    } else return;
  };

  const getRightAnnouncement = () => {
    const addressString = selectedOptions;

    if (addressString) {
      for (let i = 0; i < selectedOptions.length; i++) {
        if (searchParams.has('address')) {
          searchParams.delete('address');
        }
      }
      for (let i = 0; i < selectedOptions.length; i++) {
        searchParams.append('address', addressString[i]);
      }
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

  const locationAddress = searchParams.getAll('address');
  const locationStartsAt = searchParams.get('startsAtGte');
  const locationHourlyPay = searchParams.get('hourlyPayGte');

  console.log('locationStartsAt: ', locationStartsAt);

  const handleFilterValue = () => {
    if (location.includes('address')) {
      setSelectedOptions(locationAddress);
    }

    if (location.includes('startsAtGte')) {
      const year = locationStartsAt?.substring(0, 4);
      const month = locationStartsAt?.substring(5, 7);
      const date = locationStartsAt?.substring(8, 10);

      const startsAtValue = `${year}${month}${date}`;

      setDefaultDate(startsAtValue);
      setUserInput(prev => ({
        ...prev,
        startsAtGte: locationStartsAt,
      }));
    }
    if (location.includes('hourlyPayGte')) {
      setUserInput(prev => ({
        ...prev,
        hourlyPayGte: locationHourlyPay + '',
      }));
    }
  };

  useEffect(() => {
    handleFilterValue();
  }, [isFiltered]);

  useEffect(() => {
    formatDate();
  }, [dateValue]);

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
            defaultValue={locationStartsAt ? defaultDate : undefined}
            onBlur={e => {
              const { value } = e.target;
              setDateValue(value);
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
            defaultValue={
              locationHourlyPay ? userInput.hourlyPayGte : undefined
            }
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
        <button
          className={css.applyBtn}
          onClick={() => {
            getRightAnnouncement();
            closeFilter();
          }}
        >
          적용하기
        </button>
      </div>
    </section>
  );
};

export default DetailedFilter;

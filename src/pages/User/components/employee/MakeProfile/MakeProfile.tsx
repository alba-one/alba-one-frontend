import Icon from '@_components/Icon';
import Dropdown from '@_components/Dropdown/Dropdown';

import css from './MakeProfile.module.scss';
import { useEffect, useState } from 'react';
import { putAxios } from '@_lib/axios';

interface Props {
  setIsOpenMakeProfile: React.Dispatch<React.SetStateAction<boolean>>;

  userInfo: {
    id: string;
    email: string;
    type: 'employer' | 'employee';
    name?: string;
    phone?: string;
    address?: string;
    bio?: string;
  };
}

const MakeProfile = ({ setIsOpenMakeProfile, userInfo }: Props) => {
  const userId = userInfo.id;

  const [selectedValue, setSelectedValue] = useState<string | null>();
  const [userInput, setUserInput] = useState<{
    name?: string;
    phone?: string;
    address?: string;
    bio?: string;
  }>();

  const putUserInput = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    const url = `/users/${userId}`;

    putAxios(url, userInput)
      .then(res => {
        console.log(res);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const saveAddress = (selectedValue: string) => {
    setUserInput(prevUserInput => ({
      ...prevUserInput,
      address: selectedValue,
    }));
  };

  useEffect(() => {
    saveAddress(selectedValue);
  }, [selectedValue]);

  console.log(userInput);

  return (
    <section className={css.makeProfile}>
      <form
        onSubmit={e => {
          e.preventDefault();
          putUserInput(userInput);
        }}
      >
        <div className={css.title}>
          내 프로필
          <div onClick={() => setIsOpenMakeProfile(prev => !prev)}>
            <Icon title="close" />
          </div>
        </div>
        <div className={css.inputs}>
          <div className={css.userName}>
            <div className={css.subTitle}>이름*</div>
            <input
              className={css.miniInput}
              placeholder="입력해주세요."
              onChange={({ target: { value } }) => {
                setUserInput(prevUserInput => ({
                  ...prevUserInput,
                  name: value,
                }));
              }}
            />
          </div>

          <div />

          <div className={css.userContact}>
            <div className={css.subTitle}>연락처*</div>
            <input
              className={css.miniInput}
              placeholder="입력해주세요."
              onChange={({ target: { value } }) => {
                setUserInput(prevUserInput => ({
                  ...prevUserInput,
                  phone: value,
                }));
              }}
            />
          </div>

          <div />

          <div className={css.userLocation}>
            <div className={css.subTitle}>선호 지역*</div>
            <div className={css.selectBox}>
              <Dropdown type="address" setSelectedValue={setSelectedValue} />
            </div>
          </div>

          <div className={css.lowerLine}>
            <div className={css.subTitle}>소개</div>
            <textarea
              className={css.comments}
              placeholder="입력해주세요."
              onChange={({ target: { value } }) => {
                setUserInput(prevUserInput => ({
                  ...prevUserInput,
                  bio: value,
                }));
              }}
            ></textarea>
          </div>
        </div>

        <button
          className={css.submitBtn}
          onClick={() => {
            putUserInput(userInput);
          }}
        >
          등록하기
        </button>
      </form>
    </section>
  );
};

export default MakeProfile;

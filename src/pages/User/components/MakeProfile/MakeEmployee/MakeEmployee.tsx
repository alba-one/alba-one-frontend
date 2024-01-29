import { useState } from 'react';
import { useGetUserType } from '@_hooks/useGetUserType';
import { putAxios } from '@_lib/axios';

import InputBox from '@_components/InputBox';

import { ModalType } from '@_types/ModalType';
import css from './MakeEmployee.module.scss';

interface Props {
  handleModal: ({ type, desc, status }: ModalType) => void;
}

const MakeEmployee = ({ handleModal }: Props) => {
  const [userInput, setUserInput] = useState({
    name: '',
    phone: '',
    address: '',
    bio: '',
  });

  const { name, phone, address, bio } = userInput;
  const { userId } = useGetUserType();

  const handleUserProfile = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };

  const selectAddress = (type: string, value: string) => {
    setUserInput(prev => ({ ...prev, [type]: value }));
  };

  const putUserInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `/users/${userId}`;

    putAxios(url, userInput)
      .then(res => {
        if (res.data.item.name) {
          handleModal({
            type: 'caution',
            desc: '프로필 등록이 완료되었습니다.',
            status: 'success',
          });
        }
      })
      .catch(error => {
        handleModal({
          type: 'caution',
          desc: error.response.data.message,
          status: 'fail',
        });
      });
  };

  return (
    <form className={css.userForm} onSubmit={putUserInput}>
      <div className={css.basicInfoBox}>
        <InputBox
          title="이름*"
          name="name"
          value={name}
          placeholder="입력해주세요"
          required={true}
          type="text"
          handleInput={handleUserProfile}
        />
        <InputBox
          title="연락처*"
          name="phone"
          value={phone}
          placeholder="하이픈 (-) 빼고 입력해주세요"
          required={true}
          type="text"
          handleInput={handleUserProfile}
        />
        <InputBox
          title="선호 지역*"
          name="address"
          value={address}
          type="select"
          handleDropDown={selectAddress}
        />
      </div>
      <InputBox
        title="소개"
        name="bio"
        value={bio}
        placeholder="입력해주세요"
        required={false}
        type="area"
        handleInput={handleUserProfile}
      />
      <button className={css.submitBtn}>등록하기</button>
    </form>
  );
};

export default MakeEmployee;

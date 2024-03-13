import React from 'react';
import { postAxios } from '@_lib/axios';
import { modalStore } from '@_lib/store';

import Button from '@_components/Button';
import InputBox from '../InputBox';

import { UserInfoType, ValidList } from '@_types/userFormTypes';
import { errorMessageList } from '@_constants/erroMessage';
import css from './Signin.module.scss';

interface Props {
  userInfo: UserInfoType;
  isBtnValid: boolean;
  validList: ValidList;
  handleUserInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Signin = ({ userInfo, isBtnValid, validList, handleUserInfo }: Props) => {
  const { setModalContent } = modalStore();
  const { email, password } = userInfo;

  const handleSignin = (e: React.MouseEvent<HTMLButtonElement>) => {
    postAxios('/token', {
      email,
      password,
    })
      .then(res => {
        const userItem = res.data.item;
        if (userItem) {
          localStorage.setItem('token', userItem.token);
          localStorage.setItem('type', userItem.user.item.type);
          localStorage.setItem('userId', userItem.user.item.id);
          setModalContent('환영합니다!', 'success');
        }
      })
      .catch(e => {
        setModalContent(e.response.data.message, 'fail');
      });
  };

  return (
    <div className={css.inputBox}>
      <InputBox
        title="이메일"
        type="text"
        name="email"
        placeholder="이메일을 입력하세요"
        value={email}
        handleUserInfo={handleUserInfo}
      />
      <div className={css.errorBox}>
        {!validList.email && email !== '' && (
          <span className={css.errorMsg}>{errorMessageList.email}</span>
        )}
      </div>
      <InputBox
        title="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        handleUserInfo={handleUserInfo}
      />
      <div className={css.errorBox}>
        {!validList.password && password !== '' && (
          <span className={css.errorMsg}>{errorMessageList.password}</span>
        )}
      </div>
      <Button
        title="로그인 하기"
        disabled={!isBtnValid}
        handleClick={handleSignin}
      />
    </div>
  );
};

export default Signin;

import React from 'react';
import { postAxios } from '@_lib/axios';
import { modalStore } from '@_lib/store';

import Button from '@_components/Button';
import InputBox from '../InputBox';

import { UserInfoType, ValidList } from '@_types/userFormTypes';
import { errorMessageList } from '@_constants/erroMessage';
import css from './Signup.module.scss';

interface Props {
  userInfo: UserInfoType;
  isBtnValid: boolean;
  validList: ValidList;
  handleUserInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Signup = ({ userInfo, isBtnValid, validList, handleUserInfo }: Props) => {
  const { setModalContent } = modalStore();
  const { email, password, check, type } = userInfo;

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    postAxios('/users', {
      email,
      password,
      type,
    })
      .then(res => {
        if (res.data.item) {
          setModalContent('가입이 완료되었습니다!', 'success');
        }
      })
      .catch(e => {
        setModalContent(e.response.data.message, 'fail');
      });
  };

  return (
    <>
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
      <InputBox
        title="비밀번호 확인"
        type="password"
        name="check"
        placeholder="비밀번호를 한번 더 입력하세요"
        value={check}
        handleUserInfo={handleUserInfo}
      />
      <div className={css.errorBox}>
        {!validList.check && check !== '' && (
          <span className={css.errorMsg}>{errorMessageList.check}</span>
        )}
      </div>
      <div className={css.inputBox}>
        <label className={css.inputTitle}>회원 유형</label>
        <div className={css.radioBtnWrap}>
          <label
            className={`${css.radioBox} ${
              type === 'employee' ? css.activeBorder : ''
            }`}
            htmlFor="employee"
          >
            <label
              className={`${css.radio} ${
                type === 'employee' ? css.active : ''
              }`}
              htmlFor="employee"
            />
            <span>알바님</span>
          </label>
          <input
            className={css.radioInput}
            id="employee"
            name="type"
            type="radio"
            value="employee"
            checked={type === 'employee'}
            onChange={handleUserInfo}
          />
          <label
            className={`${css.radioBox} ${
              type === 'employer' ? css.activeBorder : ''
            }`}
            htmlFor="employer"
          >
            <label
              className={`${css.radio} ${
                type === 'employer' ? css.active : ''
              }`}
              htmlFor="employer"
            />
            사장님
          </label>
          <input
            className={css.radioInput}
            id="employer"
            name="type"
            type="radio"
            value="employer"
            checked={type === 'employer'}
            onChange={handleUserInfo}
          />
        </div>
      </div>
      <Button
        title="가입하기"
        disabled={!isBtnValid}
        handleClick={handleSignup}
      />
    </>
  );
};

export default Signup;

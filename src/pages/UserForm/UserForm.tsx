import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { postAxios } from '@_lib/axios';

import Icon from '@_icon/Icon';
import css from './UserForm.module.scss';

const INIT_USERINFO = {
  email: '',
  password: '',
  check: '',
  type: 'employee',
};

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignin = location.pathname === '/signin';

  const [userInfo, setUserInfo] = useState(INIT_USERINFO);

  const { email, password, check, type } = userInfo;

  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postAxios('/token', {
      email,
      password,
    })
      .then(res => {
        const userItem = res.data.item;
        if (userItem) {
          localStorage.setItem('token', userItem.token);
          localStorage.setItem('type', userItem.user.item.type);
          navigate('/');
        }
      })
      .catch(e => alert(e.response.data.message))
      .finally(() => setUserInfo(INIT_USERINFO));
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postAxios('/users', {
      email,
      password,
      type,
    })
      .then(res => {
        if (res.data.item) {
          navigate('/signin');
        }
      })
      .catch(e => alert(e.response.data.message))
      .finally(() => setUserInfo(INIT_USERINFO));
  };

  return (
    <section className={css.container}>
      <form
        className={css.inputForm}
        onSubmit={isSignin ? handleSignin : handleSignup}
      >
        <Icon title="logo" handleIcon={() => navigate('/')} />
        <div className={css.inputBox}>
          <label className={css.inputTitle}>이메일</label>
          <input
            className={css.input}
            type="text"
            name="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={handleUserInfo}
          />
        </div>
        <div className={css.inputBox}>
          <label className={css.inputTitle}>비밀번호</label>
          <input
            className={css.input}
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={handleUserInfo}
          />
        </div>
        {!isSignin && (
          <div className={css.inputBox}>
            <label className={css.inputTitle}>비밀번호 확인</label>
            <input
              className={css.input}
              type="password"
              name="check"
              value={check}
              placeholder="비밀번호를 한번 더 입력하세요"
              onChange={handleUserInfo}
            />
          </div>
        )}
        {!isSignin && (
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
        )}
        <button className={css.cta}>
          {isSignin ? '로그인 하기' : '가입하기'}
        </button>
      </form>
      <span className={css.question}>
        {isSignin ? '회원이 아니신가요?' : '이미 가입하셨나요?'}
        <Link className={css.link} to={`${isSignin ? '/signup' : '/signin'}`}>
          {isSignin ? '회원가입 하기' : '로그인 하기'}
        </Link>
      </span>
    </section>
  );
};

export default Signin;

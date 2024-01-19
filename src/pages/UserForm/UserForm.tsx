import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postAxios } from '@_lib/axios';
import Icon from '@_components/Icon';
import Modal from '@_components/Modal';
import InputBox from './InputBox';

import { UserType, UserInputType } from './UserType';
import css from './UserForm.module.scss';

const INIT_USERINFO: UserType = {
  email: '',
  password: '',
  check: '',
  type: 'employee',
};

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignin = location.pathname === '/signin';

  const [userInfo, setUserInfo] = useState<UserType>(INIT_USERINFO);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    type: 'caution',
    desc: '',
    status: '',
  });

  const { email, password, check, type } = userInfo;

  const validList = {
    email:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
        email
      ),
    password: /^(?=.*[a-z])[a-z\d]{8,}$/.test(password),
    check: password === check,
  };

  const isSubmitBtnActive = isSignin
    ? Object.values({
        email: validList.email,
        password: validList.password,
      }).every(el => el)
    : Object.values({
        email: validList.email,
        password: validList.password,
        check: validList.check,
      }).every(el => el);

  const handleUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLink = () => {
    setUserInfo(INIT_USERINFO);
    navigate(`${isSignin ? '/signup' : '/signin'}`);
  };

  const completSignin = (path: string) => {
    setIsModalOpen(prev => !prev);
    modalInfo.status === 'fail'
      ? setModalInfo({ type: 'caution', desc: '', status: '' })
      : navigate(path);
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
          setModalInfo(prev => ({
            ...prev,
            desc: '환영합니다!',
            status: 'success',
          }));
          setIsModalOpen(prev => !prev);
        }
      })
      .catch(e => {
        setModalInfo(prev => ({
          ...prev,
          desc: e.response.data.message,
          status: 'fail',
        }));
        setIsModalOpen(prev => !prev);
      })
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
          setModalInfo(prev => ({
            ...prev,
            desc: '가입이 완료되었습니다!',
            status: 'success',
          }));
          setIsModalOpen(prev => !prev);
        }
      })
      .catch(e => {
        setModalInfo(prev => ({
          ...prev,
          desc: e.response.data.message,
          status: 'fail',
        }));
        setIsModalOpen(prev => !prev);
      })
      .finally(() => setUserInfo(INIT_USERINFO));
  };

  return (
    <section className={css.container}>
      <form
        className={css.inputForm}
        onSubmit={isSignin ? handleSignin : handleSignup}
      >
        <Icon title="logo" handleIcon={() => navigate('/')} />
        {USER_INPUT.map(list => {
          return (
            <Fragment key={list.id}>
              {list.name === 'check' ? (
                !isSignin && (
                  <InputBox
                    value={userInfo[list.name]}
                    validList={validList}
                    handleUserInfo={handleUserInfo}
                    {...list}
                  />
                )
              ) : (
                <InputBox
                  value={userInfo[list.name]}
                  validList={validList}
                  handleUserInfo={handleUserInfo}
                  {...list}
                />
              )}
            </Fragment>
          );
        })}
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
        <button
          className={`${css.cta} ${!isSubmitBtnActive ? css.disable : ''}`}
          disabled={!isSubmitBtnActive}
        >
          {isSignin ? '로그인 하기' : '가입하기'}
        </button>
      </form>
      <span className={css.question}>
        {isSignin ? '회원이 아니신가요?' : '이미 가입하셨나요?'}
        <button className={css.link} onClick={handleLink}>
          {isSignin ? '회원가입 하기' : '로그인 하기'}
        </button>
      </span>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          positiveFunc={() => completSignin(`${isSignin ? '/' : '/signin'}`)}
          type={modalInfo.type}
          desc={modalInfo.desc}
        />
      )}
    </section>
  );
};

export default Signin;

const USER_INPUT: UserInputType[] = [
  {
    id: 1,
    title: '이메일',
    type: 'text',
    name: 'email',
    placeholder: '이메일을 입력하세요',
  },
  {
    id: 2,
    title: '비밀번호',
    type: 'password',
    name: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
  {
    id: 3,
    title: '비밀번호 확인',
    type: 'password',
    name: 'check',
    placeholder: '비밀번호를 한번 더 입력하세요',
  },
];

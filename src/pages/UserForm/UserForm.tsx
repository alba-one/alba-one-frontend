import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { modalStore } from '@_lib/store';

import Icon from '@_components/Icon';
import Modal from '@_components/Modal';
import Signin from './Signin';
import Signup from './Signup';

import { INIT_USERINFO } from '@_contexts/userForm';
import css from './UserForm.module.scss';

const UserForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignin = location.pathname === '/signin';
  const [userInfo, setUserInfo] = useState(INIT_USERINFO);
  const { modalType, desc, status, isModalOpen, handleModal, setModalContent } =
    modalStore();

  const { email, password, check } = userInfo;

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
    navigate(`${isSignin ? '/signup' : '/signin'}`);
  };

  const completSignin = (path: string) => {
    if (status === 'fail') {
      setModalContent('', '');
    } else {
      navigate(path);
    }
    handleModal();
  };

  useEffect(() => {
    setUserInfo(INIT_USERINFO);
  }, [location.pathname]);

  return (
    <section className={css.container}>
      <form className={css.inputForm} onSubmit={e => e.preventDefault()}>
        <Icon title="logo" handleIcon={() => navigate('/')} />
        {isSignin ? (
          <Signin
            userInfo={userInfo}
            isBtnValid={isSubmitBtnActive}
            validList={validList}
            handleUserInfo={handleUserInfo}
          />
        ) : (
          <Signup
            userInfo={userInfo}
            isBtnValid={isSubmitBtnActive}
            validList={validList}
            handleUserInfo={handleUserInfo}
          />
        )}
      </form>
      <span className={css.question}>
        {isSignin ? '회원이 아니신가요?' : '이미 가입하셨나요?'}
        <button className={css.link} onClick={handleLink}>
          {isSignin ? '회원가입 하기' : '로그인 하기'}
        </button>
      </span>
      {isModalOpen && (
        <Modal
          setIsModalOpen={handleModal}
          positiveFunc={() => completSignin(`${isSignin ? '/' : '/signin'}`)}
          type={modalType}
          desc={desc}
        />
      )}
    </section>
  );
};

export default UserForm;

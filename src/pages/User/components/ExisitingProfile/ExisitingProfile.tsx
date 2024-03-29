import { useState } from 'react';
import { useGetUserType } from '@_hooks/useGetUserType';

import ExisitingEmployee from './ExisitingEmployee';
import ExisitingEmployer from './ExisitingEmployer';
import ApplyList from './ApplyList';
import RegistNotice from './RegistNotice';
import Modal from '@_components/Modal';

import { ModalType } from '@_types/ModalType';
import css from './ExisitingProfile.module.scss';
import MakeProfile from '../MakeProfile';

const ExisitingProfile = ({ userInfo }: any) => {
  const [isOpenRegistNotice, setIsOpenRegistNotice] = useState(false);
  const [isOpenModifyUserInfo, setIsOpenModifyUserInfo] = useState(false);
  const [isOpenMakeProfile, setIsOpenMakeProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalType>({
    type: '',
    desc: '',
    status: '',
  });

  const { isEmployee } = useGetUserType();
  const userData = userInfo.name ? userInfo : userInfo.shop.item;

  const handleNotice = () => {
    setIsOpenRegistNotice(prev => !prev);
  };

  const confirmModal = () => {
    setIsOpenRegistNotice(prev => !prev);
    setIsOpenMakeProfile(prev => !prev);
    setIsModalOpen(prev => !prev);
  };

  return (
    <section className={css.container}>
      <article className={isEmployee ? css.employeeBox : css.employerBox}>
        <h2 className={css.title}>{isEmployee ? '내 프로필' : '내 가게'}</h2>
        <div className={css.cardBox}>
          {isEmployee ? (
            <ExisitingEmployee
              userData={userData}
              setIsOpenMakeProfile={setIsOpenModifyUserInfo}
            />
          ) : (
            <ExisitingEmployer
              userData={userData}
              handleNotice={handleNotice}
            />
          )}
        </div>
      </article>
      <article className={css.listBackround}>
        <div className={css.listBox}>
          <h2 className={css.title}>
            {isEmployee ? '신청 내역' : '내가 등록한 공고'}
          </h2>
          <ApplyList
            userId={userData.id}
            handleNotice={handleNotice}
            shopInfo={userData}
          />
        </div>
      </article>
      {isOpenRegistNotice && (
        <RegistNotice
          userId={userData.id}
          handleNotice={handleNotice}
          handleModal={setModalInfo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isOpenModifyUserInfo && (
        <MakeProfile
          setIsOpenMakeProfile={setIsOpenModifyUserInfo}
          userInfo={userData}
        />
      )}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          positiveFunc={confirmModal}
          type={modalInfo.type}
          desc={modalInfo.desc}
        />
      )}
    </section>
  );
};

export default ExisitingProfile;

import { useState } from 'react';
import { useGetUserType } from '@_hooks/useGetUserType';
import Icon from '@_components/Icon';
import Modal from '@_components/Modal';

import MakeEmployee from './MakeEmployee';
import MakeEmployer from './MakeEmployer';

import { ModalType } from '@_types/ModalType';

import css from './MakeProfile.module.scss';
interface Props {
  setIsOpenMakeProfile: React.Dispatch<React.SetStateAction<boolean>>;
  // setHaveProfile: (value: boolean) => void;
  // userInfo: UserInfo;
}

const MakeProfile = ({ setIsOpenMakeProfile }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalType>({
    type: '',
    desc: '',
    status: '',
  });

  const { isEmployee } = useGetUserType();

  const handleModal = ({ type, desc, status }: ModalType) => {
    setModalInfo({ type, desc, status });
    setIsModalOpen(prev => !prev);
  };

  const confirmModal = () => {
    if (modalInfo.status === 'success') {
      setIsModalOpen(prev => !prev);
      setIsOpenMakeProfile(prev => !prev);
    } else {
      setIsModalOpen(prev => !prev);
    }
  };

  return (
    <section className={css.container}>
      <div className={css.contentWrap}>
        <div className={css.title}>
          <h2>{isEmployee ? '내 프로필' : '가게 정보'}</h2>
          <Icon
            title="close"
            handleIcon={() => setIsOpenMakeProfile(prev => !prev)}
          />
        </div>
        {isEmployee ? (
          <MakeEmployee handleModal={handleModal} />
        ) : (
          <MakeEmployer handleModal={handleModal} />
        )}
      </div>
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

export default MakeProfile;

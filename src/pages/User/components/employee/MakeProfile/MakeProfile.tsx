import { useState } from 'react';
import { putAxios } from '@_lib/axios';
import { useGetUserType } from '@_hooks/useGetUserType';

import Icon from '@_components/Icon';
import Dropdown from '@_components/Dropdown';
import Modal from '@_components/Modal';

import { UserInfo } from '@_types/userType';
import css from './MakeProfile.module.scss';

interface Props {
  setIsOpenMakeProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setHaveProfile: (value: boolean) => void;
  userInfo: UserInfo;
}

const MakeProfile = ({
  setIsOpenMakeProfile,
  setHaveProfile,
  userInfo,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [userInput, setUserInput] = useState<UserInfo>({
    name: '',
    phone: '',
    address: '',
    bio: '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{
    type: string;
    desc: string;
    status: string;
  }>({ type: '', desc: '', status: '' });

  const { isEmployee } = useGetUserType();
  const userId = userInfo.id;

  const handleUserProfile = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };

  const putUserInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `/users/${userId}`;

    putAxios(url, userInput)
      .then(res => {
        if (res.data.item.name) {
          setModalInfo({
            type: 'caution',
            desc: '프로필 등록이 완료되었습니다.',
            status: 'success',
          });

          setIsModalOpen(prev => !prev);
        }
      })
      .catch(error => {
        setModalInfo({
          type: 'caution',
          desc: error.response.data.message,
          status: 'fail',
        });

        setIsModalOpen(prev => !prev);
      });
  };

  const confirmModal = () => {
    if (modalInfo.status === 'success') {
      setIsModalOpen(prev => !prev);
      setHaveProfile(true);
      setIsOpenMakeProfile(prev => !prev);
    } else {
      setIsModalOpen(prev => !prev);
    }
  };

  return (
    // <section className={css.makeProfile}>
    <section className={css.container}>
      <form
        className={css.form}
        onSubmit={e => {
          putUserInput(e);
        }}
      >
        <div className={css.title}>
          <h2>{isEmployee ? '내 프로필' : '내 가게'}</h2>
          <Icon
            title="close"
            handleIcon={() => setIsOpenMakeProfile(prev => !prev)}
          />
        </div>
        <div className={css.inputs}>
          <div className={css.userName}>
            <div className={css.subTitle}>이름*</div>
            <input
              className={css.miniInput}
              name="name"
              placeholder="입력해주세요."
              onChange={handleUserProfile}
              required
            />
          </div>

          <div className={css.userContact}>
            <div className={css.subTitle}>연락처*</div>
            <input
              className={css.miniInput}
              name="phone"
              placeholder="입력해주세요."
              onChange={handleUserProfile}
              required
            />
          </div>

          <div className={css.userLocation}>
            <div className={css.subTitle}>선호 지역*</div>
            <div className={css.selectBox}>
              <Dropdown
                type="address"
                selectedValue={userInput?.address}
                setSelectedValue={setUserInput}
              />
            </div>
          </div>

          <div className={css.lowerLine}>
            <div className={css.subTitle}>소개</div>
            <textarea
              className={css.comments}
              name="bio"
              placeholder="입력해주세요."
              onChange={handleUserProfile}
              required
            />
          </div>
        </div>

        <button className={css.submitBtn}>등록하기</button>
      </form>
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

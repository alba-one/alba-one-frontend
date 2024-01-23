import Icon from '@_components/Icon';
import Dropdown from '@_components/Dropdown/Dropdown';

import css from './MakeProfile.module.scss';
import { useEffect, useState } from 'react';
import { putAxios } from '@_lib/axios';
import Modal from '@_components/Modal';

interface Props {
  setIsOpenMakeProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setHaveProfile: (value: boolean) => void;
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

const MakeProfile = ({
  setIsOpenMakeProfile,
  userInfo,
  setHaveProfile,
}: Props) => {
  const userId = userInfo.id;

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [userInput, setUserInput] = useState<{
    name: string;
    phone: string;
    address: string;
    bio: string;
  }>({ name: '', phone: '', address: '', bio: '' });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{
    type: string;
    desc: string;
    status: string;
  }>({ type: '', desc: '', status: '' });

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
      })
      .finally(() => {});
  };

  const saveAddress = (selectedValue: string) => {
    setUserInput(prev => ({
      ...prev,
      address: selectedValue,
    }));
  };

  useEffect(() => {
    saveAddress(selectedValue);
  }, [selectedValue]);

  const confirmModal = () => {
    if (modalInfo.status === 'success') {
      setIsModalOpen(prev => !prev);
      setHaveProfile(true);
    } else {
      setIsModalOpen(prev => !prev);
    }
  };

  return (
    <section className={css.makeProfile}>
      <form
        onSubmit={e => {
          putUserInput(e);
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
                setUserInput(prev => ({
                  ...prev,
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
                setUserInput(prev => ({
                  ...prev,
                  phone: value,
                }));
              }}
            />
          </div>

          <div />

          <div className={css.userLocation}>
            <div className={css.subTitle}>선호 지역*</div>
            <div className={css.selectBox}>
              <Dropdown
                type="address"
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
            </div>
          </div>

          <div className={css.lowerLine}>
            <div className={css.subTitle}>소개</div>
            <textarea
              className={css.comments}
              placeholder="입력해주세요."
              onChange={({ target: { value } }) => {
                setUserInput(prev => ({
                  ...prev,
                  bio: value,
                }));
              }}
            ></textarea>
          </div>
        </div>

        <button className={css.submitBtn}>등록하기</button>
      </form>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          positiveFunc={() => {
            confirmModal();
          }}
          type={modalInfo.type}
          desc={modalInfo.desc}
        />
      )}
    </section>
  );
};

export default MakeProfile;

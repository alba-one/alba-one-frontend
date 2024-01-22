import { useCallback, useRef, useState } from 'react';
import { putAxios } from '@_lib/axios';

import Icon from '@_components/Icon';
import Dropdown from '@_components/Dropdown/Dropdown';

import { UserInfo } from '@_types/userType';
import css from './MakeStore.module.scss';
import Modal from '@_components/Modal';

interface Props {
  setIsOpenMakeProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setHaveProfile: (value: boolean) => void;
  userInfo: UserInfo;
}

const MakeStore = ({
  setIsOpenMakeProfile,
  setHaveProfile,
  userInfo,
}: Props) => {
  const shopId = userInfo.id;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<{
    type: string;
    desc: string;
    status: string;
  }>({ type: '', desc: '', status: '' });

  const [selectedValue, setSelectedValue] = useState<string>('');
  const [userInput, setUserInput] = useState<{
    name: string;
    category: string;
    address1: string;
    address2: string;
    description: string;
    imageUrl: string;
    originalHourlyPay: number;
  }>({
    name: '',
    category: '',
    address1: '',
    address2: '',
    description: '',
    imageUrl: '',
    originalHourlyPay: 0,
  });

  const [userImage, setUserImage] = useState<File | null>(null);

  const putUserInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `/shops/${shopId}`;

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

  const uploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setUserImage(file);

    setUserInput(prev => ({
      ...prev,
      imageUrl: URL.createObjectURL(file),
    }));
  }, []);

  const confirmModal = () => {
    if (modalInfo.status === 'success') {
      setIsModalOpen(prev => !prev);
      setHaveProfile(true);
    } else {
      setIsModalOpen(prev => !prev);
    }
  };

  console.log(userInput);

  return (
    <section className={css.makeStore}>
      <form
        className={css.form}
        onSubmit={e => {
          putUserInput(e);
        }}
      >
        <div className={css.title}>
          가게 정보 <Icon title="close" />
        </div>

        <div className={css.inputs}>
          <div className={css.storeName}>
            <div className={css.subTitle}>가게 이름*</div>
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

          <div className={css.category}>
            <div className={css.subTitle}>분류*</div>
            <div className={css.selectBox}>
              <Dropdown
                type="category"
                selectedValue={userInput?.category}
                setSelectedValue={setUserInput}
              />
            </div>
          </div>

          <div className={css.address1}>
            <div className={css.subTitle}>주소*</div>
            <div className={css.selectBox}>
              <Dropdown
                type="address"
                selectedValue={userInput?.address1}
                setSelectedValue={setUserInput}
              />
            </div>
          </div>

          <div />
          <div className={css.address2}>
            <div className={css.subTitle}>상세주소*</div>
            <input
              className={css.miniInput}
              placeholder="입력해주세요."
              onChange={({ target: { value } }) => {
                setUserInput(prev => ({
                  ...prev,
                  address2: value,
                }));
              }}
            />
          </div>

          <div className={css.originalHourlyPay}>
            <div className={css.subTitle}>기본 시급*</div>
            <div className={css.miniInput}>
              <input
                className={css.innerInput}
                placeholder="입력해주세요."
                type="number"
                onChange={({ target: { value } }) => {
                  const parsedValue = parseInt(value);
                  setUserInput(prev => ({
                    ...prev,
                    originalHourlyPay: parsedValue,
                  }));
                }}
              />
              원
            </div>

            <div className={`${css.description} ${css.moreText}`}>
              <div className={css.subTitle}>가게 설명</div>
              <textarea
                className={css.comments}
                placeholder="입력해주세요."
                onChange={({ target: { value } }) => {
                  setUserInput(prev => ({
                    ...prev,
                    description: value,
                  }));
                }}
              ></textarea>
            </div>
          </div>

          <div />

          <div className={css.addImage}>
            <div className={css.subTitle}>가게 이미지</div>
            <form method="post" encType="multipart/form-data">
              <label className={css.imageLabel}>
                <div className={css.imageInputBox}>
                  <input
                    type="file"
                    className={css.imageInput}
                    accept="image/*"
                    onChange={e => {
                      uploadImage(e);
                    }}
                  />
                  {userInput.imageUrl ? (
                    <img
                      src={userInput.imageUrl}
                      alt="미리보기 이미지"
                      className={css.preview}
                    />
                  ) : (
                    <div>
                      <Icon title="camera" />
                      <div className={css.message}> 이미지 추가하기</div>
                    </div>
                  )}
                </div>
              </label>
            </form>
          </div>

          <div />

          <div />
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

export default MakeStore;

import { Dispatch, useState } from 'react';
import Icon from '@_components/Icon';
import InputBox from '@_components/InputBox';
import css from './RegistNotice.module.scss';
import { postAxios } from '@_lib/axios';
import { ModalType } from '@_types/ModalType';

interface Props {
  userId: string;
  handleNotice: () => void;
  handleModal: Dispatch<React.SetStateAction<ModalType>>;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

const RegistNotice = ({
  userId,
  handleNotice,
  handleModal,
  setIsModalOpen,
}: Props) => {
  const [noticeInfo, setNoticeInfo] = useState({
    hourlyPay: 0,
    startsAt: '2024-02-23T18:30:00Z',
    workhour: 0,
    description: '',
  });

  const { hourlyPay, startsAt, workhour, description } = noticeInfo;

  const handleNoticeInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoticeInfo(prev => ({ ...prev, [name]: value }));
  };

  const postNotice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = `/shops/${userId}/notices`;

    postAxios(url, noticeInfo)
      .then(res => {
        if (res.data.item.id) {
          handleModal({
            type: 'caution',
            desc: '공고 등록이 완료되었습니다.',
            status: 'success',
          });
          setIsModalOpen(prev => !prev);
        }
      })
      .catch(error => {
        handleModal({
          type: 'caution',
          desc: error.response.data.message,
          status: 'fail',
        });
        setIsModalOpen(prev => !prev);
      });
  };

  return (
    <section className={css.container}>
      <div className={css.contentWrap}>
        <div className={css.title}>
          <h2>공고 등록</h2>
          <Icon title="close" handleIcon={handleNotice} />
        </div>
        <form className={css.userForm} onSubmit={postNotice}>
          <div className={css.basicInfoBox}>
            <InputBox
              title="시급*"
              name="hourlyPay"
              value={hourlyPay}
              placeholder="0"
              required={true}
              type="pay"
              handleInput={handleNoticeInfo}
            />
            <InputBox
              title="시작 일시*"
              name="startsAt"
              value={startsAt}
              placeholder="YYYY-MM-DD hh:mm"
              required={true}
              type="text"
              handleInput={handleNoticeInfo}
            />
            <InputBox
              title="업무 시간*"
              name="workhour"
              value={workhour}
              placeholder="0"
              required={true}
              type="time"
              handleInput={handleNoticeInfo}
            />
          </div>
          <InputBox
            title="공고 설명"
            name="description"
            value={description}
            placeholder="입력해주세요"
            required={false}
            type="area"
            handleInput={handleNoticeInfo}
          />
          <button className={css.submitBtn}>등록하기</button>
        </form>
      </div>
    </section>
  );
};

export default RegistNotice;

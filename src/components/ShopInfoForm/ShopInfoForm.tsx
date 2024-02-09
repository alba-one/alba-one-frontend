import { Dispatch, SetStateAction } from 'react';
import { postAxios } from '@_lib/axios';
import InputBox from '@_components/InputBox';

import { ShopInfo } from '@_types/noticeTypes';
import css from './ShopInfoForm.module.scss';

interface Props {
  userInput: ShopInfo;
  setUserInput: Dispatch<SetStateAction<ShopInfo>>;
  putUserInput: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const ShopInfoForm = ({ userInput, setUserInput, putUserInput }: Props) => {
  const {
    name,
    category,
    address1,
    address2,
    originalHourlyPay,
    description,
    imageUrl,
  } = userInput;

  const handleUserProfile = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };

  const handleSelcetValue = (type: string, value: string) => {
    setUserInput(prev => ({ ...prev, [type]: value }));
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return null;
    }

    const file = e.target.files[0];
    const url = '/images';

    postAxios(url, { name: file.name }).then(res => {
      if (res.data.item.url) {
        const presignedURL = res.data.item.url;
        const putUrl = presignedURL.slice(0, presignedURL.indexOf('?'));
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${res.data.item.url}`, {
          method: 'PUT',
          headers: {},
          body: file,
        }).then(res => {
          if (res.ok) {
            fetch(putUrl).then(res => {
              if (res.ok) {
                setUserInput(prev => ({ ...prev, imageUrl: res.url }));
              }
            });
          }
        });
      }
    });
  };

  return (
    <form className={css.userForm} onSubmit={putUserInput}>
      <div className={css.inputBox}>
        <InputBox
          title="가게 이름*"
          name="name"
          value={name}
          placeholder="입력해주세요"
          required={true}
          type="text"
          handleInput={handleUserProfile}
        />
        <InputBox
          title="분류*"
          name="category"
          value={category}
          type="select"
          handleDropDown={handleSelcetValue}
        />
        <InputBox
          title="주소*"
          name="address1"
          value={address1}
          type="select"
          handleDropDown={handleSelcetValue}
        />
        <InputBox
          title="상세 주소*"
          name="address2"
          value={address2}
          placeholder="입력해주세요"
          required={true}
          type="text"
          handleInput={handleUserProfile}
        />
      </div>

      <div className={css.detailBox}>
        <InputBox
          title="기본 시급*"
          name="originalHourlyPay"
          value={originalHourlyPay}
          placeholder="입력해주세요"
          required={true}
          type="pay"
          handleInput={handleUserProfile}
        />
        <InputBox
          title="가게 설명"
          name="description"
          value={description}
          placeholder="입력해주세요"
          required={false}
          type="area"
          handleInput={handleUserProfile}
        />
      </div>
      <div className={css.imageBox}>
        <InputBox
          title="가게 이미지"
          name="imageUrl"
          value={imageUrl}
          type="image"
          handleInput={uploadImage}
        />
      </div>
      <div className={css.buttonBox}>
        <button className={css.submitBtn} onClick={putUserInput}>
          등록하기
        </button>
      </div>
    </form>
  );
};

export default ShopInfoForm;

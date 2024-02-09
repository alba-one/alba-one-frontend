import { useState } from 'react';
import { postAxios } from '@_lib/axios';
import ShopInfoForm from '@_components/ShopInfoForm';

import { ModalType } from '@_types/ModalType';
import { SHOP_INFO_INIT } from '@_contexts/shopInfo';

interface Props {
  handleModal: ({ type, desc, status }: ModalType) => void;
}

const MakeEmployer = ({ handleModal }: Props) => {
  const [userInput, setUserInput] = useState(SHOP_INFO_INIT);

  const putUserInput = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    postAxios('/shops', userInput)
      .then(res => {
        if (res.data.item.name) {
          handleModal({
            type: 'caution',
            desc: '가게 등록이 완료되었습니다.',
            status: 'success',
          });
        }
      })
      .catch(error => {
        handleModal({
          type: 'caution',
          desc: error.response.data.message,
          status: 'fail',
        });
      });
  };

  return (
    <ShopInfoForm
      userInput={userInput}
      setUserInput={setUserInput}
      putUserInput={putUserInput}
    />
  );
};

export default MakeEmployer;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserType } from '@_hooks/useGetUserType.ts';
import { getAxios, putAxios } from '@_lib/axios.ts';

import ShopInfoForm from '@_components/ShopInfoForm/ShopInfoForm.tsx';
import LargeCard from '../../components/LargeCard/LargeCard';
import EmployerDetailBox from './Components/EmployerDetailBox/EmployerDetailBox.tsx';
import EmployeeDetailBox from './Components/EmployeeDetailBox/EmployeeDetailBox.tsx';

import { SHOP_INFO_INIT } from '@_contexts/shopInfo.ts';
import { Notice } from '@_types/noticeTypes.ts';
import css from './Detail.module.scss';
import Icon from '@_components/Icon/Icon.tsx';
import { ModalType } from '@_types/ModalType.ts';
import Modal from '@_components/Modal/Modal.tsx';

const Detail = () => {
  const [noticeDetail, setNoticeDetail] = useState<Notice>({});
  const [shopInfo, setShopInfo] = useState(SHOP_INFO_INIT);
  const [isOpenShopInfo, setIsOpenShopInfo] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalType>({
    type: '',
    desc: '',
    status: '',
  });

  const handleModal = ({ type, desc, status }: ModalType) => {
    setModalInfo({ type, desc, status });
    setIsModalOpen(prev => !prev);
  };
  const { isEmployee } = useGetUserType();
  const params = useParams();

  const confirmModal = () => {
    if (modalInfo.status === 'success') {
      setIsModalOpen(prev => !prev);
      setIsOpenShopInfo(prev => !prev);
    } else {
      setIsModalOpen(prev => !prev);
    }
  };

  useEffect(() => {
    getAxios(
      `/shops/c9412e6d-a49d-4e19-9144-5f0dc958db9f/notices/${params.id}`
    ).then(({ data }) => {
      setNoticeDetail(data.item);
      setShopInfo(data.item.shop.item);
    });
  }, []);

  const putUserInput = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    putAxios(`/shops/${shopInfo?.id}`, shopInfo)
      .then(res => {
        if (res.data.item.name) {
          handleModal({
            type: 'caution',
            desc: '가게 정보 변경이 완료되었습니다.',
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

  if (!noticeDetail.description) return null;

  const { shop, ...rest } = noticeDetail;
  const notice = { ...rest };

  return (
    <section className={css.container}>
      <div className={css.topOfDetail}>
        <div className={css.title}>
          <div className={css.category}>{shopInfo.category}</div>
          <div className={css.storeName}>{shopInfo.name}</div>
        </div>
        <LargeCard
          isEmployee={isEmployee}
          notice={notice}
          shop={shopInfo}
          setIsOpenShopInfo={setIsOpenShopInfo}
        />
        <div className={css.storeDescription}>
          <div className={css.descriptionTitle}>공고 설명</div>
          <div className={css.descriptionWords}>{noticeDetail.description}</div>
        </div>
      </div>
      {isOpenShopInfo && (
        <div className={css.shopInfoBox}>
          <div className={css.contentWrap}>
            <div className={css.titleBox}>
              <h2>가게 정보</h2>
              <Icon
                title="close"
                handleIcon={() => setIsOpenShopInfo(prev => !prev)}
              />
            </div>
            <ShopInfoForm
              userInput={shopInfo}
              setUserInput={setShopInfo}
              putUserInput={putUserInput}
            />
          </div>
        </div>
      )}
      {isEmployee ? <EmployeeDetailBox /> : <EmployerDetailBox />}
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

export default Detail;

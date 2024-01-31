import { useGetUserType } from '@_hooks/useGetUserType';
import css from './ApplyList.module.scss';
import { useEffect, useState } from 'react';
import { getAxios } from '@_lib/axios';

interface Props {
  userId: string;
  handleNotice: () => void;
}

const ApplyList = ({ userId, handleNotice }: Props) => {
  const [noticeList, setNoticeList] = useState<any>([]);
  const { isEmployee } = useGetUserType();
  const checkNoticeUrl = isEmployee
    ? `/users/${userId}/applications`
    : `/shops/${userId}/notices`;

  useEffect(() => {
    getAxios(checkNoticeUrl).then(res => {
      setNoticeList(res.data.items);
    });
  }, [userId]);

  return (
    <div>
      {noticeList?.length === 0 ? (
        <div className={css.newApplyBox}>
          <span className={css.notice}>
            {isEmployee ? '아직 신청 내역이 없어요' : '공고를 등록해보세요'}
          </span>
          <button className={css.applyBtn} onClick={handleNotice}>
            {isEmployee ? '공고 보러가기' : '공고 등록하기'}
          </button>
        </div>
      ) : (
        <div>리스트가 나올 예정</div>
      )}
    </div>
  );
};

export default ApplyList;

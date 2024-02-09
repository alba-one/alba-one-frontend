import { putAxios } from '@_lib/axios';
import css from './AnnouncedInfo.module.scss';

interface Props {
  applyList: ApplyList;
  handleRefetch: () => void;
}

interface ApplyList {
  id: string;
  shopId: string;
  noticeId: string;
  href: string;
  item: {
    id: string;
    email: string;
    type: string;
    name: string;
    phone: string;
    address: string;
    bio: string;
  };
  status: string;
}

const AnnouncedInfo = ({ applyList, handleRefetch }: Props) => {
  const { name, bio, phone } = applyList.item;
  const { shopId, noticeId, id } = applyList;

  const handleCancleApply = (status: string) => {
    putAxios(`/shops/${shopId}/notices/${noticeId}/applications/${id}`, {
      status: status,
    }).then(() => handleRefetch());
  };

  return (
    <div className={css.announcedInfo}>
      <div className={css.columnItems}>{name}</div>
      <div className={css.columnItems}>{bio}</div>
      <div className={css.columnItems}>{phone}</div>
      <div className={css.columnItems}>
        {applyList.status === 'pending' ? (
          <div className={css.buttonBox}>
            <button
              className={css.negativeBtn}
              onClick={() => handleCancleApply('rejected')}
            >
              거절하기
            </button>
            <button
              className={css.positiveBtn}
              onClick={() => handleCancleApply('accepted')}
            >
              승인하기
            </button>
          </div>
        ) : (
          <span className={`${css.badge} ${css[applyList.status]}`}>
            {BADGE_TITLE[applyList.status]}
          </span>
        )}
      </div>
    </div>
  );
};

export default AnnouncedInfo;

const BADGE_TITLE: { [key: string]: string } = {
  accepted: '승인 완료',
  rejected: '거절',
  canceled: '취소',
};

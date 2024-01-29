import { useEffect, useState } from 'react';
import { getAxios } from '@_lib/axios';

import RegistUser from './components/RegistUser';
import MakeProfile from './components/MakeProfile';
import ExisitingProfile from './components/ExisitingProfile';

import { UserInfo } from '@_types/userType';
import css from './User.module.scss';

const User = () => {
  const [isOpenMakeProfile, setIsOpenMakeProfile] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    email: '',
    type: '',
    shop: null,
  });

  useEffect(() => {
    getAxios(`users/${localStorage.getItem('userId')}`).then(res =>
      setUserInfo(res.data.item)
    );
  }, [isOpenMakeProfile]);

  const isNewUser =
    (userInfo.type === 'employee' && !userInfo.name) ||
    (userInfo.type === 'employer' && !userInfo.shop);

  if (!userInfo) return null;

  return (
    <section className={css.container}>
      {isNewUser && !isOpenMakeProfile && (
        <RegistUser setIsOpenMakeProfile={setIsOpenMakeProfile} />
      )}
      {isOpenMakeProfile && (
        <MakeProfile setIsOpenMakeProfile={setIsOpenMakeProfile} />
      )}
      {userInfo.name ||
        (userInfo.shop && <ExisitingProfile userInfo={userInfo} />)}
    </section>
  );
};

export default User;

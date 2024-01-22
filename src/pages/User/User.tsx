import { useEffect, useState } from 'react';
import { getAxios } from '@_lib/axios';

import RegistUser from './components/RegistUser';
import ExistingProfile from './components/employee/ExistingProfile/ExistingProfile.tsx';
import MakeProfile from './components/MakeProfile';

import ExistingStore from './components/employer/ExistingStore/ExistingStore.tsx';
import MakeStore from './components/employer/MakeStore/MakeStore.tsx';

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

  if (!userInfo) return null;

  return (
    <section className={css.container}>
      {!userInfo.name && !isOpenMakeProfile && (
        <RegistUser setIsOpenMakeProfile={setIsOpenMakeProfile} />
      )}
      {isOpenMakeProfile && (
        <MakeProfile
          setIsOpenMakeProfile={setIsOpenMakeProfile}
          userInfo={userInfo}
          setHaveProfile={setHaveProfile}
        />
      )}
      {userInfo.name && <ExistingProfile userInfo={userInfo} />}
    </section>
  );
};

export default User;

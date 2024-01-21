import { useEffect, useState } from 'react';
import { getAxios } from '@_lib/axios';
import ExistingProfile from './components/employee/ExistingProfile/ExistingProfile.tsx';
import MakeProfile from './components/employee/MakeProfile/MakeProfile.tsx';
import RegistUser from './components/employee/RegistUser/RegistUser.tsx';

import css from './User.module.scss';

interface UserInfo {
  id: string;
  email: string;
  type: 'employer' | 'employee';
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  shop?: ShopType[];
}

interface ShopType {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

const User = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({});
  const [isOpenMakeProfile, setIsOpenMakeProfile] = useState(false);
  const [haveProfile, setHaveProfile] = useState<boolean>(false);

  useEffect(() => {
    getAxios(`users/${localStorage.getItem('userId')}`).then(res =>
      setUserInfo(res.data.item)
    );
  }, []);

  return (
    <section className={css.container}>
      {userInfo && haveProfile ? (
        <ExistingProfile />
      ) : isOpenMakeProfile ? (
        <MakeProfile
          setIsOpenMakeProfile={setIsOpenMakeProfile}
          userInfo={userInfo}
          setHaveProfile={setHaveProfile}
        />
      ) : (
        <RegistUser setIsOpenMakeProfile={setIsOpenMakeProfile} />
      )}
    </section>
  );
};

export default User;

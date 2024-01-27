import { useEffect, useMemo, useState } from 'react';
import { getAxios } from '@_lib/axios';
import ExistingProfile from './components/employee/ExistingProfile/ExistingProfile.tsx';
import MakeProfile from './components/employee/MakeProfile/MakeProfile.tsx';
import RegistUser from './components/employee/RegistUser/RegistUser.tsx';

import css from './User.module.scss';
import ExistingStore from './components/employer/ExistingStore/ExistingStore.tsx';
import MakeStore from './components/employer/MakeStore/MakeStore.tsx';

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

  const editProfile = () => {
    if (userInfo && userInfo.name && isOpenMakeProfile) {
      setIsOpenMakeProfile(prev => !prev);
    }
  };

  const checkUserType = (userInfo: UserInfo) => {
    if (userInfo && userInfo.type === 'employee') {
      if (userInfo.name) {
        return <ExistingProfile userInfo={userInfo} />;
      }
      if (!userInfo.name && isOpenMakeProfile) {
        return (
          <MakeProfile
            setIsOpenMakeProfile={setIsOpenMakeProfile}
            userInfo={userInfo}
            setHaveProfile={setHaveProfile}
          />
        );
      } else {
        return <RegistUser setIsOpenMakeProfile={setIsOpenMakeProfile} />;
      }
    }

    if (userInfo && userInfo.type === 'employer') {
      if (userInfo.name) {
        <ExistingStore />;
      }
      if (!userInfo.name && isOpenMakeProfile) {
        return (
          <MakeStore
            setIsOpenMakeProfile={setIsOpenMakeProfile}
            userInfo={userInfo}
            setHaveProfile={setHaveProfile}
          />
        );
      } else {
        return <RegistUser setIsOpenMakeProfile={setIsOpenMakeProfile} />;
      }
    }
  };

  const memoizedCheckUserType = useMemo(
    () => checkUserType(userInfo),
    [userInfo, isOpenMakeProfile]
  );

  if (!userInfo) return null;

  return <section className={css.container}>{memoizedCheckUserType}</section>;
};

export default User;

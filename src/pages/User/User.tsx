import ExistingProfile from './MyProfile/ExistingProfile/ExistingProfile.tsx';
import MakeProfile from './MyProfile/MakeProfile/MakeProfile.tsx';
import None from './MyProfile/None/None.tsx';

import Icon from '@_icon/Icon/Icon.tsx';

import css from './User.module.scss';

const User = () => {
  const isMake = true;
  return (
    <section className={css.container}>
      <None />
      <MakeProfile />
      <ExistingProfile />
    </section>
  );
};

export default User;

import logo from '@_assets/icons/i_logo.svg';
import search from '@_assets/icons/i_search.svg';
import notiEmpty from '@_assets/icons/i_noti_empty.svg';
import notiActive from '@_assets/icons/i_noti_active.svg';
import mail from '@_assets/icons/i_mail.svg';
import facebook from '@_assets/icons/i_facebook.svg';
import instagram from '@_assets/icons/i_instagram.svg';
import clock from '@_assets/icons/i_clock.svg';
import location from '@_assets/icons/i_location.svg';
import arrowUp from '@_assets/icons/i_arrow_up.svg';

interface Props {
  title: string;
  handleIcon?: () => void;
}

interface IconList {
  [key: string]: string;
}

const iconList: IconList = {
  logo,
  search,
  notiEmpty,
  notiActive,
  mail,
  facebook,
  instagram,
  clock,
  location,
  arrowUp,
};

const Icon = ({ title, handleIcon }: Props) => {
  return <img src={iconList[title]} alt={title} onClick={handleIcon} />;
};

export default Icon;

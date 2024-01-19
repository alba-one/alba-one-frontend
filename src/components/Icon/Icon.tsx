import logo from '@_assets/icons/i_logo.svg';
import search from '@_assets/icons/i_search.svg';
import notiEmpty from '@_assets/icons/i_noti_empty.svg';
import notiActive from '@_assets/icons/i_noti_active.svg';
import mail from '@_assets/icons/i_mail.svg';
import facebook from '@_assets/icons/i_facebook.svg';
import instagram from '@_assets/icons/i_instagram.svg';

interface Props {
  title: string;
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
};

const Icon = ({ title }: Props) => {
  return <img src={iconList[title]} alt={title} />;
};

export default Icon;

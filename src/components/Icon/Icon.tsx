import logo from '@_assets/icons/i_logo.svg';
import search from '@_assets/icons/i_search.svg';
import notiEmpty from '@_assets/icons/i_noti_empty.svg';
import notiActive from '@_assets/icons/i_noti_active.svg';

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
};

const Icon = ({ title }: Props) => {
  return <img src={iconList[title]} alt={title} />;
};

export default Icon;

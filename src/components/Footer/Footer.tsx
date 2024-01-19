import { useLocation } from 'react-router-dom';
import Icon from '@_components/Icon';
import css from './Footer.module.scss';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/signin' || location.pathname === '/signup')
    return null;

  return (
    <footer className={css.footer}>
      <div className={css.footerContainer}>
        <span>@alba+one - 2023</span>
        <div className={css.enquire}>
          <span>privacy policy</span>
          <span>FAQ</span>
        </div>
        <div className={css.icons}>
          <Icon title="mail" />
          <Icon title="facebook" />
          <Icon title="instagram" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { ReactNode } from 'react';
import ReactDom from 'react-dom';

interface Props {
  children: ReactNode;
}

const ModalPortal = ({ children }: Props) => {
  const modalRoot: any = document.getElementById('modal');
  return ReactDom.createPortal(children, modalRoot);
};

export default ModalPortal;

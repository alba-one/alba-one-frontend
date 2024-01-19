import { useEffect } from 'react';
import ModalPortal from '@_lib/modalPortal';
import Icon from '@_components/Icon';

import css from './Modal.module.scss';

interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  positiveFunc: () => void;
  nagativeFunc?: () => void;
  type: string;
  desc: string;
}

const Modal = ({
  setIsModalOpen,
  positiveFunc,
  nagativeFunc,
  type,
  desc,
}: ModalProps) => {
  const isCautionType = type === 'caution';

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <ModalPortal>
      <div
        className={css.dimmedBackground}
        onClick={() => {
          setIsModalOpen(prev => !prev);
        }}
      >
        <div className={css.modalLayout} onClick={e => e.stopPropagation()}>
          <Icon title={type} />
          <span className={css.desc}>{desc}</span>
          <div className={css.btnBox}>
            {!isCautionType && (
              <button
                className={`${css.cta} ${css.negative}`}
                onClick={nagativeFunc}
              >
                아니오
              </button>
            )}
            <button
              className={`${css.cta} ${css.positive}`}
              onClick={positiveFunc}
            >
              {isCautionType ? '확인' : '예'}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;

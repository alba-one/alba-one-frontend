import { create } from 'zustand';

interface ModalType {
  modalType: string;
  desc: string;
  status: string;
  isModalOpen: boolean;
  handleModal: () => void;
  setModalContent: (desc: string, status: string) => void;
}

export const modalStore = create<ModalType>(set => ({
  modalType: 'caution',
  desc: '',
  status: '',
  isModalOpen: false,
  handleModal: () =>
    set(state => ({
      ...state,
      isModalOpen: !state.isModalOpen,
    })),
  setModalContent: (desc: string, status: string) =>
    set(state => ({
      ...state,
      desc,
      status,
      isModalOpen: true,
    })),
}));

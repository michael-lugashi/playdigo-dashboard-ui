import React from 'react';
import Modal from './Modal';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isCloseOnBackDropClick?: boolean;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children, isCloseOnBackDropClick = false }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseOnBackDropClick={isCloseOnBackDropClick}>
      <div className="relative bg-white p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="cursor-pointer absolute text-4xl font-black -top-1 right-1 text-deep-purple font-stretch-110% tracking-wider hover:scale-110 active:scale-125 transition-transform duration-200"
        >
          ×
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default Popup;

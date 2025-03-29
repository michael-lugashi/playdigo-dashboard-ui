import { createPortal } from 'react-dom';
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  isCloseOnClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose, isCloseOnClick = false }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (onClose && isCloseOnClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-dark-white opacity-70"></div>
      {children}
    </div>,
    document.body
  );
};

export default Modal;

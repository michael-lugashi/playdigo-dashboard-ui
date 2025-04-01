import { createPortal } from 'react-dom';
import { useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  isCloseOnBackDropClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose, isCloseOnBackDropClick = false }) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (isCloseOnBackDropClick && onClose && e.target === backdropRef.current) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div ref={backdropRef} className="absolute inset-0 bg-dark-white opacity-70"></div>
      <div className="relative">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;

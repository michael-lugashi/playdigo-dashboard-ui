import { useState } from 'react';
import Popup from '../general/Popup';
import DeleteUserConfirmation from './DeleteUserConfirmation';

interface DeleteUserButtonProps {
  userName: string;
  onDelete: () => Promise<void>;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userName, onDelete }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDeleteConfirmation(true)}
        className="px-4 py-2 button-cancel button-scale-5"
      >
        Delete User
      </button>

      <Popup isOpen={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
        <DeleteUserConfirmation
          userName={userName}
          onConfirm={() => {
            setShowDeleteConfirmation(false);
            void onDelete();
          }}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      </Popup>
    </>
  );
};

export default DeleteUserButton;

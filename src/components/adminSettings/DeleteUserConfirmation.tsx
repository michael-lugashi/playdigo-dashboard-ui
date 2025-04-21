import { AlertIcon } from '../svgs';

interface DeleteUserConfirmationProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteUserConfirmation: React.FC<DeleteUserConfirmationProps> = ({ userName, onConfirm, onCancel }) => (
  <div className="text-center text-xl text-gray-700 p-4 pb-2 max-w-md min-w-[400px] gap-1">
    <div className="flex items-center justify-center gap-1.5">
      <h2 className="font-bold text-deep-purple">Delete User</h2>
      <AlertIcon className="h-full pt-2 w-6 text-red-600" />
    </div>
    <p>Are you sure you want to delete {userName}?</p>
    <p>This action cannot be undone.</p>
    <div className="flex justify-center gap-4 mt-6">
      <button onClick={onCancel} type="button" className="px-6 py-2 button-neutral button-scale-5">
        No, Cancel
      </button>
      <button onClick={onConfirm} type="button" className="px-6 py-2 button-cancel button-scale-5">
        Yes, Delete
      </button>
    </div>
  </div>
);

export default DeleteUserConfirmation;

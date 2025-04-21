import { useState, useEffect } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import { User } from '../../services/playdigoClient.types';
import AdminBanner from './AdminBanner';
import {
  getPlaydigoUsers,
  getAllPlaydigoGraphOptions,
  updatePlaydigoUser,
  createPlaydigoUser,
  updatePlaydigoUserPassword,
  deletePlaydigoUser,
} from '../../services/playdigoClient';
import { CreateUserPayload } from './UserForm';
import isEqual from 'lodash.isequal';

const AdminSettings = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [graphOptions, setGraphOptions] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      const users = await getPlaydigoUsers();
      const graphOptions = await getAllPlaydigoGraphOptions();
      setUsers(users);
      setGraphOptions(graphOptions);
    })();
  }, []);

  const onSubmit = async (user: User | CreateUserPayload) => {
    if ('password' in user) {
      await handleCreateUser(user);
    } else {
      await handleUpdateUser(user);
    }
  };

  const handleCreateUser = async (newUser: CreateUserPayload) => {
    // Dummy implementation - would normally call API
    const newUserFromServer = await createPlaydigoUser(newUser);
    setUsers([...users, newUserFromServer]);
    setIsAddingUser(false);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    // Dummy implementation - would normally call API
    if (!selectedUser) throw new Error('No user selected');
    const updates = getChangedValues(selectedUser, updatedUser);
    const updatedUserFromServer = await updatePlaydigoUser(selectedUser.id, updates);
    const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUserFromServer : user));
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const handleGeneratePassword = async (password: string) => {
    // Dummy implementation - would normally call API
    if (!selectedUser) throw new Error('No user selected');
    await updatePlaydigoUserPassword(selectedUser.id, password);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) throw new Error('No user selected');
    await deletePlaydigoUser(selectedUser.id);
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setSelectedUser(null);
  };

  const handleAddUserClick = () => {
    setSelectedUser(null);
    setIsAddingUser(true);
  };

  return (
    <div className="min-h-screen bg-dark-white p-4">
      <div className="max-w-7xl mx-auto">
        <AdminBanner onAddUserClick={handleAddUserClick} />

        {isAddingUser ? (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <UserForm
              onSubmit={onSubmit}
              onCancel={() => setIsAddingUser(false)}
              generatePassword={handleGeneratePassword}
              availableGraphs={graphOptions}
            />
          </div>
        ) : selectedUser ? (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <UserForm
              user={selectedUser}
              onSubmit={onSubmit}
              onCancel={() => setSelectedUser(null)}
              generatePassword={handleGeneratePassword}
              availableGraphs={graphOptions}
              onDelete={handleDeleteUser}
            />
          </div>
        ) : (
          <UserList users={users} onEditUser={setSelectedUser} />
        )}
      </div>
    </div>
  );
};

export default AdminSettings;

function getChangedValues<T extends object>(obj1: T, obj2: Partial<T>): Partial<T> {
  const result: Partial<T> = {};

  for (const key of Object.keys(obj2) as (keyof T)[]) {
    if (!isEqual(obj1[key], obj2[key])) {
      result[key] = obj2[key];
    }
  }

  return result;
}

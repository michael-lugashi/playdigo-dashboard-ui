import { useState, useEffect } from 'react';
import TextField from '../general/TextField';
import { User } from '../../services/playdigoClient.types';
import CopyIcon from '../svgs/CopyIcon';

interface UserFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  institutionName?: string;
  graphAccess?: string;
}
export interface CreateUserPayload extends Omit<User, 'id'> {
  password: string;
}

interface UserFormProps {
  user?: User;
  onSubmit: (user: User | CreateUserPayload) => Promise<void>;
  onCancel: () => void;
  generatePassword: (password: string) => Promise<void>;
  availableGraphs: string[];
}
const defaultFormData: Omit<User, 'id'> = {
  email: '',
  firstName: '',
  lastName: '',
  role: 'USER',
  institutionName: '',
  graphAccess: [],
};

const UserForm = ({ user, onSubmit, onCancel, generatePassword, availableGraphs }: UserFormProps) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>(defaultFormData);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        institutionName: user.institutionName,
        graphAccess: [...user.graphAccess],
      });
      setPassword('');
    } else {
      setFormData(defaultFormData);
      // Generate initial password for new users
      setPassword(generatePasswordString());
    }
  }, [user]);

  const handleInputChange = (field: keyof Omit<User, 'id' | 'graphAccess'>, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof UserFormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const handleRoleChange = (role: 'ADMIN' | 'USER') => {
    setFormData({ ...formData, role });
  };

  const toggleGraphAccess = (graph: string) => {
    const updatedAccess = formData.graphAccess.includes(graph)
      ? formData.graphAccess.filter((g) => g !== graph)
      : [...formData.graphAccess, graph];

    setFormData({ ...formData, graphAccess: updatedAccess });
    if (errors.graphAccess) {
      setErrors({ ...errors, graphAccess: undefined });
    }
  };

  const generateNewPassword = async () => {
    const passwordString = generatePasswordString();
    await generatePassword(passwordString);
    setPassword(passwordString);
  };

  const copyPasswordToClipboard = () => {
    void navigator.clipboard.writeText(password);
  };

  const validateForm = (): boolean => {
    const newErrors: UserFormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 3 || formData.firstName.length > 20) {
      newErrors.firstName = 'First name must be between 3 and 20 characters';
    } else if (/\s/.test(formData.firstName)) {
      newErrors.firstName = 'First name cannot contain spaces';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 3 || formData.lastName.length > 20) {
      newErrors.lastName = 'Last name must be between 3 and 20 characters';
    } else if (/\s/.test(formData.lastName)) {
      newErrors.lastName = 'Last name cannot contain spaces';
    }

    if (!formData.institutionName) {
      newErrors.institutionName = 'Institution name is required';
    } else if (formData.institutionName.length > 20) {
      newErrors.institutionName = 'Institution name cannot be more than 20 characters';
    }

    if (formData.graphAccess.length === 0) {
      newErrors.graphAccess = 'At least one graph must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (user) {
      // For updating existing user - include ID but no password
      await onSubmit({ ...formData, id: user.id });
    } else {
      // For creating new user - include password but no ID
      await onSubmit({ ...formData, password });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          error={errors.email}
        />

        <TextField
          label="First Name"
          value={formData.firstName}
          onChange={(value) => handleInputChange('firstName', value)}
          error={errors.firstName}
        />

        <TextField
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => handleInputChange('lastName', value)}
          error={errors.lastName}
        />

        <TextField
          label="Institution Name"
          value={formData.institutionName}
          onChange={(value) => handleInputChange('institutionName', value)}
          error={errors.institutionName}
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Role</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-deep-purple"
              checked={formData.role === 'USER'}
              onChange={() => handleRoleChange('USER')}
            />
            <span className="ml-2">User</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio h-4 w-4 text-deep-purple"
              checked={formData.role === 'ADMIN'}
              onChange={() => handleRoleChange('ADMIN')}
            />
            <span className="ml-2">Admin</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Graph Access</label>
        <div className="flex flex-wrap gap-3">
          {availableGraphs.map((graph) => (
            <label key={graph} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-deep-purple"
                checked={formData.graphAccess.includes(graph)}
                onChange={() => toggleGraphAccess(graph)}
              />
              <span className="ml-2 capitalize">{graph}</span>
            </label>
          ))}
        </div>
        {errors.graphAccess && <p className="text-red-500 text-sm">{errors.graphAccess}</p>}
      </div>

      <div className="border-t border-gray-200 pt-4 mt-4">
        <label className="block text-gray-700 mb-2">{user ? 'Reset Password' : 'Password'}</label>
        <div className="flex items-center gap-2">
          {user && (
            <button
              type="button"
              onClick={() => void generateNewPassword()}
              className="bg-yellow-500 px-3 text-white py-2 rounded-md hover:bg-yellow-600 button-scale-5"
            >
              Generate New Password
            </button>
          )}

          {password && (
            <>
              <button
                type="button"
                title="copy"
                onClick={copyPasswordToClipboard}
                className="flex items-center gap-2 text-gray-600 font-bold button-neutral px-3 py-2 button-scale-5 font-mono"
              >
                <CopyIcon />
                <span>{password}</span>
              </button>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {user
            ? 'This will generate a new password. The password will only be shown once.'
            : 'Please copy the password before creating the user.'}
        </p>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 button-neutral button-scale-5">
          Cancel
        </button>
        <button type="button" onClick={() => void handleSubmit()} className="px-4 py-2 button-primary button-scale-5">
          {user ? 'Update User' : 'Create User'}
        </button>
      </div>
    </div>
  );
};

export default UserForm;

const generatePasswordString = (length = 12) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{}';
  const all = lowercase + uppercase + digits + symbols;

  // Ensure at least one of each type
  const mustHave = [
    lowercase[Math.floor(Math.random() * lowercase.length)],
    uppercase[Math.floor(Math.random() * uppercase.length)],
    digits[Math.floor(Math.random() * digits.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  // Fill the rest of the password
  for (let i = mustHave.length; i < length; i++) {
    mustHave.push(all[Math.floor(Math.random() * all.length)]);
  }

  // Shuffle the result to avoid predictable positions
  for (let i = mustHave.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mustHave[i], mustHave[j]] = [mustHave[j], mustHave[i]];
  }

  return mustHave.join('');
};

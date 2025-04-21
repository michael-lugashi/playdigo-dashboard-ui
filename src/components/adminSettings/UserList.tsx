import { User } from '../../services/playdigoClient.types';

interface UserListProps {
  users: User[];
  onEditUser: (user: User) => void;
  searchQuery: string;
}

const highlightText = (text: string, searchQuery: string) => {
  if (!searchQuery) return text;

  const regex = new RegExp(`(${searchQuery})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      // eslint-disable-next-line react-x/no-array-index-key
      <span key={i} className="bg-yellow-200">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const UserList = ({ users, onEditUser, searchQuery }: UserListProps) => {
  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;

    const searchLower = searchQuery.toLowerCase();
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const role = user.role.toLowerCase();
    const institution = user.institutionName.toLowerCase();
    const graphAccess = user.graphAccess.join(' ').toLowerCase();

    return (
      fullName.includes(searchLower) ||
      email.includes(searchLower) ||
      role.includes(searchLower) ||
      institution.includes(searchLower) ||
      graphAccess.includes(searchLower)
    );
  });

  if (filteredUsers.length === 0 && searchQuery) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No users match your search criteria.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {['Name', 'Email', 'Role', 'Institution', 'Graph Access', 'Actions'].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-cyan-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {highlightText(`${user.firstName} ${user.lastName}`, searchQuery)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{highlightText(user.email, searchQuery)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}
                >
                  {highlightText(user.role, searchQuery)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{highlightText(user.institutionName, searchQuery)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {user.graphAccess.map((access) => (
                    <span key={access} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {highlightText(access, searchQuery)}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEditUser(user)}
                  className="text-cyan rounded-lg px-2 hover:scale-110 focus:scale-90 hover:bg-gray-200  mr-3 cursor-pointer"
                  type="button"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

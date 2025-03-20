interface TextFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void; // Function to update state in parent
}

export default function TextField({ label, type = 'text', placeholder = '', value, onChange }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:border-deep-purple focus:outline-none focus:ring-deep-purple"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

interface TextFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void; // Function to update state in parent
  error?: string;
}

export default function TextField({ label, type = 'text', placeholder = '', value, onChange, error }: TextFieldProps) {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        className={`w-full p-3 border rounded-lg focus:ring focus:border-deep-purple focus:outline-none focus:ring-deep-purple ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <div className="absolute -bottom-5 left-0 text-sm text-red-500">{error}</div>}
    </div>
  );
}

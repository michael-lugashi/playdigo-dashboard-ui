interface TableHeadProps {
  headers: string[];
}

const TableHead: React.FC<TableHeadProps> = ({ headers }) => (
  <thead className="text-left bg-gray-100">
    <tr>
      {headers.map((header) => (
        <th key={header} className="px-4 py-2 whitespace-nowrap">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHead;

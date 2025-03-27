interface TableHeadProps {
  headers: string[];
  sortByHeader: number;
  sortDirection: 'asc' | 'desc';
  setSortByHeader: React.Dispatch<React.SetStateAction<number>>;
  setSortDirection: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}

const TableHead: React.FC<TableHeadProps> = ({
  headers,
  sortByHeader,
  sortDirection,
  setSortByHeader,
  setSortDirection,
}) => {
  const onClick = (i: number) => {
    setSortDirection((prev: 'asc' | 'desc') => {
      if (i === sortByHeader) {
        return prev === 'asc' ? 'desc' : 'asc';
      }
      return 'asc';
    });
    setSortByHeader(i);
  };

  return (
    <thead className="text-left bg-gray-100">
      <tr>
        {headers.map((header, i) => (
          <th
            key={header}
            className="px-4 py-2 whitespace-nowrap hover:cursor-pointer hover:bg-gray-300 transition-transform duration-150 active:scale-95"
            onClick={() => onClick(i)}
          >
            <span className="relative">
              {header}
              {i === sortByHeader && (
                <span className="absolute -right-2.5 -top-1.5 text-cyan-400 text-xl">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;

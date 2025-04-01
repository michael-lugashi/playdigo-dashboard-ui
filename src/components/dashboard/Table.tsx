import { useState } from 'react';
import TableHead from './TableHead';

interface TableProps {
  headers: string[];
  tableData: string[][];
}

const Table: React.FC<TableProps> = ({ headers, tableData }) => {
  const [sortByHeader, setSortByHeader] = useState<number>(0);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const sortedTableData = [...tableData].sort((a, b) => {
    const valueA = Number(a[sortByHeader].replace(/[,$\-%]/g, ''));
    const valueB = Number(b[sortByHeader].replace(/[,$\-%]/g, ''));
    return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
  });

  return (
    <div className="scrollbar-thin overflow-x-auto max-h-[500px] widget-box w-full">
      <table className="min-w-full text-sm">
        <TableHead
          headers={headers}
          sortByHeader={sortByHeader}
          sortDirection={sortDirection}
          setSortByHeader={setSortByHeader}
          setSortDirection={setSortDirection}
        />
        <tbody>
          {sortedTableData.map((rowData, i) => (
            <tr key={rowData[0]} className={`hover:bg-cyan-100 ${i % 2 ? 'bg-dark-white' : 'bg-white'}`}>
              {rowData.map((text) => (
                <td key={text} className="px-4 py-2 whitespace-nowrap">
                  {text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

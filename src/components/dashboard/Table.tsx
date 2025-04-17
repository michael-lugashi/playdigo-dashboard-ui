import { useState } from 'react';
import TableHead from './TableHead';
import { TableDataRow } from '../../services/playdigoClient.types';

interface TableProps {
  headers: string[];
  tableData: TableDataRow[];
}

const Table: React.FC<TableProps> = ({ headers, tableData }) => {
  const [sortByHeader, setSortByHeader] = useState<number>(0);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedTableData = [...tableData].sort((a, b) => {
    const [valueA, valueB] = [a[sortByHeader].value, b[sortByHeader].value];
    return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
  });

  return (
    <div
      className={`scrollbar-thin overflow-x-auto ${tableData.length >= 7 ? 'min-h-60' : 'min-h-18'} widget-box w-full`}
    >
      <table className="min-w-full text-sm ">
        <TableHead
          headers={headers}
          sortByHeader={sortByHeader}
          sortDirection={sortDirection}
          setSortByHeader={setSortByHeader}
          setSortDirection={setSortDirection}
        />
        <tbody>
          {sortedTableData.map((rowData, i) => (
            <tr key={rowData[0].formatted} className={`hover:bg-cyan-100 ${i % 2 ? 'bg-dark-white' : 'bg-white'}`}>
              {rowData.map((text) => (
                <td key={text.formatted} className="px-4 py-2 whitespace-nowrap">
                  {text.formatted}
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

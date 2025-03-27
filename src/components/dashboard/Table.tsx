import React from 'react';
import TableHead from './TableHead';

interface TableProps {
  headers: string[];
  tableData: string[][];
}

const Table: React.FC<TableProps> = ({ headers, tableData }) => (
  <div className="scrollbar-thin overflow-x-auto max-h-[500px] widget-box w-full">
    <table className="min-w-full text-sm">
      <TableHead headers={headers} />
      <tbody>
        {tableData.map((rowData, i) => (
          <tr className={`hover:bg-cyan-100 ${i % 2 ? 'bg-dark-white' : 'bg-white'}`}>
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

export default Table;

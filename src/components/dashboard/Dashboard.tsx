import { useEffect, useState } from 'react';
import { getPlaydigoDashboardData } from '../../services/playdigoClient';
import { GraphDataPoint, TableDataRow } from '../../services/playdigoClient.types';
import Table from './Table';
import Chart from './Chart';
import TimeFrame from './TimeFrame';
import Totals from './Totals';
import Banner from './Banner';
import ErrorDisplay from './ErrorDisplay';
import Popup from '../general/Popup';

interface TotalsData {
  spend: string;
  impressions: string;
  clicks: string;
}

function Dashboard() {
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [graphData, setGraphData] = useState<GraphDataPoint[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [displayErrorPopup, setDisplayErrorPopup] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(7);
  const displayGraphData = graphData.slice(Math.max(0, graphData.length - selectedTimeFrame), graphData.length);
  const displayTableData = tableData.slice(Math.max(0, tableData.length - selectedTimeFrame), tableData.length);
  const calculatedTotals = calculateTotals(displayGraphData, displayTableData);
  const lastUpdated = graphData.length ? new Date(graphData[graphData.length - 1]?.date).toLocaleDateString() : null;

  const fetchDashboardData = async () => {
    try {
      const { tableData: td, graphData, headers } = await getPlaydigoDashboardData();
      setTableData(td);
      setGraphData(graphData);
      setHeaders(headers);
    } catch {
      setDisplayErrorPopup(true);
    }
  };

  useEffect(() => {
    void fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-dark-white flex flex-col items-center p-2">
      <div className="w-full max-w-[1500px] flex flex-col gap-2 items-center">
        <Popup isOpen={displayErrorPopup} isCloseOnBackDropClick={true} onClose={() => setDisplayErrorPopup(false)}>
          <ErrorDisplay />
        </Popup>
        <Banner lastUpdated={lastUpdated} onRefresh={() => void fetchDashboardData()} />
        <TimeFrame setSelectedTimeFrame={setSelectedTimeFrame} />
        <Totals totals={calculatedTotals} />
        <Chart graphData={displayGraphData} />
        <Table tableData={displayTableData} headers={headers} />
      </div>
    </div>
  );
}

const calculateTotals = (graphData: GraphDataPoint[], tableData: TableDataRow[]): TotalsData => {
  const totals = graphData.reduce(
    (acc: { spend: number; impressions: number; clicks: number }, curr: GraphDataPoint) => {
      return {
        spend: acc.spend + curr.spend,
        impressions: acc.impressions + curr.impressions,
        clicks: acc.clicks,
      };
    },
    { spend: 0, impressions: 0, clicks: 0 }
  );

  // Calculate clicks from table data
  totals.clicks = tableData.reduce((acc: number, curr: TableDataRow) => acc + Number(curr[3].replace(',', '')), 0);

  // Format the values
  return {
    spend: totals.spend.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
    impressions: totals.impressions.toLocaleString(),
    clicks: totals.clicks.toLocaleString(),
  };
};

export default Dashboard;

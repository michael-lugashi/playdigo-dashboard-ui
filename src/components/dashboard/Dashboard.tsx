import { useEffect, useState } from 'react';
import { getPlaydigoDashboardData, getPlaydigoGraphOptions } from '../../services/playdigoClient';
import { GraphDataPoint, TableDataRow } from '../../services/playdigoClient.types';
import Table from './Table';
import Chart from './Chart';
import TimeFrame from './TimeFrame';
import Totals from './Totals';
import Banner from './Banner';
import ErrorDisplay from './ErrorDisplay';
import Popup from '../general/Popup';
import useAuth from '../../hooks/useAuth';

interface TotalsData {
  spend: string;
  impressions: string;
  clicks: string;
}

function Dashboard() {
  const { institutionName } = useAuth();
  const [graphOptions, setGraphOptions] = useState<string[]>([]);
  const [curGraphOption, setCurGraphOption] = useState<string>('');
  const [tableData, setTableData] = useState<TableDataRow[]>([]);
  const [graphData, setGraphData] = useState<GraphDataPoint[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [displayErrorPopup, setDisplayErrorPopup] = useState(false);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(7);
  const displayGraphData = graphData.slice(Math.max(0, graphData.length - selectedTimeFrame), graphData.length);
  const displayTableData = tableData.slice(Math.max(0, tableData.length - selectedTimeFrame), tableData.length);
  const calculatedTotals = calculateTotals(displayTableData);
  const lastUpdated = graphData.length ? new Date(graphData[graphData.length - 1]?.date).toLocaleDateString() : null;

  const fetchDashboardData = async (graphOption: string) => {
    try {
      const { tableData: td, graphData, headers } = await getPlaydigoDashboardData(graphOption);
      setTableData(td);
      setGraphData(graphData);
      setHeaders(headers);
    } catch {
      setDisplayErrorPopup(true);
    }
  };

  useEffect(() => {
    void (async () => {
      try {
        const graphOptions = await getPlaydigoGraphOptions();
        setGraphOptions(graphOptions);
        setCurGraphOption(graphOptions[0]);
        await fetchDashboardData(graphOptions[0]);
      } catch {
        setDisplayErrorPopup(true);
      }
    })();
  }, []);

  return (
    <div className="bg-dark-white last:flex-nowrap h-screen p-2 w-full flex flex-col gap-2 ">
      <Popup isOpen={displayErrorPopup} isCloseOnBackDropClick={true} onClose={() => setDisplayErrorPopup(false)}>
        <ErrorDisplay onClose={() => setDisplayErrorPopup(false)} />
      </Popup>
      <Banner
        graphOptions={graphOptions}
        curGraphOption={curGraphOption}
        setCurGraphOption={setCurGraphOption}
        institutionName={institutionName}
        lastUpdated={lastUpdated}
        fetchDashboardData={fetchDashboardData}
      />

      <TimeFrame setSelectedTimeFrame={setSelectedTimeFrame} />
      <Totals totals={calculatedTotals} />
      <Chart graphData={displayGraphData} />
      <Table tableData={displayTableData} headers={headers} />
    </div>
  );
}

const calculateTotals = (tableData: TableDataRow[]): TotalsData => {
  const totals = tableData.reduce(
    (acc: { spend: number; impressions: number; clicks: number }, curr: TableDataRow) => {
      return {
        spend: acc.spend + curr[1].value,
        impressions: acc.impressions + curr[2].value,
        clicks: acc.clicks + curr[3].value,
      };
    },
    { spend: 0, impressions: 0, clicks: 0 }
  );

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

interface TotalsData {
  spend: string;
  impressions: string;
  clicks: string;
  [key: string]: string;
}

interface TotalsProps {
  totals: TotalsData;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const Totals: React.FC<TotalsProps> = ({ totals }) => {
  return (
    <div className="flex flex-row w-full gap-2">
      {Object.entries(totals).map(([category, value]) => (
        <div key={category} className="flex flex-col justify-evenly widget-box flex-1 pl-4 p-2">
          <h3 className="text-sm mb-1">{capitalize(category)}</h3>
          <p className="text-sm font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Totals;

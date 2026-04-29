import FarmFinanceBoxes from "./FarmFinanceBoxes";
import FinanceOverview from "./FinanceOverview";

export default function FarmFinance() {
  return (
    <div className="pt-4">
      <FarmFinanceBoxes />

      <FinanceOverview />
    </div>
  );
}

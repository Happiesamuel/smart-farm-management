import BothPagination from "./BothPagination";
import BothTableHeader from "./BothTableHeader";
import ExpenseTable from "./ExpenseTable";
import SalesTable from "./SalesTable";

export default function BothTable({
  arrayOne,
  type,
}: {
  arrayOne: string[];
  type: string;
}) {
  return (
    <div className=" relative h-[720px] sm:h-[630px] md:h-[590px] lg:h-[600px] xl:h-full">
      <BothTableHeader arrayOne={arrayOne} />

      {type === "sale" ? <SalesTable /> : <ExpenseTable />}
      <BothPagination type="expenses" />
    </div>
  );
}

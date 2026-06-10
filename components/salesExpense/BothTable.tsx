'use client'
import { useApp } from "@/stores/useAppStore";
import BothTableHeader from "./BothTableHeader";
import ExpenseTable from "./ExpenseTable";
import SalesTable from "./SalesTable";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { FormLoader, NoResult } from "../loader/GeneralLoader";

export default function BothTable({
  arrayOne,
  type,
}: {
  arrayOne: string[];
  type: string;
}) {


const {workspace,user,ready}=useApp()
const {farms,status,error} = useGetFarm(workspace?.id??null,user?.id??null)
if (!ready) return <div className="h-110"><FormLoader>Loading app...</FormLoader></div>;

if (!user || !workspace) return <div className="h-110"><NoResult>Unauthorised</NoResult></div>

const isLoading =
  status === "pending" 


if (isLoading) return <div className="h-110"><FormLoader>Loading sales data...</FormLoader></div>;

const errorMessage =
 error?.message 

if (errorMessage) return <div className="h-110"><NoResult>{errorMessage}</NoResult></div>;
if(!farms?.length) return <div className="h-110"><NoResult>Create a Farm to get started</NoResult></div>
  const newFarms = [{
      value: "all",
      name: "All Farms",
    },...farms?.map(x => {
    return  {
      value: x.farmName.split(' ').join('+'),
      name: x.farmName,
    }
  })??[]]
  

  return (
    <div className=" relative h-full md:h-[590px] lg:h-[600px] xl:h-full">
      <BothTableHeader farms={newFarms} arrayOne={arrayOne} />

      {type === "sale" ? <SalesTable type="sales"/> : <ExpenseTable type="expenses" />}
      
    </div>
  );
}

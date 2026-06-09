'use client'
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarmHarvest } from "@/hooks/harvest/useHarvest";
import { useGetFarmSales } from "@/hooks/sales/useSales";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";
export default function FinanceTopSelling() {

const {farmId}=useParams()
const {workspace,user,ready}=useApp()
const {sales,status,error} = useGetFarmSales(workspace?.id??null,user?.id??null,farmId as string)
const {crops,status:cropStat,error:cropErr} = useGetFarmCrops(workspace?.id??null,user?.id??null,farmId as string)
const {harvests,status:harStat,error:harErr} = useGetFarmHarvest(workspace?.id??null,user?.id??null,farmId as string)
if (!ready) return <div className="h-50"><FormLoader>Loading app...</FormLoader></div>;

if (!user || !workspace) return <div className="h-50"><NoResult>Unauthorised</NoResult></div>

const isLoading =
  status === "pending" ||
  cropStat === "pending"||harStat==='pending';

if (isLoading) return <div className="h-50"><FormLoader>Loading top sales...</FormLoader></div>;

const errorMessage =
 error?.message  || cropErr?.message||harErr?.message;

if (errorMessage) return <div className="h-50"><NoResult>{errorMessage}</NoResult></div>;

if (!sales?.length) return <div className="h-50"><NoResult>No sales found!</NoResult></div>;

const harvestMap = new Map(
  harvests?.map((h) => [h.$id, h]) ?? []
);

const cropMap = new Map(
  crops?.map((c) => [c.$id, c]) ?? []
);

const topSelling =
  Object.values(
    sales?.reduce((acc, sale) => {
      const harvest = harvestMap.get(sale.harvests); 
      if (!harvest) return acc;

      const crop = cropMap.get(harvest.crops); 
      if (!crop) return acc;

      const key = crop.cropName;

      if (!acc[key]) {
        acc[key] = {
          name: key,
          amount: 0,
        };
      }

      acc[key].amount += Number(sale.totalAmount || 0);

      return acc;
    }, {} as Record<string, { name: string; amount: number }>) ?? {}
  )
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
const tot = topSelling.map((t) => ({
  name: t.name,
  amount: `₦${t.amount.toLocaleString()}`,
}));
  return (
    <div className="space-y-3 max-h-60 pt-3 border-t border-border">
      <div className="flex items-center justify-between gap-3">
        <p className="text-dark text-sm font-semibold">Top Selling Crops</p>
      </div>
      <div className="space-y-2">
        {tot.map((t) => (
          <div
            className="flex border-b border-border pb-3 last:border-none items-center text-sm justify-between"
            key={t.name}
          >
            <p className="text-zinc-600">{t.name}</p>
            <p className={`text-dark/80 font-semibold`}>{t.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

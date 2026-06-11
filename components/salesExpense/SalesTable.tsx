'use client'
import { FaEye, FaEllipsisV } from "react-icons/fa";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useGetCrops,} from "@/hooks/crops/useCrops";
import {  useGetHarvest } from "@/hooks/harvest/useHarvest";
import {  useGetSales } from "@/hooks/sales/useSales";
import { useFinanceFilters } from "@/hooks/useFinanceFilters";
import { useApp } from "@/stores/useAppStore";
import {  usePathname, useSearchParams } from "next/navigation";
import { useGetFarm } from "@/hooks/farms/useFarm";
import BothPagination from "./BothPagination";

const paymentStyles: Record<string, string> = {
  Transfer: "bg-green-100 text-green-700",
  Cash: "bg-blue-100 text-blue-700",
  Card:'bg-purple-100 text-purple-700',
  'Mobile Money':'bg-amber-100 text-amber-700'
};

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Pending: "bg-amber-100 text-amber-700",
};

export default function SalesTable({type}:{type:string}) {

const searchParams = useSearchParams()
const {workspace,user,ready}=useApp()
const { filterByDate } = useFinanceFilters();
const {sales,status,error} = useGetSales(workspace?.id??null,user?.id??null)
const {farms,status:farmStat,error:farmErr} = useGetFarm(workspace?.id??null,user?.id??null)
const {harvests,status:harStat,error:harErr} = useGetHarvest(workspace?.id??null,user?.id??null)
const {crops,status:cropStat,error:cropErr} = useGetCrops(workspace?.id??null,user?.id??null)
  const pathname = usePathname();
const slug = pathname.split('/').at(3);
if (!ready) return <div className="h-110"><FormLoader>Loading app...</FormLoader></div>;

if (!user || !workspace) return <div className="h-110"><NoResult>Unauthorised</NoResult></div>

const isLoading =
  status === "pending" ||
  harStat === "pending" ||
  cropStat === "pending"||farmStat==='pending';

if (isLoading) return <div className="h-110"><FormLoader>Loading sales data...</FormLoader></div>;

const errorMessage =
 error?.message || harErr?.message || cropErr?.message||farmErr?.message;

if (errorMessage) return <div className="h-110"><NoResult>{errorMessage}</NoResult></div>;

if (!sales?.length) return <div className="h-110"><NoResult>No sales found!</NoResult></div>;



const harvestMap = new Map(
  harvests?.map((h) => [h.$id, h])
);

const cropMap = new Map(
  crops?.map((c) => [c.$id, c])
);
const farmMap = new Map(
  farms?.map((f) => [f.$id, f])
);

const salesArr =
  sales?.map((sale, index) => {
    const harvest = harvestMap.get(sale.harvests);
    const crop = cropMap.get(harvest?.crops);
    const farm = farmMap.get(sale?.farms);

    return {
   id: sale.$id? `INV-${sale.$id}` : `INV-${index + 1}`,

      date: new Date(sale.saleDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),

      crop: crop?.cropName ?? "Unknown Crop",
      
farm:farm?.farmName ?? "Unknown Farm",
      buyer: sale.buyer,

      quantity:sale.quantity ,
      unit:sale.unit,

      unitPrice: `₦${sale.unitPrice.toLocaleString()}`,

      total: `₦${sale.totalAmount.toLocaleString()}`,

      payment:
        sale.paymentMethod === "transfer"
          ? "Transfer":   sale.paymentMethod === "card" ?'Card':   sale.paymentMethod === "cash"?'Cash'
          : 'Mobile Money',

      status:
        sale.status === "completed" ? "Paid" :  sale.status === "cancelled" ? 'Cancelled' : "Pending",
    };
  }) ?? [];

const PAGE_SIZE = 10;
const currentPage = Number(searchParams.get(`${slug}Page`) || 1);
const filtered = filterByDate(salesArr ?? []);
const paginatedSales = filtered.slice(  
  (currentPage - 1) * PAGE_SIZE,
  currentPage * PAGE_SIZE,
);




  return (
    <>
    <div className="  overflow-hidden">
      {/* Desktop Table */}
      { !filtered.length   ? <div className="h-100"><NoResult>No sales found!</NoResult></div> : <> 
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">Date</th>
              <th className="py-2 truncate max-w-[50px] pl-1">Invoice No.</th>
              <th className="py-2 truncate max-w-[50px] px-4">Farm</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Crop</th>
              <th className="py-2 truncate max-w-[50px] pl-">Quantity</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Unit</th>
              <th className="py-2 truncate max-w-[50px] pr-2">Unit Price</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Amount</th>
              <th className="py-2 truncate max-w-[50px] pl-2">
                Payment Method
              </th>
              <th className="py-2 truncate max-w-[50px] pl-5">Status</th>
              <th className="py-2 truncate max-w-[50px] px-2 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedSales.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td
                  title={s.date}
                  className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                >
                  {s.date}
                </td>

                <td
                  title={` ${s.id}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-1 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.id}
                </td>
                <td
                  title={s.farm}
                  className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                >
                  {s.farm}
                </td>
                <td
                  title={` ${s.crop}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.crop}
                </td>

                <td
                  title={s.quantity}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                >
                  {s.quantity}
                </td>
                <td
                  title={s.unit}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                >
                  {s.unit}
                </td>
                <td
                  title={s.unitPrice}
                  className="py-3 truncate font-semibold max-w-[70px] pl-4 pr-2 text-[13px] text-zinc-600"
                >
                  {s.unitPrice}
                </td>
                <td
                  title={s.total}
                  className="py-3 truncate font-semibold max-w-[70px] pl-2 text-[13px] text-zinc-600 "
                >
                  {s.total}
                </td>

                <td
                  title={s.payment}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${paymentStyles[s.payment]}`}
                  >
                    {s.payment}
                  </span>
                </td>

                <td
                  title={s.status}
                  className="py-3 truncate font-medium max-w-[70px] pl-4 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="py-3 px-2 truncate font-medium max-w-[70px] px- text-[13px] text-zinc-600 text-right">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <FaEye className="cursor-pointer hover:text-black" />
                    <FaEllipsisV className="cursor-pointer hover:text-black" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3 p-4">
        {paginatedSales.map((s) => (
          <div key={s.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">{s.date}</span>
              <span
                className={`text-[13px] px-2 py-1 rounded-md ${statusStyles[s.status]}`}
              >
                {s.status}
              </span>
            </div>

            <div className="flex items-center gap-2 font-medium mt-2">
             {s.crop}
            </div>

            <p className="text-sm mt-1">{s.farm}</p>

<div className="flex items-center gap-3">
              <div className="text-[13px] text-gray-600 mt-2">Qty: {s.quantity}</div>

            <div className="text-[13px] text-gray-600">Unit: {s.unitPrice}</div>
</div>

  <div className="flex items-center gap-3">
              <div className="font-semibold mt-2">{s.total}</div>

            <div className="mt-2">
              <span
                className={`text-[13px] px-2 py-1 rounded-md ${paymentStyles[s.payment]}`}
              >
                {s.payment}
              </span>
            </div>
  </div>
          </div>
        ))}
      </div></>}
    </div>
    <BothPagination type={type} total={filtered.length} pageSize={PAGE_SIZE} pageKey={`${slug}Page`} />
    </>
  );
}

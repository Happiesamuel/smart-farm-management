"use client";
import BothCalendar from "./BothCalender";
import { Button } from "../ui/button";
import BothComboBox from "./BothComboBox";
import BothSelect from "./BothSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BothTableHeader({ arrayOne,farms }: { arrayOne: string[] ,farms:{name:string,value:string}[]}) {

  const pathname = usePathname();
  const slug = pathname.split('/').at(3);
      const searchParams = useSearchParams();
    const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex  md:flex items-center gap-2 lg:gap-4 p-2.5  justify-between w-full">

      <BothSelect array={farms} type={`${slug}Page`} />
      <BothComboBox
        slug={slug!}
        array={arrayOne}
        placeholder1={`Search or select ${slug === "sales" ? "crops" : "categories"}...`}
        placeholder2={`Search ${slug === "sales" ? "crops" : "categories"}`}
      />
            {(searchParams.get("from") || searchParams.get("to")) && (
        <Button
          variant="outline"
          className="text-red-500 rounded border-red-200 w-full sm:w-fit"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("from");
            params.delete("to");
            router.push(`?${params.toString()}`);
          }}
        >
          Clear dates
        </Button>
      )}
      <BothCalendar type={`${slug}Page`}/>
    </div>
  );
}

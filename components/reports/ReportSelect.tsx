import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams, useRouter } from "next/navigation";
export default function ReportSelect({
  array,
}: {
  array: { [key: string]: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const farm = searchParams.get("farm") || "all";

  function handleChange(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "all") {
      params.set("farm", val);
    } else {
      params.delete("farm");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <Select value={farm} onValueChange={handleChange}>
      <SelectTrigger className="text-dark w-full md:w-full border border-border bg-white rounded-lg">
        <SelectValue placeholder="All Farms" />
      </SelectTrigger>
      <SelectContent className="bg-white max-h-[200px]! mt-6 border-border text-zinc-400">
        {array.map((x) => (
          <SelectItem
            key={x.value}
            value={x.value.toString()}
            className="hover:bg-zinc-900 text-dark/90 transition-all duration-500 cursor-pointer"
          >
            {x.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

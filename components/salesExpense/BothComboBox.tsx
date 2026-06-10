"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IoIosArrowDown } from "react-icons/io";
import { Check, Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function BothComboBox({
  placeholder1,
  placeholder2,
  array,
  slug,
}: {
  placeholder1: string;
  placeholder2: string;
  slug: string;
  array: string[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [extraItems, setExtraItems] = useState<string[]>([]); // 👈 user-added items

  const paramKey = slug === "sales" ? "crop" : "category";
  const selected = searchParams.get(paramKey) || "";
  const label = selected || `All ${slug === "sales" ? "Crops" : "Categories"}`;

  const allItems = [...array, ...extraItems];

  function handleSelect(val: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== selected) {
      params.set(paramKey, val);
    } else {
      params.delete(paramKey);
    }
    params.set(`${slug}Page`, "1");
    router.push(`?${params.toString()}`);
    setOpen(false);
    setInputValue("");
  }

  function handleAdd() {
    if (!inputValue.trim()) return;
    const trimmed = inputValue.trim();
    if (!allItems.includes(trimmed)) {
      setExtraItems((prev) => [...prev, trimmed]); // 👈 add to local list
    }
    handleSelect(trimmed); // 👈 also select it immediately
  }

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full md:w-full justify-between text-sm",
              !selected && "text-dark/80",
            )}
          >
            <div className="flex items-center gap-2">{label}</div>
            <IoIosArrowDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={placeholder2}
              value={inputValue}
              onValueChange={setInputValue}
            />

            <CommandEmpty>
              {inputValue.trim() ? (
                <div
                  className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent"
                  onClick={handleAdd}
                >
                  <Plus className="w-4 h-4" />
                  Add &quot;{inputValue}&quot;
                </div>
              ) : (
                <p className="px-3 py-2 text-sm text-zinc-400">
                  No results found.
                </p>
              )}
            </CommandEmpty>

            <CommandGroup className="max-h-[200px] overflow-scroll no-scroll">
              {allItems
                .filter((item) =>
                  item.toLowerCase().includes(inputValue.toLowerCase()),
                )
                .map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    className="pr-2 hover:bg-primary-green hover:text-white cursor-pointer"
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected === item ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item}
                    {extraItems.includes(item) && ( // 👈 badge for user-added items
                      <span className="ml-auto text-xs text-zinc-400">
                        custom
                      </span>
                    )}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
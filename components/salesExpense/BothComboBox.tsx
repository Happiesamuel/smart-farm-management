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
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCombo, setSelectedCombo] = useState(
    `All ${slug === "sales" ? "Crops" : "Categories"}`,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-[140px] justify-between text-sm",
            !selectedCombo && "text-dark/80",
          )}
        >
          <div className="flex items-center gap-2">
            {(selectedCombo as string) || (placeholder1 as string)}
          </div>
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
            <div
              className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-accent"
              onClick={() => {
                setSelectedCombo(inputValue);
                setOpen(false);
              }}
            >
              <Plus className="w-4 h-4" />
              Add &quot;{inputValue}&quot;
            </div>
          </CommandEmpty>

          <CommandGroup className="max-h-[200px] overflow-scroll no-scroll">
            {array
              .filter((crop) =>
                crop.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .map((crop) => (
                <CommandItem
                  key={crop}
                  value={crop}
                  className="pr-2 hover:bg-primary-green hover:text-white cursor-pointer"
                  onSelect={() => {
                    setSelectedCombo(crop);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCombo === crop ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {crop}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type Option = {
  label: string;
  value: number;
};

type ComboboxProps = {
  options: Array<Option>;
  selected: Option | null;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function Combobox({
  options,
  selected,
  onChange,
  placeholder,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("justify-between h-10 w-full", {
            "text-slate-500 font-normal": !selected,
            "bg-gray-100 border-gray-200 cursor-not-allowed opacity-75 !pointer-events-auto":
              disabled,
          })}
        >
          {selected
            ? options.find((option) => option?.value === selected.value)?.label
            : placeholder || "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder || "Select option..."} />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={option?.value}
                  value={option?.label}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option?.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected?.value === option?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

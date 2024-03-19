import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from "dayjs";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [openModal, setOpenModal] = React.useState(false);

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <Popover open={openModal} onOpenChange={toggleModal}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            dayjs(value).format("MMMM D, YYYY")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={(date) => {
            if (date) onChange(date.toISOString());
            toggleModal();
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

import React from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import { Input } from "./input";

type InputSearchProps = Omit<React.ComponentProps<typeof Input>, "type">;

export const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (props: InputSearchProps, ref) => {
    const size = props.size ? props.size : "md";
    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        leftIcon={
          <MagnifyingGlassIcon
            className={cn({
              "h-3.5 w-3.5": size === "sm",
              "h-4 w-4": size === "md",
              "h-5 w-5": size === "lg",
              "h-6 w-6": size === "xl",
            })}
          ></MagnifyingGlassIcon>
        }
      ></Input>
    );
  }
);

InputSearch.displayName = "InputSearch";

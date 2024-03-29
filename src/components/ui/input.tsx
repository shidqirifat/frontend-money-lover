import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  /** @default "md" */
  size?: "sm" | "md" | "lg" | "xl";

  /** @default "solid" */
  variant?: "filled" | "outline";

  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  /** @default false */
  error?: boolean;
};

export const InputGroupCtx = createContext(false);

function DefaultContainer({ children }: { children: React.ReactNode }) {
  return <div className="relative flex w-max">{children}</div>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      error,
      disabled,
      leftIcon,
      rightIcon,
      size = "md",
      variant = "outline",
      ...props
    },
    ref
  ) {
    const isGroup = useContext(InputGroupCtx);
    const Root = isGroup ? React.Fragment : DefaultContainer;
    return (
      <Root>
        {leftIcon ? (
          <div className="leading-1 absolute left-0 top-0 z-10 flex h-full items-center justify-center px-2 text-gray-600">
            {leftIcon}
          </div>
        ) : null}

        <input
          {...props}
          data-error={error}
          ref={ref}
          disabled={disabled}
          className={cn(
            // base style
            "placeholder:text-slate-500",
            "form-input w-full rounded-md text-gray-800",
            "focus:border-primary-500 focus:outline-none focus:ring-primary-500 focus:ring-opacity-25",

            //type="file"
            "!py-0 file:-ml-3 file:mr-3 file:h-full",
            "file:px-4 file:py-2",
            "file:font-medium file:leading-none file:text-gray-700",
            "file:border-0 file:bg-gray-100 file:ring-1 file:ring-gray-300 ",
            // variant style
            {
              "border-0 bg-gray-100 focus:border focus:ring-2":
                variant === "filled",
              "bg-white-100 border border-gray-200 focus:ring-2 shadow-sm":
                variant === "outline",
              "cursor-not-allowed bg-gray-100 opacity-75": disabled,
            },

            "data-[error=true]:border data-[error=true]:border-danger-500 data-[error=true]:focus:ring-danger-500 data-[error=true]:focus:ring-opacity-25",

            //size style
            {
              "h-8 text-sm file:text-sm": size === "sm",
              "h-10 text-base file:text-base": size === "md",
              "h-12 text-lg file:text-lg": size === "lg",
              "h-14 text-xl file:text-xl": size === "xl",
            },
            {
              //add padding to left side when leftIcon is true
              "pl-3": !leftIcon,

              "pl-6": size === "sm" && leftIcon,
              "pl-7": size === "md" && leftIcon,
              "pl-9": size === "lg" && leftIcon,
              "pl-10": size === "xl" && leftIcon,

              //add padding to right side when rightIcon is true
              "pr-3": !leftIcon,
              "pr-8": size === "sm" && rightIcon,
              "pr-9": size === "md" && rightIcon,
              "pr-10": size === "lg" && rightIcon,
              "pr-11": size === "xl" && rightIcon,
            },
            // group
            "group-[.is-group]:focus:z-10",
            "group-[.is-group]:first:!rounded-r-none",
            "group-[.is-group]:[&:not(:first-child):not(:last-child)]:!rounded-none",
            "group-[.is-group]:last:!rounded-l-none",

            props.className
          )}
        />

        {rightIcon ? (
          <div className="leading-1 absolute right-0 top-0 z-10 flex h-full items-center justify-center px-2 text-gray-600">
            {rightIcon}
          </div>
        ) : null}
      </Root>
    );
  }
);

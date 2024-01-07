import * as React from "react";

import { cn } from "@/lib/utils";
import { Card } from "./card";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  additionalContent?: React.ReactNode;
  label?: string;
  textarea?: boolean;
}

const Input = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(({ className, textarea, type, value, id, ...props }, ref) => {
  if (textarea === true) {
    return (
      <textarea
        className={cn(
          "flex h-10 w-full rounded-md text-sm bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        value={value}
        id={id}
      />
    );
  } else {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md text-sm bg-transparent ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={value}
        id={id}
        ref={ref as React.Ref<HTMLInputElement>}
        {...props}
      />
    );
  }
});
Input.displayName = "Input";

const ExpandedInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, additionalContent, label, textarea, id, ...props },
    ref
  ) => {
    return (
      <Card className="flex items-center rounded-[16px] ring-offset-background has-[:focus-visible]: has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2">
        <div className="flex flex-col flex-1">
          {label && (
            <label htmlFor={id} className="text-xl px-3 pt-2">
              {label}
            </label>
          )}
          <Input
            id={id}
            type={type}
            className={cn(
              "p-0 px-3 pb-2 h-min focus-visible:ring-0 focus-visible:ring-offset-0 text-lg",
              className
            )}
            textarea={textarea}
            {...props}
          />
        </div>
        {additionalContent && (
          <div className="flex gap-2 px-3">{additionalContent}</div>
        )}
      </Card>
    );
  }
);
ExpandedInput.displayName = "ExpandedInput";


export { ExpandedInput, Input };


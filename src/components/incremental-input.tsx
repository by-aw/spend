"use client";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface IncrementalInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onIncrement: () => void;
  onDecrement: () => void;
}

function IncrementalInput({
  onIncrement,
  onDecrement,
  value,
  ...rest
}: IncrementalInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={onIncrement}
        className="rounded-[8px] "
        variant={"outline"}
      >
        <CaretUp size={28} />
      </Button>
      <Input
        value={value}
        className="text-lg text-center rounded-[8px] bg-secondary w-full"
        {...rest}
      />
      <Button
        onClick={onDecrement}
        className="rounded-[8px] "
        variant={"outline"}
      >
        <CaretDown size={28} />
      </Button>
    </div>
  );
}

export default IncrementalInput;

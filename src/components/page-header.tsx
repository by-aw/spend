"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Gear } from "@phosphor-icons/react";

function PageHeader() {
  return (
    <header className="flex justify-between items-center">
      <Button variant={"icon"} size={"icon"}>
        <ArrowUp size={32} fill="hsl(var(--foreground))" />
      </Button>
      <h1 className="text-[28px] font-bold text-center">
        January
      </h1>
      <Button variant={"icon"} size={"icon"}>
        <Gear size={32} fill="hsl(var(--foreground))" />
      </Button>
    </header>
  );
}

export default PageHeader;

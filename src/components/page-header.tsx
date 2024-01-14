"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Gear } from "@phosphor-icons/react";

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  onTimelineBack: () => void;
  onTimelineForward: () => void;
  displayBack: boolean;
};

function PageHeader({
  title,
  subtitle,
  onTimelineBack,
  onTimelineForward,
  displayBack,
}: PageHeaderProps) {
  return (
    <header className="flex justify-between items-center relative">
      <div className="flex gap-2">
        <Button onClick={onTimelineBack} variant={"icon"} size={"icon"}>
          <ArrowUp size={32} fill="hsl(var(--foreground))" />
        </Button>
        {displayBack && (
          <Button onClick={onTimelineForward} variant={"icon"} size={"icon"}>
            <ArrowDown size={32} fill="hsl(var(--foreground))" />
          </Button>
        )}
      </div>
      <span className="fixed flex flex-col left-[50%] translate-x-[-50%] items-center">
        <h1 className="text-[28px] font-bold text-center">
          {title}
        </h1>
        <h2 className="text-lg font-medium opacity-60">{subtitle}</h2>
      </span>
      <Button variant={"icon"} size={"icon"}>
        <Gear size={32} fill="hsl(var(--foreground))" />
      </Button>
    </header>
  );
}

export default PageHeader;

"use client";

import ExpenseButton from "@/components/expense-button";
import HomeEmptyState from "@/components/home-empty-state";
import NewExpenseDrawer from "@/components/new-expense-drawer";
import PageHeader from "@/components/page-header";
import Swipeable from "@/components/swipeable";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import {
  AnimatePresence,
  PanInfo,
  motion,
  useAnimate,
  useInView,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const variants = {
  visible: { opacity: 1, y: "0%" },
  swipedDown: { opacity: 0, y: "100%" },
  swipedUp: { opacity: 0, y: "-100%" },
};

export default function Home({ params }: { params: { id: string } }) {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const dateCurrentTime = new Date(currentTime);
  const expenses = useLiveQuery(
    () =>
      db.expenses
        .filter(
          (expense) =>
            new Date(expense.time).getFullYear() ==
              dateCurrentTime.getFullYear() &&
            new Date(expense.time).getMonth() == dateCurrentTime.getMonth()
        )
        .toArray(),
    [currentTime]
  );
  function handleTimelineBack() {
    setCurrentTime(currentTime - 1000 * 60 * 60 * 24 * 30);
  }
  function handleTimelineForward() {
    setCurrentTime(currentTime + 1000 * 60 * 60 * 24 * 30);
  }
  return (
    <Swipeable
      onSwipeDown={handleTimelineBack}
      onSwipeUp={handleTimelineForward}
      allowSwipeUp={Date.now() - 1000 * 60 * 60 * 24 * 30 >= currentTime}
    >
      <main className="flex flex-col pt-6 pb-10 px-4 select-none gap-6 h-[100dvh] bg-background min-h-[100vh]">
        <PageHeader
          title={dateCurrentTime.toLocaleString("default", {
            month: "long",
          })}
          subtitle={
            dateCurrentTime.getFullYear() !== new Date().getFullYear()
              ? dateCurrentTime.toLocaleString("default", {
                  year: "numeric",
                })
              : undefined
          }
          onTimelineBack={handleTimelineBack}
          onTimelineForward={handleTimelineForward}
          displayBack={Date.now() - 1000 * 60 * 60 * 24 * 30 >= currentTime}
        />
        {expenses && expenses?.length > 0 ? (
          <div className="flex flex-col h-full flex-grow gap-3">
            {expenses.map((expense) => (
              <ExpenseButton key={expense.id} expense={expense} />
            ))}
          </div>
        ) : (
          <HomeEmptyState />
        )}
        <footer className="flex justify-center">
          <NewExpenseDrawer
            trigger={
              <Button
                variant={"primary"}
                className="rounded-full h-12 text-lg font-medium px-6 stroke-primary-stroke stroke-1 shadow-surface"
              >
                i spent $$$
              </Button>
            }
          />
        </footer>
      </main>
    </Swipeable>
  );
}

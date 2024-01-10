"use client";

import ExpenseButton from "@/components/expense-button";
import HomeEmptyState from "@/components/home-empty-state";
import NewExpenseDrawer from "@/components/new-expense-drawer";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const expenses = useLiveQuery(() => db.expenses.toArray());
  return (
    <main className="flex flex-col pt-6 pb-10 px-4 select-none gap-6 h-[100dvh] bg-background min-h-[100vh]">
      <PageHeader />
      {expenses && expenses?.length > 0 ? (
        <div className="flex flex-col h-full flex-grow gap-3">
          <AnimatePresence>
            {expenses.map((expense) => (
              <ExpenseButton key={expense.id} expense={expense} />
            ))}
          </AnimatePresence>
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
  );
}

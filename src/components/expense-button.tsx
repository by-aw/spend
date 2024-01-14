"use client";

import { Expense } from "@/lib/db";
import { motion, useIsPresent } from "framer-motion";
import { useContext } from "react";
import ExpenseInfoDialog, { expenseCategories } from "./expense-info-dialog";
import { SwipeableContext } from "./swipeable";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export type ExpenseButtonProps = {
  expense: Expense;
};

function ExpenseButton({ expense }: ExpenseButtonProps) {
  const isPresent = useIsPresent();
  const { swiping } = useContext(SwipeableContext);
  return (
    <motion.div
      style={{
        position: isPresent ? "relative" : "absolute",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 1000, damping: 80 }}
      layout
    >
      <ExpenseInfoDialog
        expense={expense}
        trigger={
          <Button
            disabled={swiping}
            variant={"ghost"}
            className="w-full h-max justify-start p-0 gap-4 bg-background relative rounded-none"
          >
            <Card className="flex items-center justify-items-center place-content-center w-16 h-16 rounded-sm bg-secondary">
              <div
                className={`inline-flex items-center justify-center rounded-full p-0 w-12 h-12 aspect-square`}
              >
                {
                  expenseCategories.find((c) => c.id == expense.groupId)
                    ?.element
                }
              </div>
            </Card>
            <div className="flex flex-col items-start">
              <p className="text-xl font-medium">{expense.store}</p>
              <p className="text-lg font-normal opacity-50">{expense.notes}</p>
            </div>
            <p className="text-xl ms-auto pe-2 font-medium opacity-80">
              ${expense.amount}
            </p>
          </Button>
        }
      />
    </motion.div>
  );
}

export default ExpenseButton;

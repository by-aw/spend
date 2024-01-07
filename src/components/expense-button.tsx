import { Expense } from "@/lib/db";
import { Basket } from "@phosphor-icons/react";
import { motion, useIsPresent } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export type ExpenseButtonProps = {
  expense: Expense;
};

function ExpenseButton({ expense }: ExpenseButtonProps) {
  const isPresent = useIsPresent();
  const animations = {
    style: {
      position: isPresent ? "static" : "absolute",
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 900, damping: 40 },
  };
  return (
    <motion.div
      style={{
        position: isPresent ? "static" : "absolute",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 1000, damping: 80 }}
      layout
    >
      <Button
        variant={"ghost"}
        className="w-full h-max justify-start p-0 gap-4"
      >
        <Card className="flex items-center justify-items-center place-content-center w-16 h-16 rounded-sm bg-secondary">
          <div className="p-2 bg-foreground/10 rounded-full outline outline-1 outline-foreground/50">
            <Basket fill="hsl(var(--foreground))" size={28} />
          </div>
        </Card>
        <div className="flex flex-col gap-1 items-start">
          <p className="text-xl font-medium">{expense.store}</p>
          <p className="text-lg font-normal opacity-50">{expense.notes}</p>
        </div>
        <p className="text-xl ms-auto pe-2 font-medium opacity-80">
          ${expense.amount}
        </p>
      </Button>
    </motion.div>
  );
}

export default ExpenseButton;
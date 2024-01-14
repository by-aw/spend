import { Expense, db } from "@/lib/db";
import { cn, formatDate } from "@/lib/utils";
import {
  Basket,
  Carrot,
  PencilSimple,
  ShoppingCart,
  TrashSimple,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { PopoverArrow, PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { ReactNode, useContext, useRef, useState } from "react";
import AnimatedLetters from "./animated-letters";
import NewExpenseDrawer from "./new-expense-drawer";
import { SwipeableContext } from "./swipeable";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type ExpenseInfoDialogProps = {
  expense: Expense;
  trigger: ReactNode;
};

export const expenseCategories = [
  {
    id: -1,
    name: "Store",
    bg: "pink",
    element: <ShoppingCart className="fill-brand-pinkforeground" size={28} />,
  },
  {
    id: 0,
    name: "Grocery",
    bg: "green",
    element: <Carrot className="fill-brand-greenforeground" size={28} />,
  },
  {
    id: 1,
    name: "Online shopping",
    bg: "blue",
    element: <Basket className="fill-brand-blueforeground" size={28} />,
  },
];

function ExpenseInfoDialog({ expense, trigger }: ExpenseInfoDialogProps) {
  const { setDisabled } = useContext(SwipeableContext);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [showExactTime, setShowExactTime] = useState(false);
  function handleDelete() {
    db.expenses.delete(expense.id!);
    closeRef.current?.click();
  }
  function handleCategoryChange(category: number) {
    db.expenses.update(expense.id!, { groupId: category });
  }
  function handleOpenChange(open: boolean) {
    setDisabled?.(open);
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogClose ref={closeRef} asChild>
          <DialogOverlay className="top-0 left-0 fixed w-[100dvw] h-[100dvh] z-[1] bg-background/50 backdrop-blur-lg" />
        </DialogClose>
        <Card className="flex flex-col p-4 gap-4 z-10 fixed w-calc top-[50dvh] translate-y-[-50%] bg-background/60 shadow-lg animate-overlay-up">
          <DialogHeader className="flex flex-row justify-between items-center">
            <div className="flex gap-3 items-center">
              <CategoryPopover
                trigger={
                  <Button
                    className="outline outline-1 outline-foreground/50 bg-foreground/10"
                    variant={"icon"}
                    size={"icon"}
                  >
                    {expenseCategories.find((c) => c.id == expense.groupId)
                      ?.element ?? (
                      <ShoppingCart fill={`hsl(var(--foreground))`} size={28} />
                    )}
                  </Button>
                }
                onSubmit={handleCategoryChange}
              />
              <p className="text-2xl font-semibold">{expense.store}</p>
            </div>
            <DialogClose asChild>
              <Button variant={"icon"} size={"icon"}>
                <X size={32} fill="hsl(var(--foreground))" />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <span className="flex relative justify-between">
              <p className="text-lg">Spent</p>
              <p className="text-lg font-medium pe-1">${expense.amount}</p>
            </span>
            <span
              onClick={() => setShowExactTime((c) => !c)}
              className="flex relative justify-between"
            >
              <p className="text-lg">On</p>
              <p className="text-lg font-medium pe-1">
                {!showExactTime && (
                  <span
                    className={cn(
                      "transition-all",
                      showExactTime ? "opacity-0" : "opacity-1"
                    )}
                  >
                    <AnimatedLetters
                      className="flex gap-[.6px]"
                      delay={25}
                      animation="animate-fade"
                      text={formatDate(expense.time)}
                    />
                  </span>
                )}
                {showExactTime && (
                  <span
                    className={cn(
                      "transition-all delay-150",
                      showExactTime ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <AnimatedLetters
                      delay={25}
                      animation="animate-fade mx-[-.15px]"
                      text={expense.time}
                    />
                  </span>
                )}
              </p>
            </span>
            {expense.notes.length > 0 && (
              <>
                <p className="text-lg font-medium pe-1 pt-1">Notes</p>
                <p className="text-lg">{expense.notes}</p>
              </>
            )}
          </div>
          <DialogFooter className="flex flex-row gap-2">
            <Button onClick={handleDelete} variant={"destructive"}>
              <TrashSimple size={24} weight="fill" />
            </Button>
            <NewExpenseDrawer
              trigger={
                <Button
                  className="w-full text-lg font-medium gap-2 flex-1"
                  variant={"outline"}
                >
                  <PencilSimple size={24} weight="fill" />
                  Edit
                </Button>
              }
              editing={true}
              id={expense.id}
            />
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default ExpenseInfoDialog;

export type CategoryPopoverProps = {
  trigger: ReactNode;
  onSubmit: (category: number) => void;
};

export function CategoryPopover({ trigger, onSubmit }: CategoryPopoverProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  function handleSubmit(category: number) {
    onSubmit(category);
  }
  return (
    <Popover>
      <PopoverTrigger ref={triggerRef} asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        className="rounded-[16px] py-4 pb-2 px-0  gap-2 w-min shadow-lg bg-background/80 backdrop-blur-lg"
        side="bottom"
        align="start"
      >
        <PopoverArrow
          style={{ marginTop: "-1px" }}
          stroke="hsl(var(--border))"
          fill="hsl(var(--background))"
          opacity={0.8}
          width={20}
          height={10}
          className=""
        />
        <p className="text-lg font-medium px-4 pb-2 w-full">
          Select a category
        </p>
        {expenseCategories.map((category) => (
          <PopoverClose key={category.id} asChild>
            <Button
              onClick={() => handleSubmit(category.id)}
              variant={"list"}
              size={"list"}
            >
              <div
                className={`inline-flex items-center justify-center rounded-full p-0 w-12 h-12 aspect-square`}
              >
                {category.element}
              </div>
              {category.name}
            </Button>
          </PopoverClose>
        ))}
      </PopoverContent>
    </Popover>
  );
}

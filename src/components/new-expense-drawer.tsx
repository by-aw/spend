"use client";

import { Expense, db } from "@/lib/db";
import { Clock, Minus, Plus } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Drawer as VDrawer } from "vaul";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { ExpandedInput } from "./ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { HTMLMotionProps } from "framer-motion";

export type NewExpenseDrawerProps = {
  trigger: React.ReactNode;
  editing?: boolean;
  id?: number;
};
type Inputs = {
  store: string;
  time: string;
  amount: string;
  notes: string;
};
function NewExpenseDrawer({
  trigger,
  editing = false,
  id,
}: NewExpenseDrawerProps) {
  const [shake, setShake] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (editing) {
      db.expenses.update(id!, data);
    } else {
      db.expenses.add(data as Expense);
    }
    handleCloseDrawer();
  };
  const onError = () => {
    setShake(true);
  };
  const handleCloseDrawer = () => closeBtnRef.current?.click();
  useEffect(() => {
    if (editing) {
      db.expenses.get({ id }).then((dbExpense) => {
        if (dbExpense) {
          setValue("store", dbExpense.store);
          setValue("time", dbExpense.time);
          setValue("amount", dbExpense.amount);
          setValue("notes", dbExpense.notes);
        }
      });
    }
  }, []);
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-drawer backdrop-blur-lg pb-6">
        <DrawerHeader className="flex p-4 items-center">
          <div className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-center w-full">New Expense</h1>
          <DrawerClose asChild>
            <Button
              ref={
                closeBtnRef as unknown as React.Ref<HTMLMotionProps<"button">>
              }
              variant={"icon"}
              size={"icon"}
              className="justify-self-end right-4"
            >
              <X size={32} fill="hsl(var(--foreground))" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <form
          className="flex flex-col px-4 gap-3"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <ExpandedInput
            {...register("store", { required: true })}
            label="Store"
            additionalContent={
              <>
                <Button>Publix</Button>
                <Button>Amazon</Button>
              </>
            }
            maxLength={16}
          />
          <ExpandedInput
            {...register("time", { required: true })}
            label="At"
            placeholder="Just Now"
            type="datetime-local"
            additionalContent={
              <>
                <VDrawer.NestedRoot>
                  {/* Add Date Trigger here */}
                </VDrawer.NestedRoot>
                <Button variant="icon" size="icon">
                  <Clock size={32} />
                </Button>
              </>
            }
          />
          <ExpandedInput
            {...register("amount", { required: true })}
            label="How much?"
            additionalContent={
              <>
                <Button variant="outline" size="icon">
                  <Plus size={32} />
                </Button>
                <Button variant="outline" size="icon">
                  <Minus size={32} />
                </Button>
              </>
            }
            maxLength={9}
          />
          <ExpandedInput
            {...register("notes", { required: false })}
            label="Any notes?"
            className="h-[96px] resize-none"
            textarea
            maxLength={100}
          />
          <Button
            type="submit"
            variant={"primary"}
            className={cn(
              "rounded-full h-12 w-full text-lg font-medium px-6 stroke-primary-stroke stroke-1 shadow-surface",
              shake && "animate-shake bg-red-600 hover:bg-red-600/80"
            )}
            onAnimationEnd={() => setShake(false)}
          >
            {editing ? "Done" : "Add it"}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default NewExpenseDrawer;

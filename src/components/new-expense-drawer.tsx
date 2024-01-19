"use client";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Clock, Minus, Plus } from "@phosphor-icons/react";
import { HTMLMotionProps } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DateTimePicker from "./date-time-picker";
import { CategoryPopover, expenseCategories } from "./expense-info-dialog";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { ExpandedInput } from "./ui/input";

export type NewExpenseDrawerProps = {
  trigger: React.ReactNode;
  editing?: boolean;
  id?: number;
};
type Inputs = {
  store: string;
  groupId: number;
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
  const { register, handleSubmit, control, reset, setValue, watch } =
    useForm<Inputs>({
      defaultValues: {
        groupId: -1,
        time: new Date(Date.now() + new Date().getTimezoneOffset() * -60 * 1000)
          .toISOString()
          .slice(0, 19),
      },
    });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (editing) {
      db.expenses.update(id!, data);
    } else {
      db.expenses.add({
        store: data.store,
        groupId: data.groupId,
        time: data.time,
        amount: data.amount,
        notes: data.notes,
      });
    }
    handleCloseDrawer();
  };
  const onError = () => {
    setShake(true);
  };
  const handleCloseDrawer = () => {
    closeBtnRef.current?.click();
    reset();
  };
  useEffect(() => {
    if (editing) {
      db.expenses.get({ id }).then((dbExpense) => {
        if (dbExpense) {
          setValue("store", dbExpense.store);
          setValue("groupId", dbExpense.groupId);
          setValue("time", dbExpense.time);
          setValue("amount", dbExpense.amount);
          setValue("notes", dbExpense.notes);
        }
      });
    }
  }, [editing, id, setValue]);
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-drawer backdrop-blur-lg pb-12 border-b-0">
        <DrawerHeader className="flex p-4 items-center">
          <CategoryPopover
            trigger={
              <Button
                className="outline outline-1 outline-foreground/50 bg-foreground/10 h-12 w-12"
                variant={"icon"}
                size={"icon"}
              >
                {watch("groupId") !== undefined
                  ? expenseCategories.find((c) => c.id == watch("groupId"))
                      ?.element
                  : expenseCategories.find((c) => c.id == -1)?.element!}
              </Button>
            }
            onSubmit={(cat) => {
              setValue("groupId", cat);
            }}
          />
          <h1 className="text-2xl font-bold text-center w-full">New Expense</h1>
          <DrawerClose asChild>
            <Button
              onClick={handleCloseDrawer}
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
            value={watch("time")}
            onChange={(e) => setValue("time", e.currentTarget.value)}
            label="At"
            placeholder="Just Now"
            type="datetime-local"
            additionalContent={
              <Controller
                control={control}
                name="time"
                render={({ field: { onChange, value } }) => {
                  console.log("Current value:", value);

                  return (
                    <DateTimePicker
                      time={value}
                      setTime={onChange}
                      onChange={(newValue) => {
                        setValue("time", newValue);
                      }}
                      trigger={
                        <Button variant="icon" size="icon">
                          <Clock size={32} />
                        </Button>
                      }
                    />
                  );
                }}
              />
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

"use client";

import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
  Drawer,
} from "./ui/drawer";
import { Drawer as VDrawer } from "vaul";
import { ExpandedInput } from "./ui/input";
import { FormEvent, useRef } from "react";
import { Clock, Minus, Plus } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { db } from "@/lib/db";

function NewExpenseDrawer() {
  const formRef = useRef<HTMLFormElement>(null);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = {
      store: (document.getElementById("storeInput") as HTMLInputElement)?.value,
      time: (document.getElementById("timeInput") as HTMLInputElement)?.value,
      amount: (document.getElementById("amountInput") as HTMLInputElement)
        ?.value,
      notes: (document.getElementById("notesInput") as HTMLInputElement)?.value,
    };
    db.expenses.add({
      groupId: -1,
      store: formData.store,
      time: formData.time,
      amount: Number(formData.amount),
      notes: formData.notes,
    });
  }
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button
          variant={"primary"}
          className="rounded-full h-12 text-lg font-medium px-6 stroke-primary-stroke stroke-1 shadow-surface"
        >
          i spent $$$
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-drawer backdrop-blur-lg pb-6">
        <DrawerHeader className="flex p-4 items-center">
          <div className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-center w-full">New Expense</h1>
          <DrawerClose asChild>
            <Button
              variant={"icon"}
              size={"icon"}
              className="justify-self-end right-4"
            >
              <X size={32} fill="hsl(var(--foreground))" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <form
          ref={formRef}
          className="flex flex-col px-4 gap-3"
          onSubmit={handleSubmit}
        >
          <ExpandedInput
            id="storeInput"
            label="Store"
            additionalContent={
              <>
                <Button>Publix</Button>
                <Button>Amazon</Button>
              </>
            }
          />
          <ExpandedInput
            id="timeInput"
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
            id="amountInput"
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
          />
          <ExpandedInput
            id="notesInput"
            label="Any notes?"
            className="h-[96px] resize-none"
            textarea
          />
          <DialogClose asChild>
            <Button
              type="submit"
              variant={"primary"}
              className="rounded-full h-12 w-full text-lg font-medium px-6 stroke-primary-stroke stroke-1 shadow-surface"
            >
              Add it
            </Button>
          </DialogClose>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default NewExpenseDrawer;

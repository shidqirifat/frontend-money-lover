import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import FormTransaction from "./FormTransaction";
import { useState } from "react";

export default function ModalAddTransaction() {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <Dialog open={openModal} onOpenChange={toggleModal}>
      <DialogTrigger>
        <Button
          asChild
          color="green"
          className="p-2 shadow-lg rounded-full h-12 w-12 fixed right-8 bottom-8"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <FormTransaction openModal={openModal} type="add" />
      </DialogContent>
    </Dialog>
  );
}

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
import { useEffect, useState } from "react";
import useTransaction from "@/queries/useTransaction";
import { UseMutationResult } from "@tanstack/react-query";

export default function ModalAddTransaction() {
  const [openModal, setOpenModal] = useState(false);
  const { createTransactionMutation } = useTransaction();

  const toggleModal = () => {
    if (createTransactionMutation.isPending) return;

    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    if (createTransactionMutation.isSuccess) toggleModal();
  }, [createTransactionMutation.isSuccess]);

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

        <FormTransaction
          openModal={openModal}
          type="add"
          mutation={createTransactionMutation as UseMutationResult}
        />
      </DialogContent>
    </Dialog>
  );
}

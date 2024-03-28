import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useTransaction from "@/queries/useTransaction";
import useModalWallet from "@/stores/modalWallet";
import { useEffect, useState } from "react";

export default function ModalDeleteWallet() {
  const [open, setOpen] = useState(false);
  const { deleteTransactionMutation } = useTransaction();
  const { clearWallet } = useModalWallet();

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (deleteTransactionMutation.isSuccess) {
      toggleOpen();
      clearWallet();
    }
  }, [deleteTransactionMutation.isSuccess]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger className="w-full">
        <Button
          type="button"
          variant="outline"
          onClick={toggleOpen}
          className="w-full"
          color="red"
        >
          Delete This Wallet
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this wallet?
          </AlertDialogTitle>
          <AlertDialogDescription>
            All the transactions related to this wallet are also to be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={toggleOpen}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

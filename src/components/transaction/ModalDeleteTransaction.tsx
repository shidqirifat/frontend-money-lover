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
import useModalTransaction from "@/stores/modalTransaction";
import { useEffect, useState } from "react";

export default function ModalDeleteTransaction() {
  const [open, setOpen] = useState(false);
  const { deleteTransactionMutation } = useTransaction();
  const { transaction, clearTransaction } = useModalTransaction();

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (deleteTransactionMutation.isSuccess) {
      toggleOpen();
      clearTransaction();
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
          Delete This Transaction
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure want to delete this transaction?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You can no longer see this transaction after you delete it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={deleteTransactionMutation.isPending}
            onClick={toggleOpen}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteTransactionMutation.isPending}
            onClick={() =>
              deleteTransactionMutation.mutate(transaction?.id as number)
            }
            variant="destructive"
          >
            Delete Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

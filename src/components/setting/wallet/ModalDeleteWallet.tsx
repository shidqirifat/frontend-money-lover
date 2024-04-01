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
import useWallet from "@/queries/useWallet";
import useModalWallet from "@/stores/modalWallet";
import { useEffect, useState } from "react";

export default function ModalDeleteWallet() {
  const [open, setOpen] = useState(false);
  const { deleteWalletMutation } = useWallet();
  const { wallet, clearWallet } = useModalWallet();

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (deleteWalletMutation.isSuccess) {
      toggleOpen();
      clearWallet();
    }
  }, [deleteWalletMutation.isSuccess]);

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
          <AlertDialogCancel
            onClick={toggleOpen}
            disabled={deleteWalletMutation.isPending}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={deleteWalletMutation.isPending}
            onClick={() => deleteWalletMutation.mutate(wallet?.id as number)}
          >
            Delete Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

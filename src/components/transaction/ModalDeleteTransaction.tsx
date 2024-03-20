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

type ModalDeleteTransactionProps = {
  onDelete: () => void;
};

export default function ModalDeleteTransaction({
  onDelete,
}: ModalDeleteTransactionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <Button
          type="button"
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-100 hover:text-red-500"
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} variant="destructive">
            Delete Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

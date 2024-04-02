import { TFormTransaction, TypeForm } from "@/lib/transaction";
import { Button } from "@/components/ui/button";
import ModalDeleteTransaction from "./ModalDeleteTransaction";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";

type BaseButton = { disabled?: boolean };

interface AddFormButtonProps extends BaseButton {
  directSubmit: boolean;
  onTrigger: UseFormHandleSubmit<TFormTransaction>;
  onSubmit: () => void;
}

interface FormButtonProps extends AddFormButtonProps {
  type: TypeForm;
  onToggleEdit: () => void;
  onCancel: () => void;
}

type DetailFormButtonProps = Pick<FormButtonProps, "onToggleEdit">;
type EditFormButtonProps = Pick<FormButtonProps, "onCancel">;

const DetailFormButton = ({ onToggleEdit }: DetailFormButtonProps) => {
  return (
    <div className="space-y-2">
      <Button
        type="button"
        color="green"
        onClick={onToggleEdit}
        className="w-full"
      >
        Edit Transaction
      </Button>
      <ModalDeleteTransaction />
    </div>
  );
};

const EditFormButton = ({ onCancel }: EditFormButtonProps) => {
  return (
    <div className="space-y-2">
      <Button color="green" className="w-full">
        Submit Edit Transaction
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        className="w-full"
      >
        Cancel
      </Button>
    </div>
  );
};

const AddFormButton = ({
  disabled,
  directSubmit,
  onTrigger,
  onSubmit,
}: AddFormButtonProps) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleTrigger = () => {
    setOpenConfirm(true);
  };

  if (!directSubmit) {
    return (
      <AlertDialog
        open={openConfirm}
        onOpenChange={(value) => setOpenConfirm(value)}
      >
        <AlertDialogTrigger className="w-full">
          <Button
            disabled={disabled}
            type="button"
            color="green"
            className="w-full"
            onClick={onTrigger(handleTrigger)}
          >
            Submit Add Transaction
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Warning</AlertDialogTitle>
            <AlertDialogDescription>
              The transaction amount is bigger than the selected wallet balance.
              Are you sure want to add this transaction?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
            <Button disabled={disabled} color="green" onClick={onSubmit}>
              Submit Add Transaction
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button disabled={disabled} type="submit" color="green" className="w-full">
      Submit Add Transaction
    </Button>
  );
};

export default function FormButton({
  type,
  disabled,
  onToggleEdit,
  onCancel,
  ...props
}: FormButtonProps) {
  if (type === "add") return <AddFormButton disabled={disabled} {...props} />;
  if (type === "edit") return <EditFormButton onCancel={onCancel} />;

  return <DetailFormButton onToggleEdit={onToggleEdit} />;
}

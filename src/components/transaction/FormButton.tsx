import { TypeForm } from "@/lib/transaction";
import { Button } from "@/components/ui/button";
import ModalDeleteTransaction from "./ModalDeleteTransaction";

type BaseButton = { disabled?: boolean };
interface FormButtonProps extends BaseButton {
  type: TypeForm;
  onToggleEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

type DetailFormButtonProps = Pick<FormButtonProps, "onToggleEdit" | "onDelete">;
type EditFormButtonProps = Pick<FormButtonProps, "onCancel">;

const DetailFormButton = ({
  onToggleEdit,
  onDelete,
}: DetailFormButtonProps) => {
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
      <ModalDeleteTransaction onDelete={onDelete} />
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

const AddFormButton = ({ disabled }: BaseButton) => {
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
  onDelete,
}: FormButtonProps) {
  if (type === "add") return <AddFormButton disabled={disabled} />;
  if (type === "edit") return <EditFormButton onCancel={onCancel} />;

  return <DetailFormButton onToggleEdit={onToggleEdit} onDelete={onDelete} />;
}

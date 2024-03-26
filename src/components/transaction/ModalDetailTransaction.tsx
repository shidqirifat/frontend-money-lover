import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormTransaction from "./FormTransaction";
import { useEffect, useState } from "react";
import useModalTransaction from "@/stores/modalTransaction";
import { TypeForm } from "@/lib/transaction";
import useTransaction from "@/queries/useTransaction";
import { UseMutationResult } from "@tanstack/react-query";

export default function ModalDetailTransaction() {
  const { transaction, clearTransaction } = useModalTransaction();
  const [openModal, setOpenModal] = useState(false);
  const [typeForm, setTypeForm] = useState<TypeForm>("detail");
  const { editTransactionMutation } = useTransaction();

  const toggleModal = () => {
    if (editTransactionMutation.isPending) return;

    setOpenModal((prev) => !prev);
    clearTransaction();
  };

  useEffect(() => {
    if (transaction) setOpenModal(true);
  }, [transaction]);

  useEffect(() => {
    if (editTransactionMutation.isSuccess) {
      setTypeForm("detail");
      toggleModal();
    }
  }, [editTransactionMutation.isSuccess]);

  return (
    <Dialog open={openModal} onOpenChange={toggleModal}>
      <DialogContent className="w-[80vw] max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {typeForm === "detail" ? "Detail Transaction" : "Edit Transaction"}
          </DialogTitle>
        </DialogHeader>

        <FormTransaction
          openModal={openModal}
          initialForm={transaction}
          type={typeForm}
          setTypeForm={setTypeForm}
          mutation={editTransactionMutation as UseMutationResult}
        />
      </DialogContent>
    </Dialog>
  );
}

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

export default function ModalDetailTransaction() {
  const { transaction, clearTransaction } = useModalTransaction();
  const [openModal, setOpenModal] = useState(false);
  const [typeForm, setTypeForm] = useState<TypeForm>("detail");

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
    clearTransaction();
  };

  useEffect(() => {
    if (transaction) setOpenModal(true);
  }, [transaction]);

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
        />
      </DialogContent>
    </Dialog>
  );
}

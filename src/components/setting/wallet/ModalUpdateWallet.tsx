import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import FormWallet from "./FormWallet";
import useModalWallet from "@/stores/modalWallet";
import useWallet from "@/queries/useWallet";
import { UseMutationResult } from "@tanstack/react-query";

export default function ModalUpdateWallet() {
  const { wallet, clearWallet } = useModalWallet();
  const [openModal, setOpenModal] = useState(false);
  const { editWalletMutation } = useWallet();

  const toggleModal = () => {
    if (editWalletMutation.isPending) return;

    setOpenModal((prev) => !prev);
    clearWallet();
  };

  useEffect(() => {
    setOpenModal(Boolean(wallet));
  }, [wallet]);

  useEffect(() => {
    if (editWalletMutation.isSuccess) toggleModal();
  }, [editWalletMutation.isSuccess]);

  return (
    <Dialog open={openModal} onOpenChange={toggleModal}>
      <DialogContent className="w-[80vw] max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Wallet</DialogTitle>
        </DialogHeader>

        <FormWallet
          initialForm={wallet}
          type="edit"
          mutation={editWalletMutation as UseMutationResult}
        />
      </DialogContent>
    </Dialog>
  );
}

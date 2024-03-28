import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import FormWallet from "./FormWallet";
import useModalWallet from "@/stores/modalWallet";

export default function ModalUpdateWallet() {
  const { wallet, clearWallet } = useModalWallet();
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
    clearWallet();
  };

  useEffect(() => {
    setOpenModal(Boolean(wallet));
  }, [wallet]);

  return (
    <Dialog open={openModal} onOpenChange={toggleModal}>
      <DialogContent className="w-[80vw] max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Wallet</DialogTitle>
        </DialogHeader>

        <FormWallet initialForm={wallet} type="edit" />
      </DialogContent>
    </Dialog>
  );
}

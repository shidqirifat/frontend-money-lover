import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormWallet from "./FormWallet";
import { Plus } from "lucide-react";

export default function ModalAddWallet() {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <Dialog open={openModal} onOpenChange={toggleModal}>
      <DialogTrigger>
        <Button variant="ghost" className="inline-flex gap-1 items-center">
          <Plus width={22} height={22} /> <h2>Add wallet</h2>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] max-w-sm">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>

        <FormWallet type="add" />
      </DialogContent>
    </Dialog>
  );
}

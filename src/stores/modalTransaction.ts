import { create } from "zustand";
import { Transaction } from "@/lib/transaction";

interface ModalTransactionState {
  transaction: Transaction | null;
  setTransaction: (transaction: Transaction) => void;
  clearTransaction: () => void;
}

const useModalTransaction = create<ModalTransactionState>((set) => ({
  transaction: null,
  setTransaction: (transaction: Transaction) => set(() => ({ transaction })),
  clearTransaction: () => set(() => ({ transaction: null })),
}));

export default useModalTransaction;

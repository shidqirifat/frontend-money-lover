import { create } from "zustand";
import { WalletResponse } from "@/lib/wallet";

interface ModalWalletState {
  wallet: WalletResponse | null;
  setWallet: (wallet: WalletResponse) => void;
  clearWallet: () => void;
}

const useModalWallet = create<ModalWalletState>((set) => ({
  wallet: null,
  setWallet: (wallet: WalletResponse) => set(() => ({ wallet })),
  clearWallet: () => set(() => ({ wallet: null })),
}));

export default useModalWallet;

"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Address from "./address/page";
import { useAtom } from "jotai";
import { atomBalance } from "./store/atomBalance";


export default function Home() {
  const [walletAmount, ] = useAtom(atomBalance);
  return (
    
      <div className="flex flex-col h-screen w-screen justify-center items-center  hover:border-slate-900 rounded">
        <div className="text-white">{walletAmount}</div>
        <Address />
        <WalletMultiButton />
      </div>
    

  );
}
"use client";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { atomBalance } from "../store/atomBalance";
import { callSplit } from "../contract/fuction";

export default function Address() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useAtom(atomBalance);
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const wallet = useAnchorWallet();

  const getAirdropOnClick = async () => {
    try {
      
      
      const result =  await callSplit(wallet,connection,sendAddress,sendAmount);
      console.log(result)
    } catch (err) {
      console.log(err)
      alert("You are Rate limited for Airdrop");
    }
  };

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection, balance]);

  return (
    <div className="flex  flex-col items-center justify-evenly p-2">
      {publicKey ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="border border-red-300 ">My Public key : {publicKey?.toString()}</h1>
          <h2 className="border border-red-300 ">My Balance amount: {balance} SOL</h2>
          <div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center justify-center gap-4">
              <p>Wallet Address</p>
              <input className="rounded-lg text-xl outline-none border border-red-300  text-black px-2" type="text" value={sendAddress} onChange={(e) => setSendAddress(e.target.value)} />
            </div>
            <div>
              <p>Token Amount</p>
              <input className="rounded-lg text-xl outline-none  border border-red-300  text-black px-2" type="text" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} />
            </div>
          </div>
            <button
              onClick={getAirdropOnClick}
              type="button"
              className="text-yellow-900 outline-none bg-white border border-red-300 focus:outline-none hover:bg-gray-100  focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Send Token
            </button>
          </div>
        </div>
      ) : (
        <h1>Wallet is not connected!</h1>
      )}
    </div>
  );
}
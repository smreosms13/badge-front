"use client"
import BadgeContainer from "@/components/homepage/main/BadgeContainer";
import BtnNav from "@/components/homepage/main/BtnNav";
import VoucherList from "@/components/homepage/main/VoucherList";
import Header from "@/components/homepage/main/Header";
import { useAuth } from "@/context/Context";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useConnectModal} from '@rainbow-me/rainbowkit';
import { useState, useEffect } from "react";

export default function Page() {

  const BadgeContainerName = '디지털 증명서';
  const { currentUser } = useAuth();
  const router = useRouter();
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const [modalOpened, setModalOpened] = useState()

  useEffect(() => {
    if (currentUser && account?.isDisconnected && !modalOpened) {
      openConnectModal();
      setModalOpened(true);
    }
  }, [currentUser, account, modalOpened, openConnectModal]);
  
  if(!currentUser){
    router.push('/')
  } else {
    return (
      <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
        <Header />
        <BadgeContainer name={BadgeContainerName} />
        <BtnNav/>
        <VoucherList />
      </main>
    );
  }
}
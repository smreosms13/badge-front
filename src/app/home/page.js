"use client"
import BadgeContainer from "@/components/homepage/main/BadgeContainer";
import BtnNav from "@/components/homepage/main/BtnNav";
import VoucherList from "@/components/homepage/main/VoucherList";
import Header from "@/components/homepage/main/Header";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel-shadcn";
import { Button } from "@/components/ui/button"


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
  const [modalOpened, setModalOpened] = useState(false);
  const [guideOpened, setGuideOpened] = useState(false);

  useEffect(()=> {
    const isNewUser = currentUser?.metadata.createdAt === currentUser?.metadata.lastLoginAt;
    if (isNewUser) {
      setGuideOpened(true);
    } 
    if (openConnectModal && account?.isDisconnected && !modalOpened && guideOpened) { 
      openConnectModal();
      setModalOpened(true)
    }
  },[guideOpened, currentUser, account, openConnectModal, modalOpened])

  if(currentUser){
    return (
      <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
        <Header />
        <BadgeContainer name={BadgeContainerName} />
        <BtnNav/>
        <VoucherList />

        {!guideOpened && (
          <Dialog open={guideOpened} onOpenChange={setGuideOpened}>
            <DialogContent className="max-w-sm">
                <DialogHeader className="items-center">
                    <div className='mb-3'></div>
                    <DialogTitle>USER GUIDE</DialogTitle>
                    <DialogDescription>USER GUIDE</DialogDescription>
                </DialogHeader>
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <div className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{index + 1}</span>
                                </div>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <DialogFooter className="flex-row space-x-2 border-none">
                  <DialogClose asChild>
                    <Button type="button" className="flex-1">시작하기</Button>
                  </DialogClose>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>
    );
  } else {
    router.push('/')
  }
}
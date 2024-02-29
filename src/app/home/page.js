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
  const { currentUser } = useAuth();
  const router = useRouter();
  const account = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isConnectOpened, setIsConnectOpened] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const isNewUser = currentUser?.metadata.createdAt === currentUser?.metadata.lastLoginAt;

  const [isGuideOpened, setIsGuideOpened] = useState(() => {
    // 페이지가 처음 로드될 때 로컬 스토리지에서 isGuideOpened 값을 가져옴
    const storedValue = localStorage.getItem('isGuideOpened');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    // isNewUser, isGuideOpened의 값이 변화할 때 
    // 신규 유저이면서 유저 가이드를 보지 않았다면 가이드 모달 열기
    if(!isNewUser && !isGuideOpened){
      setGuideOpen(true);
      console.log("1 isGuideOpened", isGuideOpened)
    }
    // 페이지가 언마운트될 때 로컬 스토리지에 isGuideOpened 값을 저장
    return () => {
      localStorage.setItem('isGuideOpened', JSON.stringify(isGuideOpened));
    };
  }, [isNewUser, isGuideOpened]);
  useEffect(() => {
    console.log("2 isGuideOpened", isGuideOpened)
    // isGuideOpened가 true이고, isConnectOpened가 false이며, 계정이 연결되지 않은 경우에만 실행
    if(isGuideOpened && !isConnectOpened && account?.isDisconnected) {
        openConnectModal();
        setIsConnectOpened(true);
    }
}, [isGuideOpened, isConnectOpened, account, openConnectModal]);


  if(currentUser){
    return (
      <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
        {!isNewUser && (
          <Dialog open={guideOpen} onOpenChange={setGuideOpen}>
            <DialogContent className="max-w-sm">
                <DialogHeader className="items-center">
                    <div className='mb-3'></div>
                    <DialogTitle>USER GUIDE</DialogTitle>
                    <DialogDescription>나만의 Digital Badge를 만들고 공유해보자!</DialogDescription>
                </DialogHeader>
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>

                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <DialogFooter className="flex-row space-x-2 border-none">
                  <DialogClose asChild>
                    <Button type="button" className="flex-1" onClick={()=> {setIsGuideOpened(true)}}>시작하기</Button>
                  </DialogClose>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <Header />
        <BadgeContainer/>
        <BtnNav/>
        <VoucherList />
      </main>
    );
  } else {
    router.push('/')
  }
}
"use client"

import { useAuth } from "@/context/Context";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useConnectModal} from '@rainbow-me/rainbowkit';
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import BadgeContainer from "@/components/homepage/main/BadgeContainer";
import BtnNav from "@/components/homepage/main/BtnNav";
import VoucherList from "@/components/homepage/main/VoucherList";
import Header from "@/components/homepage/main/Header";

// user guide contents
import { guideContents } from "@/components/homepage/guide/GuideContents";

export default function Page() {
  const { currentUser } = useAuth();  // 현재 로그인한 user
  const router = useRouter();         
  const account = useAccount();       // 연결된 wallet account
  const { openConnectModal } = useConnectModal();  // rainbowKit connetModal
  const [isConnectOpened, setIsConnectOpened] = useState(false);  //connetModal이 이전에 opne되었는지 저장
  const [guideOpen, setGuideOpen] = useState(false);              //user guide open control

  // 현재 로그인한 user가 새 user인지 확인
  const isNewUser = currentUser?.metadata.createdAt === currentUser?.metadata.lastLoginAt;

  const [isGuideOpened, setIsGuideOpened] = useState(() => {
    // 페이지가 처음 로드될 때 로컬 스토리지에서 isGuideOpened 값을 가져옴
    const storedValue = localStorage.getItem('isGuideOpened');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    // isNewUser, isGuideOpened의 값이 변화할 때 
    // 신규 유저이면서 유저 가이드를 보지 않았다면 가이드 모달 열기
    if(isNewUser && !isGuideOpened){
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
    // isGuideOpened가 true이고, isConnectOpened가 false이며, 
    // 계정이 연결되지 않은 경우에만 wallet connect modal 실행
    if(isGuideOpened && !isConnectOpened && account?.isDisconnected) {
        openConnectModal();
        setIsConnectOpened(true);
    }
}, [isGuideOpened, isConnectOpened, account, openConnectModal]);


  if(currentUser){
    return (
      <main className="mx-auto max-w-sm h-dvh grid gap-3 shadow-2xl p-6 bg-white">
        {/* new user : user guide rendering */}
        {isNewUser && (
          <Dialog open={guideOpen} onOpenChange={setGuideOpen}>
            {/* user guide */}
            <DialogContent className="max-w-sm">
                <DialogHeader className="items-center">
                    <DialogTitle>고려대학교 디지털배지</DialogTitle>
                    <DialogDescription className="font-semibold">나만의 Digital Badge를 만들고 공유해보자!</DialogDescription>
                </DialogHeader>
                  <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {guideContents.map((content, index) => (
                            <CarouselItem key={index+1}>
                              {content}  
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
        {/* 데이터 배지 보관함 */}
        <BadgeContainer/> 
        {/* 배지 만들기, 공유하기, 관리하기 버튼 */}
        <BtnNav/>
        {/* 디지털 바우처 리스트 */}
        <VoucherList />
      </main>
    );
  } else {
    router.push('/')
  }
}
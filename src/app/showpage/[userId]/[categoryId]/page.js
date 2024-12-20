"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

// 배지 컬렉션 공유 페이지
// 로그인 없이 접속 가능해야 함
export default function Page() {
  const [badges, setBadges] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [category, setCategoryInfo] = useState([]);

  // url parameter로부터 userId, categoryId 추출
  const params = useParams();
  const userId = decodeURIComponent(params.userId);
  const categoryId = decodeURIComponent(params.categoryId);
  // api query에 userId, categoryId 넣기
  const apiUrl = `https://us-central1-openbadges-537a3.cloudfunctions.net/api/getSingleCategoryByUserID?userID=${userId}&categoryID=${categoryId}`
  
  useEffect(() => {
    fetchData();
  }, []);

  // colletion data fetch
  // api : getSingleCategoryByUserID
  const fetchData = async () => {
    try {
        const response = await axios.post(apiUrl);
        const data = response?.data
        // data 내의 userInfo, category, badges 분할하여 state 저장
        setUserInfo(data?.userInfo);
        setCategoryInfo(data?.category);
        setBadges(data?.badges);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  return (
    <main className="mx-auto max-w-sm h-dvh flex-col shadow-2xl p-6 bg-red-200 overflow-y-scroll scrollbar-hide">
      {/* user information */}
      <div className="my-3">
        <div className="flex items-center flex-col w-full bg-cover">
              <div className="dark:!border-navy-700 flex h-[110px] w-[110px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                { Object.keys(userInfo).length !== 0 && <Image
                  className="rounded-full"
                  src={userInfo?.imageUrl}
                  alt={userInfo?.name}
                  width={100}
                  height={100}
                />}
              </div>
          <div className="bg-red-100 m-3 p-3 rounded-md w-full text-center">
            <h4 className="text-gray-700 text-xl font-bold">
              {userInfo?.name}
            </h4>
            <h4 className="text-gray-700 font-semibold">{category?.categoryName}</h4>
          </div>
        </div>
      </div>
      {/* badges show */}
      <div className="flex-col">
        <div className="flex flex-wrap">
          {/* check badge vaildation and show badges*/}
          {
            badges?.length !== 0 ? (
              badges.map((badge, index) => (
                <div className="p-3 m-3 bg-white w-fit rounded-xl flex items-center justify-center" key={index}>
                  {/* Drawer : show badge detail */}
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Image src={badge.image} alt={badge.badgeName} width={100} height={100}/>
                    </DrawerTrigger>
                    <DrawerContent className="mx-auto w-full max-w-sm p-3">
                      <div>
                        <DrawerHeader className="flex">
                          <DrawerTitle>{badge.badgeName}</DrawerTitle>
                          <div className="bg-red-300 w-fit p-1 font-sm text-white rounded-lg leading-none tracking-tight">
                            {category.categoryName}
                          </div>
                        </DrawerHeader>
                          <div className="flex items-center rounded-xl px-4">
                            <div className="relative flex-initial w-24 h-20 rounded-md flex mr-3 justify-center items-center bg-white">
                            <Image
                                src={badge.image}
                                alt={badge.badgeName}
                                layout="fill"
                                className="w-16 h-16 rounded-md"
                            />
                          </div>
                          <div className="flex-1 justify-center">
                              <div className="font-semibold">
                                  <p className="text-sm">{badge?.dataBadgeClaim?.type}</p>
                                  <p className="text-md text-muted-foreground">{badge?.dataBadgeClaim?.subject}</p>
                                  <p className="text-sm text-muted-foreground">{badge?.dataBadgeClaim?.description}</p>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button>닫기</Button>
                            </DrawerClose>
                          </DrawerFooter>
                      </div>
                      </DrawerContent>
                  </Drawer>

                </div>
              ))
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
      </div>
    </main>
  );

  
  


  

  
}

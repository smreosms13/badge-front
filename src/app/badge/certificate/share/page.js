"use client"
import { useState } from "react";
import Imageselector from "./selectone";
import BottomButton from "@/components/ui/BottomButton";

export default function Page() {
  const [selectedImages, setSelectedImages] = useState(() => {
    const savedItems = localStorage.getItem('selectedImages');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const BtnName = "배지 공유하러 가기";


  return (
    <>
    <Imageselector selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
    <BottomButton name={BtnName}></BottomButton>
  </>
  );
}

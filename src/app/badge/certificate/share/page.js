"use client"
import { useState } from "react";
import Imageselector from "./selectone";
import BottomButton from "@/components/ui/BottomButton";

export default function Page() {
  const [selectedImages, setSelectedImages] = useState(() => {
    const savedItems = localStorage.getItem('selectedImages');
    return savedItems ? JSON.parse(savedItems) : [];
  });


  return (
    <>
    <Imageselector selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
  </>
  );
}

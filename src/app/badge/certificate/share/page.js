"use client"
import Imageselector from "./selectone";
/* 공유하기 누르면 나오는 apge */
export default function Page() {
  /* localStorage reset */
  if (localStorage.getItem('selectedImages')) {
    localStorage.removeItem('selectedImages');
  }
  
  return (
    
    <Imageselector/>
  );
}
